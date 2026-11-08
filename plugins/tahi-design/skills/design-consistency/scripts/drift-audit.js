/*
 * Tahi drift audit
 * ----------------
 * Walks the rendered page and reports every distinct design value in use, with
 * counts and example elements, so drift is visible ("14 greys, 11 font sizes").
 *
 * Browser:     paste the whole file into the DevTools console. Results print as
 *              tables and are left on window.__driftAudit.
 * Playwright:  const src = fs.readFileSync('drift-audit.js', 'utf8');
 *              const result = await page.evaluate(src);
 *
 * Options (set on window before running, all optional):
 *   DRIFT_AUDIT_ROOT  = 'main'              CSS selector to scope the walk (default: body)
 *   DRIFT_AUDIT_QUIET = true                return the result without console output
 *   DRIFT_AUDIT_GRID  = 4                   spacing grid in px used to flag odd values
 *
 * Reads tokens from custom properties on :root (computed style, plus any
 * same-origin stylesheets) and flags values that match no token.
 * Read-only: it changes nothing on the page.
 */
(function driftAudit() {
  'use strict';

  var opts = {
    root: (typeof window !== 'undefined' && window.DRIFT_AUDIT_ROOT) || 'body',
    quiet: Boolean(typeof window !== 'undefined' && window.DRIFT_AUDIT_QUIET),
    grid: (typeof window !== 'undefined' && Number(window.DRIFT_AUDIT_GRID)) || 4
  };

  var rootEl = document.querySelector(opts.root) || document.body;
  var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

  // ---------- colour normalisation (handles rgb, hex, hsl, oklch, color()) ----------
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext('2d', { willReadFrequently: true });
  var colourCache = Object.create(null);

  function toRgba(value) {
    if (!value) return null;
    if (colourCache[value] !== undefined) return colourCache[value];
    var out = null;
    try {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      var d = ctx.getImageData(0, 0, 1, 1).data;
      out = { r: d[0], g: d[1], b: d[2], a: Math.round((d[3] / 255) * 100) / 100 };
    } catch (e) {
      out = null;
    }
    colourCache[value] = out;
    return out;
  }

  function hex(c) {
    function h(n) { return ('0' + n.toString(16)).slice(-2); }
    var base = '#' + h(c.r) + h(c.g) + h(c.b);
    return c.a < 1 ? base + ' @' + c.a : base;
  }

  function isNeutral(c) {
    var max = Math.max(c.r, c.g, c.b);
    var min = Math.min(c.r, c.g, c.b);
    return max - min <= 18; // low chroma: greys, near-blacks, near-whites, tinted neutrals
  }

  // ---------- helpers ----------
  function px(v) {
    var n = parseFloat(v);
    return isNaN(n) ? null : Math.round(n * 100) / 100;
  }

  function describe(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) return s + '#' + el.id;
    var cls = (typeof el.className === 'string' ? el.className : (el.getAttribute('class') || ''))
      .trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (cls.length) s += '.' + cls.join('.');
    var parent = el.parentElement;
    if (parent && parent !== document.body) {
      var p = parent.tagName.toLowerCase();
      var pc = (typeof parent.className === 'string' ? parent.className : '').trim().split(/\s+/).filter(Boolean)[0];
      s = p + (pc ? '.' + pc : '') + ' > ' + s;
    }
    return s;
  }

  function hasOwnText(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    }
    return false;
  }

  function isVisible(el, cs) {
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
    if (parseFloat(cs.opacity) === 0 && !el.hasAttribute('data-anim')) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  // ---------- buckets ----------
  function Bucket(name) {
    this.name = name;
    this.map = Object.create(null);
  }
  Bucket.prototype.add = function (value, el) {
    if (value === null || value === undefined || value === '') return;
    var e = this.map[value] || (this.map[value] = { value: value, count: 0, examples: [] });
    e.count += 1;
    if (e.examples.length < 3) {
      var d = describe(el);
      if (e.examples.indexOf(d) === -1) e.examples.push(d);
    }
  };
  Bucket.prototype.list = function () {
    var self = this;
    return Object.keys(this.map).map(function (k) { return self.map[k]; })
      .sort(function (a, b) { return b.count - a.count; });
  };

  var b = {
    fontSize: new Bucket('Font sizes'),
    fontFamily: new Bucket('Font families'),
    fontWeight: new Bucket('Font weights'),
    lineHeight: new Bucket('Line heights'),
    letterSpacing: new Bucket('Letter spacing'),
    color: new Bucket('Text colours'),
    background: new Bucket('Background colours'),
    border: new Bucket('Border colours'),
    radius: new Bucket('Border radii'),
    shadow: new Bucket('Box shadows'),
    padding: new Bucket('Padding values'),
    margin: new Bucket('Margin values (top and bottom)'),
    gap: new Bucket('Gap values')
  };

  // ---------- tokens from :root ----------
  var tokens = { lengths: Object.create(null), colours: Object.create(null), count: 0 };

  function addToken(name, raw) {
    var v = String(raw).trim();
    if (!v) return;
    tokens.count += 1;
    var m = v.match(/^(-?[\d.]+)(px|rem)$/);
    if (m) {
      var n = parseFloat(m[1]) * (m[2] === 'rem' ? rootFontSize : 1);
      tokens.lengths[Math.round(n * 100) / 100] = name;
      return;
    }
    if (/^(#|rgb|hsl|oklch|oklab|lab|lch|color\()/i.test(v)) {
      var c = toRgba(v);
      if (c) tokens.colours[hex(c)] = name;
    }
  }

  (function readTokens() {
    var rootCs = getComputedStyle(document.documentElement);
    var seen = Object.create(null);
    for (var i = 0; i < rootCs.length; i++) {
      var prop = rootCs[i];
      if (prop.indexOf('--') === 0 && !seen[prop]) {
        seen[prop] = true;
        addToken(prop, rootCs.getPropertyValue(prop));
      }
    }
    // Same-origin stylesheets, for browsers that do not enumerate custom properties.
    for (var s = 0; s < document.styleSheets.length; s++) {
      var rules;
      try { rules = document.styleSheets[s].cssRules; } catch (e) { continue; }
      if (!rules) continue;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (!rule.style || !/(^|,)\s*(:root|html)\s*(,|$)/.test(rule.selectorText || '')) continue;
        for (var k = 0; k < rule.style.length; k++) {
          var name = rule.style[k];
          if (name.indexOf('--') === 0 && !seen[name]) {
            seen[name] = true;
            addToken(name, rootCs.getPropertyValue(name) || rule.style.getPropertyValue(name));
          }
        }
      }
    }
  })();

  function onTokenLength(n) {
    if (!tokens.count) return null; // unknown: no tokens readable
    return tokens.lengths[n] !== undefined;
  }

  // ---------- walk ----------
  var elements = [rootEl].concat(Array.prototype.slice.call(rootEl.querySelectorAll('*')));
  var skipTags = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, META: 1, LINK: 1, BR: 1, WBR: 1 };
  var walked = 0;

  elements.forEach(function (el) {
    if (skipTags[el.tagName]) return;
    if (el.closest && el.closest('svg') && el.tagName.toLowerCase() !== 'svg') return;
    var cs = getComputedStyle(el);
    if (!isVisible(el, cs)) return;
    walked += 1;

    if (hasOwnText(el)) {
      var fs = px(cs.fontSize);
      b.fontSize.add(fs + 'px', el);
      b.fontFamily.add(cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), el);
      b.fontWeight.add(cs.fontWeight, el);
      var lh = cs.lineHeight === 'normal' ? 'normal' : (Math.round((px(cs.lineHeight) / fs) * 100) / 100) + ' (' + px(cs.lineHeight) + 'px)';
      b.lineHeight.add(lh, el);
      var ls = cs.letterSpacing === 'normal' ? '0' : (Math.round((px(cs.letterSpacing) / fs) * 1000) / 1000) + 'em';
      b.letterSpacing.add(ls, el);
      var tc = toRgba(cs.color);
      if (tc && tc.a > 0) b.color.add(hex(tc), el);
    }

    var bg = toRgba(cs.backgroundColor);
    if (bg && bg.a > 0) b.background.add(hex(bg), el);

    ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
      if (px(cs['border' + side + 'Width']) > 0 && cs['border' + side + 'Style'] !== 'none') {
        var bc = toRgba(cs['border' + side + 'Color']);
        if (bc && bc.a > 0) b.border.add(hex(bc), el);
      }
    });

    var radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
    var uniqueRadii = radii.filter(function (v, i) { return radii.indexOf(v) === i; });
    if (!(uniqueRadii.length === 1 && px(uniqueRadii[0]) === 0)) b.radius.add(uniqueRadii.join(' '), el);

    if (cs.boxShadow && cs.boxShadow !== 'none') b.shadow.add(cs.boxShadow, el);

    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(function (p) {
      var v = px(cs[p]);
      if (v) b.padding.add(v, el);
    });
    // Horizontal margins are skipped: auto-centred containers resolve to arbitrary px.
    ['marginTop', 'marginBottom'].forEach(function (p) {
      var v = px(cs[p]);
      if (v) b.margin.add(v, el);
    });
    var isFlexOrGrid = /flex|grid/.test(cs.display);
    if (isFlexOrGrid) {
      [cs.rowGap, cs.columnGap].forEach(function (g) {
        var v = px(g);
        if (v) b.gap.add(v, el);
      });
    }
  });

  // ---------- analysis ----------
  function spacingReport(bucket) {
    return bucket.list().map(function (e) {
      var n = Number(e.value);
      return {
        value: n + 'px',
        rem: Math.round((n / rootFontSize) * 1000) / 1000,
        count: e.count,
        onGrid: n % opts.grid === 0,
        onToken: onTokenLength(n),
        examples: e.examples.join('  |  ')
      };
    });
  }

  function colourReport(bucket) {
    return bucket.list().map(function (e) {
      var c = toRgba(e.value.split(' @')[0]);
      return {
        value: e.value,
        count: e.count,
        neutral: c ? isNeutral(c) : null,
        token: tokens.colours[e.value] || (tokens.count ? '(none)' : '(tokens unreadable)'),
        examples: e.examples.join('  |  ')
      };
    });
  }

  function plainReport(bucket) {
    return bucket.list().map(function (e) {
      return { value: e.value, count: e.count, examples: e.examples.join('  |  ') };
    });
  }

  function nearDuplicates(values, within) {
    var nums = values.map(Number).filter(function (n) { return !isNaN(n); }).sort(function (a, c) { return a - c; });
    var pairs = [];
    for (var i = 1; i < nums.length; i++) {
      if (nums[i] - nums[i - 1] > 0 && nums[i] - nums[i - 1] <= within) pairs.push(nums[i - 1] + ' / ' + nums[i]);
    }
    return pairs;
  }

  var report = {
    page: location.href,
    scope: opts.root,
    elementsChecked: walked,
    tokensFound: tokens.count,
    fontSizes: plainReport(b.fontSize),
    fontFamilies: plainReport(b.fontFamily),
    fontWeights: plainReport(b.fontWeight),
    lineHeights: plainReport(b.lineHeight),
    letterSpacing: plainReport(b.letterSpacing),
    textColours: colourReport(b.color),
    backgroundColours: colourReport(b.background),
    borderColours: colourReport(b.border),
    radii: plainReport(b.radius),
    shadows: plainReport(b.shadow),
    padding: spacingReport(b.padding),
    margin: spacingReport(b.margin),
    gap: spacingReport(b.gap)
  };

  var allColours = {};
  report.textColours.concat(report.backgroundColours, report.borderColours).forEach(function (r) {
    allColours[r.value] = r;
  });
  var neutrals = Object.keys(allColours).filter(function (k) { return allColours[k].neutral; });
  var offTokenColours = Object.keys(allColours).filter(function (k) { return allColours[k].token === '(none)'; });
  var spacingAll = report.padding.concat(report.margin, report.gap);
  var spacingDistinct = {};
  spacingAll.forEach(function (r) { spacingDistinct[r.value] = r; });
  var offGrid = Object.keys(spacingDistinct).filter(function (k) { return !spacingDistinct[k].onGrid; });
  var offTokenSpacing = Object.keys(spacingDistinct).filter(function (k) { return spacingDistinct[k].onToken === false; });
  var fontSizeNums = report.fontSizes.map(function (r) { return parseFloat(r.value); });

  var flags = [];
  function flag(cond, msg) { if (cond) flags.push(msg); }
  flag(report.fontSizes.length > 9, report.fontSizes.length + ' font sizes (healthy: the scale steps in use, usually 5 to 8)');
  var closeSizes = nearDuplicates(fontSizeNums, 2);
  flag(closeSizes.length > 0, 'Font sizes within 2px of each other: ' + closeSizes.join(', '));
  flag(report.fontFamilies.length > 2, report.fontFamilies.length + ' font families: ' + report.fontFamilies.map(function (r) { return r.value; }).join(', '));
  flag(neutrals.length > 7, neutrals.length + ' neutral colours across text, backgrounds and borders (healthy: 4 to 6)');
  flag(report.radii.length > 5, report.radii.length + ' distinct border radii (healthy: 2 to 4)');
  flag(report.shadows.length > 3, report.shadows.length + ' distinct box shadows (healthy: 0 to 3)');
  flag(offGrid.length > 0, offGrid.length + ' spacing values off the ' + opts.grid + 'px grid: ' + offGrid.slice(0, 12).join(', '));
  flag(offTokenSpacing.length > 0, offTokenSpacing.length + ' spacing values match no token: ' + offTokenSpacing.slice(0, 12).join(', '));
  flag(offTokenColours.length > 0, offTokenColours.length + ' colours match no colour token: ' + offTokenColours.slice(0, 12).join(', '));
  flag(tokens.count === 0, 'No :root custom properties readable, so token matching was skipped (cross-origin CSS or no tokens).');

  report.summary = {
    fontSizes: report.fontSizes.length,
    fontFamilies: report.fontFamilies.length,
    fontWeights: report.fontWeights.length,
    lineHeights: report.lineHeights.length,
    textColours: report.textColours.length,
    backgroundColours: report.backgroundColours.length,
    borderColours: report.borderColours.length,
    neutralColours: neutrals.length,
    radii: report.radii.length,
    shadows: report.shadows.length,
    spacingValues: Object.keys(spacingDistinct).length,
    spacingOffGrid: offGrid.length,
    spacingOffToken: tokens.count ? offTokenSpacing.length : 'n/a',
    coloursOffToken: tokens.count ? offTokenColours.length : 'n/a'
  };
  report.flags = flags;

  if (typeof window !== 'undefined') window.__driftAudit = report;

  if (!opts.quiet && typeof console !== 'undefined') {
    var headline = report.summary.fontSizes + ' font sizes, ' + report.summary.fontFamilies + ' families, ' +
      report.summary.neutralColours + ' neutrals (' + (report.summary.textColours + report.summary.backgroundColours) +
      ' text and background colours), ' + report.summary.radii + ' radii, ' + report.summary.shadows + ' shadows, ' +
      report.summary.spacingValues + ' spacing values';
    console.log('%cDrift audit: ' + headline, 'font-weight:bold;font-size:13px');
    console.log('Scope: ' + opts.root + ' · elements checked: ' + walked + ' · tokens read: ' + tokens.count);
    if (flags.length) {
      console.log('%cInvestigate', 'font-weight:bold;color:#b45309');
      flags.forEach(function (f) { console.log(' • ' + f); });
    } else {
      console.log('%cNo drift flags.', 'color:#15803d');
    }
    var sections = [
      ['Font sizes', report.fontSizes], ['Font families', report.fontFamilies], ['Font weights', report.fontWeights],
      ['Line heights', report.lineHeights], ['Letter spacing', report.letterSpacing],
      ['Text colours', report.textColours], ['Background colours', report.backgroundColours],
      ['Border colours', report.borderColours], ['Radii', report.radii], ['Shadows', report.shadows],
      ['Padding', report.padding], ['Margin (top and bottom)', report.margin], ['Gap', report.gap]
    ];
    sections.forEach(function (s) {
      if (!s[1].length) return;
      if (console.groupCollapsed) console.groupCollapsed(s[0] + ' (' + s[1].length + ')');
      if (console.table) console.table(s[1]); else console.log(s[1]);
      if (console.groupEnd) console.groupEnd();
    });
  }

  return report;
})();
