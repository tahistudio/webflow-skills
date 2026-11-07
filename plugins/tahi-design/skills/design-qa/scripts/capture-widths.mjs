#!/usr/bin/env node
/*
 * Full-page screenshots of one or more URLs at the design QA widths.
 *
 * Usage:
 *   node capture-widths.mjs [options] <url> [url...]
 *
 * Options:
 *   --craft 1|2|3        width set for the craft level (default 2)
 *   --widths 1440,390    explicit widths instead of the craft set
 *   --out dir            output folder (default docs/qa/shots)
 *   --reduced            emulate prefers-reduced-motion: reduce
 *   --dark               emulate prefers-color-scheme: dark
 *   --browser name       chromium (default), firefox or webkit
 *   --viewport-only      capture the first screen only, not the full page
 *
 * Needs Playwright: npm i -D playwright && npx playwright install chromium
 * Scrolls each page top to bottom before capturing so scroll reveals have run.
 * Read-only: it only loads pages. Point it at staging, not production.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const WIDTH_SETS = {
  1: [1440, 1280, 768, 390],
  2: [1440, 1366, 1280, 1180, 1024, 992, 991, 834, 768, 767, 480, 430, 390, 375, 360],
  3: [1920, 1600, 1440, 1366, 1280, 1180, 1024, 992, 991, 834, 820, 768, 767, 480, 430, 390, 375, 360, 320]
};

function parseArgs(argv) {
  const opts = { craft: 2, widths: null, out: 'docs/qa/shots', reduced: false, dark: false, browser: 'chromium', fullPage: true, urls: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--craft') opts.craft = Number(argv[++i]);
    else if (a === '--widths') opts.widths = argv[++i].split(',').map(Number).filter(Boolean);
    else if (a === '--out') opts.out = argv[++i];
    else if (a === '--reduced') opts.reduced = true;
    else if (a === '--dark') opts.dark = true;
    else if (a === '--browser') opts.browser = argv[++i];
    else if (a === '--viewport-only') opts.fullPage = false;
    else if (a === '--help' || a === '-h') opts.help = true;
    else opts.urls.push(a);
  }
  return opts;
}

function slug(url) {
  const u = new URL(url);
  const p = u.pathname.replace(/\/+$/, '').replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-') || 'home';
  return p.toLowerCase();
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.urls.length) {
    console.log('Usage: node capture-widths.mjs [--craft 1|2|3] [--widths 1440,390] [--out dir] [--reduced] [--dark] [--browser chromium|firefox|webkit] [--viewport-only] <url> [url...]');
    process.exit(opts.help ? 0 : 1);
  }

  let pw;
  try {
    pw = await import('playwright');
  } catch {
    console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install ' + opts.browser);
    process.exit(1);
  }
  const engine = pw[opts.browser];
  if (!engine) {
    console.error('Unknown browser: ' + opts.browser);
    process.exit(1);
  }

  const widths = opts.widths || WIDTH_SETS[opts.craft] || WIDTH_SETS[2];
  const suffix = (opts.reduced ? '-reduced' : '') + (opts.dark ? '-dark' : '');
  await mkdir(opts.out, { recursive: true });

  const browser = await engine.launch();
  const saved = [];
  try {
    for (const url of opts.urls) {
      for (const width of widths) {
        const context = await browser.newContext({
          viewport: { width, height: width >= 1024 ? 900 : width >= 768 ? 1024 : 800 },
          deviceScaleFactor: 1,
          reducedMotion: opts.reduced ? 'reduce' : 'no-preference',
          colorScheme: opts.dark ? 'dark' : 'light'
        });
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        await scrollThrough(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        const file = path.join(opts.out, `${slug(url)}-${width}${suffix}.png`);
        await page.screenshot({ path: file, fullPage: opts.fullPage });
        saved.push({ url, width, file, horizontalOverflow: overflow });
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  for (const s of saved) {
    console.log(`${s.horizontalOverflow ? 'OVERFLOW ' : ''}${s.width}\t${s.file}`);
  }
  const overflowing = saved.filter((s) => s.horizontalOverflow);
  if (overflowing.length) {
    console.log(`\n${overflowing.length} capture(s) have horizontal overflow: check those widths first.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
