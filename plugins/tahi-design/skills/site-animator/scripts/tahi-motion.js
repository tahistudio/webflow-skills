/*!
 * tahi-motion.js: one shared script for every data-attribute motion primitive.
 *
 * Reads the project's motion level from <html data-motion="0-3"> (or the CSS
 * custom property --motion-level) and the motion tokens from :root, then runs
 * each primitive only if the effective level allows it. prefers-reduced-motion,
 * or the on-site toggle, drops the level (3 and 2 become 1, 1 becomes 0) and
 * removes all travel, so reveals become plain crossfades.
 *
 * Primitives (attribute, minimum level):
 *   data-anim="reveal"     1  fade and rise once when it enters the viewport
 *   data-anim-stagger      2  on a parent: direct children reveal in sequence
 *                             (at level 1 they reveal together)
 *   data-anim="counter"    2  counts up to the number in its text once
 *   data-anim="marquee"    2  continuous horizontal loop, pauses on hover,
 *                             focus, off-screen and when toggled
 *   data-anim="parallax"   2  small scroll-linked drift (needs ViewTimeline
 *                             support or GSAP ScrollTrigger; static otherwise)
 *   data-anim="split"      3  headline rises word by word (or line by line
 *                             with GSAP SplitText when present)
 *   data-anim="magnetic"   3  control eases towards a fine pointer
 *
 * Modifiers:
 *   data-anim-delay="2"     delay in stagger steps (2 x --motion-stagger)
 *   data-anim-travel="sm"   sm | md (default md; level 1 always uses sm)
 *   data-anim-duration="4"  1-4, picks --motion-dur-N (default 3)
 *   data-anim-level="3"     raise the minimum level for this element
 *   data-anim-speed="0.1"   parallax strength (max 0.2) or marquee px per second
 *   data-anim-strength="0.3" magnetic pull (max 0.4)
 *   data-anim-toggle        a button inside a marquee that pauses or plays it
 *
 * Content stays visible without JavaScript. Add this to <head> before any CSS
 * that could flash, so elements wait for the script but never get stuck:
 *   <script>document.documentElement.classList.add('motion-pending');
 *   setTimeout(function(){document.documentElement.classList.remove('motion-pending')},2500)</script>
 * and this CSS:
 *   .motion-pending [data-anim="reveal"], .motion-pending [data-anim-stagger] > *,
 *   .motion-pending [data-anim="split"] { opacity: 0; }
 *
 * API: window.TahiMotion.init(root), .refresh(), .setReduced(bool), .report(), .level
 * Astro view transitions: document.addEventListener('astro:page-load', () => TahiMotion.init());
 * GSAP is optional. If window.gsap (with ScrollTrigger / SplitText) is present it is used
 * for parallax and split text; everything else uses CSS and the Web Animations API.
 */
(function () {
  'use strict';

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const html = document.documentElement;
  const STORAGE_KEY = 'tahi-motion';
  const REDUCED_MAP = [0, 0, 1, 1];
  const MIN_LEVEL = { reveal: 1, stagger: 2, counter: 2, marquee: 2, parallax: 2, split: 3, magnetic: 3 };
  const MAX_STAGGERED = 6; // items after this share the last delay so groups never drag

  const mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const mqFinePointer = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : null;

  const processed = new WeakSet();
  const cleanups = [];
  const tally = {};
  let observer = null;

  // ---------- tokens and level ----------

  function cssVar(name, fallback) {
    const v = getComputedStyle(html).getPropertyValue(name).trim();
    return v || fallback;
  }

  function toMs(value) {
    const v = String(value).trim();
    const n = parseFloat(v);
    if (isNaN(n)) return 0;
    if (/ms$/.test(v)) return n;
    if (/s$/.test(v)) return n * 1000;
    return n;
  }

  function readTokens() {
    return {
      dur: [
        0,
        toMs(cssVar('--motion-dur-1', '150ms')),
        toMs(cssVar('--motion-dur-2', '250ms')),
        toMs(cssVar('--motion-dur-3', '500ms')),
        toMs(cssVar('--motion-dur-4', '800ms'))
      ],
      easeOut: cssVar('--motion-ease-out', 'cubic-bezier(0.22, 1, 0.36, 1)'),
      easeInOut: cssVar('--motion-ease-in-out', 'cubic-bezier(0.65, 0, 0.35, 1)'),
      travelSm: cssVar('--motion-travel-sm', '0.5rem'),
      travelMd: cssVar('--motion-travel-md', '1.5rem'),
      stagger: toMs(cssVar('--motion-stagger', '70ms'))
    };
  }

  function userReduced() {
    try { return window.localStorage.getItem(STORAGE_KEY) === 'reduced'; } catch (e) { return false; }
  }

  function isReduced() {
    return Boolean((mqReduce && mqReduce.matches) || userReduced());
  }

  function baseLevel() {
    let l = parseInt(html.getAttribute('data-motion'), 10);
    if (isNaN(l)) l = parseInt(cssVar('--motion-level', ''), 10);
    if (isNaN(l)) l = 1;
    return Math.max(0, Math.min(3, l));
  }

  function effectiveLevel() {
    const l = baseLevel();
    return isReduced() ? REDUCED_MAP[l] : l;
  }

  let T = readTokens();
  let level = effectiveLevel();
  let reduced = isReduced();

  function allowed(el, move) {
    const own = parseInt(el.getAttribute('data-anim-level'), 10);
    const min = Math.max(MIN_LEVEL[move] || 1, isNaN(own) ? 0 : own);
    return level >= min;
  }

  function count(move) { tally[move] = (tally[move] || 0) + 1; }

  // ---------- shared helpers ----------

  function durationFor(el, fallbackStep) {
    const step = parseInt(el.getAttribute('data-anim-duration'), 10);
    const s = isNaN(step) ? fallbackStep : Math.max(1, Math.min(4, step));
    return T.dur[s];
  }

  function travelFor(el) {
    if (reduced) return '0px';
    if (level <= 1) return T.travelSm;
    return el.getAttribute('data-anim-travel') === 'sm' ? T.travelSm : T.travelMd;
  }

  function delayFor(el) {
    const steps = parseFloat(el.getAttribute('data-anim-delay'));
    return isNaN(steps) ? 0 : steps * T.stagger;
  }

  function clearInline(el) {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.willChange = '';
  }

  function hide(el, travel) {
    el.style.opacity = '0';
    if (travel !== '0px') el.style.transform = 'translate3d(0, ' + travel + ', 0)';
  }

  function play(el, travel, delay, duration) {
    if (!el.animate) { clearInline(el); return; }
    el.style.willChange = 'opacity, transform';
    const from = { opacity: 0, transform: 'translate3d(0, ' + travel + ', 0)' };
    const to = { opacity: 1, transform: 'translate3d(0, 0, 0)' };
    const anim = el.animate([from, to], { duration: duration, delay: delay, easing: T.easeOut, fill: 'both' });
    anim.onfinish = function () { clearInline(el); anim.cancel(); };
  }

  function onEnter(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const cb = entry.target.__tahiEnter;
          if (!cb) return;
          // Already scrolled past (reload mid-page): show it now rather than leave it hidden above.
          const above = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
          if (entry.isIntersecting || above) {
            observer.unobserve(entry.target);
            entry.target.__tahiEnter = null;
            cb(above);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    }
    el.__tahiEnter = fn;
    observer.observe(el);
  }

  // ---------- primitives ----------

  function initReveal(el) {
    if (!allowed(el, 'reveal')) return;
    count('reveal');
    const travel = travelFor(el);
    hide(el, travel);
    onEnter(el, function (skip) {
      if (skip) { clearInline(el); return; }
      play(el, travel, delayFor(el), durationFor(el, 3));
    });
  }

  function initStagger(parent) {
    if (!allowed(parent, 'reveal')) return;
    const children = Array.prototype.filter.call(parent.children, function (c) {
      return !/^(SCRIPT|TEMPLATE|STYLE)$/.test(c.tagName);
    });
    if (!children.length) return;
    count('stagger');
    const step = parseFloat(parent.getAttribute('data-anim-stagger'));
    const gap = (isNaN(step) || step <= 0 ? 1 : step) * T.stagger;
    const together = !allowed(parent, 'stagger'); // level 1: one gentle reveal for the whole group
    const base = delayFor(parent);
    const travel = travelFor(parent);
    children.forEach(function (c) { processed.add(c); hide(c, travel); });
    onEnter(parent, function (skip) {
      children.forEach(function (c, i) {
        if (skip) { clearInline(c); return; }
        const d = together ? base : base + Math.min(i, MAX_STAGGERED) * gap;
        play(c, travel, d, durationFor(parent, 3));
      });
    });
  }

  function initCounter(el) {
    if (!allowed(el, 'counter')) return;
    const finalText = el.textContent;
    const target = el.getAttribute('data-anim-to');
    const match = (target || finalText).match(/-?[\d,]*\.?\d+/);
    if (!match) return;
    count('counter');
    const raw = match[0];
    const prefix = target ? '' : finalText.slice(0, match.index);
    const suffix = target ? '' : finalText.slice(match.index + raw.length);
    const decimals = (raw.split('.')[1] || '').length;
    const value = parseFloat(raw.replace(/,/g, ''));
    const fmtOpts = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: raw.indexOf(',') !== -1
    };
    let fmt;
    try { fmt = new Intl.NumberFormat(html.lang || 'en-NZ', fmtOpts); } catch (e) { fmt = new Intl.NumberFormat('en-NZ', fmtOpts); }
    const duration = durationFor(el, 4);

    onEnter(el, function (skip) {
      if (skip) return;
      // Screen readers get the final value; the moving digits are hidden from them.
      const sr = document.createElement('span');
      sr.textContent = finalText;
      sr.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;padding:0';
      const shown = document.createElement('span');
      shown.setAttribute('aria-hidden', 'true');
      el.textContent = '';
      el.appendChild(sr);
      el.appendChild(shown);
      const start = performance.now();
      (function frame(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        shown.textContent = prefix + fmt.format(value * eased) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = finalText;
      })(start);
    });
  }

  function initMarquee(el) {
    if (!allowed(el, 'marquee') || !el.animate) return;
    count('marquee');
    const cs = getComputedStyle(el);
    const gapPx = parseFloat(cs.columnGap) || 0;
    const track = document.createElement('div');
    track.style.cssText = 'display:flex;width:max-content;gap:' + gapPx + 'px';
    const originals = Array.prototype.slice.call(el.children).filter(function (c) {
      return !c.hasAttribute('data-anim-toggle');
    });
    originals.forEach(function (c) { track.appendChild(c); });
    originals.forEach(function (c) {
      const clone = c.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('inert', '');
      track.appendChild(clone);
    });
    el.insertBefore(track, el.firstChild);
    const previousOverflow = el.style.overflow;
    el.style.overflow = 'hidden';

    const speed = parseFloat(el.getAttribute('data-anim-speed')) || 40; // px per second
    let anim = null;
    let userPaused = false;

    function build() {
      const shift = (track.scrollWidth + gapPx) / 2;
      if (anim) anim.cancel();
      anim = track.animate(
        [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(' + -shift + 'px,0,0)' }],
        { duration: (shift / speed) * 1000, iterations: Infinity, easing: 'linear' }
      );
      if (userPaused) anim.pause();
    }
    build();

    function pause() { if (anim) anim.pause(); }
    function resume() { if (anim && !userPaused) anim.play(); }
    function onToggle() {
      userPaused = !userPaused;
      toggle.setAttribute('aria-pressed', String(userPaused));
      if (userPaused) pause(); else resume();
    }

    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', resume);
    const toggle = el.querySelector('[data-anim-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.addEventListener('click', onToggle);
    }

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) resume(); else pause(); });
      });
      io.observe(el);
    }
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(function () { build(); });
      ro.observe(el);
    }

    // Teardown restores the original markup, so a stopped marquee is plain content, not clipped clones.
    cleanups.push(function () {
      if (anim) anim.cancel();
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('focusout', resume);
      if (toggle) toggle.removeEventListener('click', onToggle);
      originals.forEach(function (c) { el.insertBefore(c, track); });
      track.remove();
      el.style.overflow = previousOverflow;
    });
  }

  function initParallax(el) {
    if (!allowed(el, 'parallax') || reduced) return;
    const strength = Math.min(0.2, Math.abs(parseFloat(el.getAttribute('data-anim-speed')) || 0.1));
    const pct = (strength * 100) / 2; // 0.1 gives -5% to +5%
    if (typeof window.ViewTimeline === 'function' && el.animate) {
      count('parallax');
      const anim = el.animate(
        [{ transform: 'translate3d(0,' + -pct + '%,0)' }, { transform: 'translate3d(0,' + pct + '%,0)' }],
        { timeline: new window.ViewTimeline({ subject: el }), fill: 'both', easing: 'linear' }
      );
      cleanups.push(function () { anim.cancel(); });
      return;
    }
    const gsap = window.gsap;
    if (gsap && window.ScrollTrigger) {
      count('parallax');
      const tween = gsap.fromTo(el, { yPercent: -pct }, {
        yPercent: pct,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      cleanups.push(function () { if (tween.scrollTrigger) tween.scrollTrigger.kill(); tween.kill(); gsap.set(el, { clearProps: 'transform' }); });
    }
    // Otherwise stay static: no scroll listeners.
  }

  function splitWords(el) {
    const words = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      const parts = node.nodeValue.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const outer = document.createElement('span');
        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.1em;margin-bottom:-0.1em';
        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
        words.push(inner);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return words;
  }

  function initSplit(el) {
    if (!allowed(el, 'split')) {
      // Below level 3 a split headline still gets a gentle reveal if the level allows one.
      if (allowed(el, 'reveal')) initReveal(el);
      return;
    }
    count('split');
    const duration = durationFor(el, 4);
    const gsap = window.gsap;
    const SplitText = window.SplitText;
    if (gsap && SplitText && typeof SplitText.create === 'function') {
      gsap.set(el, { opacity: 0 });
      onEnter(el, function (skip) {
        gsap.set(el, { opacity: 1 });
        if (skip) return;
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: function (self) {
            return gsap.from(self.lines, {
              yPercent: 100,
              duration: duration / 1000,
              ease: 'power4.out',
              stagger: T.stagger / 1000,
              delay: delayFor(el) / 1000
            });
          }
        });
      });
      return;
    }
    // Vanilla word split. The accessible name stays the original sentence.
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    el.style.opacity = '0';
    onEnter(el, function (skip) {
      el.style.opacity = '';
      if (skip || !el.animate) return;
      el.setAttribute('aria-label', label);
      const words = splitWords(el);
      words.forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
      const step = Math.min(T.stagger, 600 / Math.max(1, words.length));
      words.forEach(function (w, i) {
        const a = w.animate(
          [{ transform: 'translate3d(0,110%,0)' }, { transform: 'translate3d(0,0,0)' }],
          { duration: duration, delay: delayFor(el) + i * step, easing: T.easeOut, fill: 'both' }
        );
        a.onfinish = function () { a.cancel(); };
      });
    });
  }

  function initMagnetic(el) {
    if (!allowed(el, 'magnetic') || !mqFinePointer || !mqFinePointer.matches) return;
    count('magnetic');
    const strength = Math.min(0.4, parseFloat(el.getAttribute('data-anim-strength')) || 0.3);
    let frame = 0;
    el.style.transition = 'translate ' + T.dur[2] + 'ms ' + T.easeOut;
    function move(e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
      });
    }
    function reset() { el.style.translate = ''; }
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    cleanups.push(function () {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      reset();
      el.style.transition = '';
    });
  }

  const INIT = {
    reveal: initReveal,
    counter: initCounter,
    marquee: initMarquee,
    parallax: initParallax,
    split: initSplit,
    magnetic: initMagnetic
  };

  // ---------- lifecycle ----------

  function init(root) {
    const scope = root || document;
    T = readTokens();
    reduced = isReduced();
    level = effectiveLevel();
    html.setAttribute('data-motion-effective', String(level));
    html.toggleAttribute('data-motion-reduced', reduced);

    scope.querySelectorAll('[data-anim-stagger]').forEach(function (el) {
      if (processed.has(el)) return;
      processed.add(el);
      initStagger(el);
    });
    scope.querySelectorAll('[data-anim]').forEach(function (el) {
      if (processed.has(el)) return;
      processed.add(el);
      const fn = INIT[el.getAttribute('data-anim')];
      if (fn) fn(el);
    });

    html.classList.remove('motion-pending');
    html.classList.add('motion-ready');
  }

  function teardown() {
    while (cleanups.length) {
      try { cleanups.pop()(); } catch (e) { /* keep tearing down */ }
    }
  }

  function refresh() {
    // Stop loops and pointer effects, reveal anything still waiting, then re-run at the new level.
    teardown();
    document.querySelectorAll('[data-anim], [data-anim-stagger] > *').forEach(function (el) {
      if (el.__tahiEnter) {
        if (observer) observer.unobserve(el);
        el.__tahiEnter = null;
        clearInline(el);
      }
    });
    T = readTokens();
    reduced = isReduced();
    level = effectiveLevel();
    html.setAttribute('data-motion-effective', String(level));
    html.toggleAttribute('data-motion-reduced', reduced);
    document.querySelectorAll('[data-anim="marquee"], [data-anim="parallax"], [data-anim="magnetic"]').forEach(function (el) {
      const fn = INIT[el.getAttribute('data-anim')];
      if (fn) fn(el);
    });
  }

  function setReduced(on) {
    try {
      if (on) window.localStorage.setItem(STORAGE_KEY, 'reduced');
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* storage blocked: the change still applies to this page */ }
    // The OS setting always wins: turning the toggle off never adds motion back over it.
    refresh();
  }

  function report() {
    const out = { level: level, baseLevel: baseLevel(), reduced: reduced, moves: Object.assign({}, tally) };
    const perSection = [];
    document.querySelectorAll('section, header, footer, [data-section]').forEach(function (s) {
      const n = s.querySelectorAll('[data-anim], [data-anim-stagger]').length;
      if (n) perSection.push({ section: s.id || s.className || s.tagName.toLowerCase(), animated: n });
    });
    out.perSection = perSection;
    return out;
  }

  if (mqReduce && mqReduce.addEventListener) mqReduce.addEventListener('change', refresh);

  window.TahiMotion = {
    init: init,
    refresh: refresh,
    setReduced: setReduced,
    report: report,
    get level() { return level; }
  };

  if (!html.hasAttribute('data-motion-manual')) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
    else init();
  }
})();
