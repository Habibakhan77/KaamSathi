import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = 'C:\\Users\\laiba\\.gemini\\antigravity\\scratch\\kaamsaathi\\screenshots';
const ARTIFACT_DIR = 'C:\\Users\\laiba\\.gemini\\antigravity\\brain\\1372156d-056e-4c2b-9c31-05970c2d76fd';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = [
  { name: 'home-desktop', url: 'http://localhost:3000/', width: 1440, height: 900 },
  { name: 'home-mobile', url: 'http://localhost:3000/', width: 390, height: 844 },
  { name: 'services-desktop', url: 'http://localhost:3000/services', width: 1440, height: 900 },
  { name: 'provider-desktop', url: 'http://localhost:3000/providers/prov-swat-01', width: 1440, height: 900 },
  { name: 'booking-desktop', url: 'http://localhost:3000/book', width: 1440, height: 900 },
  { name: 'ai-assistant-desktop', url: 'http://localhost:3000/ai-assistant', width: 1440, height: 900 },
  { name: 'customer-dashboard', url: 'http://localhost:3000/dashboard/customer', width: 1440, height: 900 },
  { name: 'provider-dashboard', url: 'http://localhost:3000/dashboard/provider', width: 1440, height: 900 },
  { name: 'admin-dashboard', url: 'http://localhost:3000/dashboard/admin', width: 1440, height: 900 }
];

async function run() {
  console.log('Launching Edge browser at:', EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  for (const pageInfo of pages) {
    console.log(`Capturing ${pageInfo.name} (${pageInfo.url})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: pageInfo.width, height: pageInfo.height });
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait a brief moment for animations to settle
    await new Promise((r) => setTimeout(r, 1200));

    const outPath = path.join(OUTPUT_DIR, `${pageInfo.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved: ${outPath}`);

    // Also copy to artifact dir for markdown visualization
    const artifactPath = path.join(ARTIFACT_DIR, `${pageInfo.name}.png`);
    fs.copyFileSync(outPath, artifactPath);

    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
