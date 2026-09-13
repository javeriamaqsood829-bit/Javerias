const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const publicDir = path.resolve(__dirname, '../public');

// Master SVG Vector Artwork for SOMA: Growth Strategist & Digital Marketer
// Engineered for optical clarity at 16x16 (Google Search) and razor-sharp luxury at 512x512
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Deep Obsidian Studio Background -->
    <radialGradient id="bgGrad" cx="50%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#1c1917" />
      <stop offset="45%" stop-color="#0c0a09" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>

    <!-- High-Impact Growth Flame Gradient (Warm White -> Gold -> Amber -> Electric Sunset) -->
    <linearGradient id="growthGrad" x1="15%" y1="85%" x2="85%" y2="15%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="28%" stop-color="#f97316" />
      <stop offset="60%" stop-color="#f59e0b" />
      <stop offset="85%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>

    <!-- Secondary Accent for Lower S-Ribbon -->
    <linearGradient id="baseGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c2410c" />
      <stop offset="50%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>

    <!-- Ascending Analytics Bar Gradient -->
    <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>

    <!-- Precision Glowing Edge Rim for Ultra-High Contrast on Dark & Light Search Results -->
    <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95" />
      <stop offset="35%" stop-color="#f97316" stop-opacity="0.4" />
      <stop offset="70%" stop-color="#27272a" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.9" />
    </linearGradient>

    <!-- Subtle Optical Glow -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#f97316" flood-opacity="0.35" />
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- High-Density Squircle Canvas (Works flawlessly across all browser sizes & Google Search) -->
  <rect x="20" y="20" width="472" height="472" rx="116" fill="url(#bgGrad)" />
  <rect x="20" y="20" width="472" height="472" rx="116" fill="none" stroke="url(#rimGrad)" stroke-width="12" />

  <g filter="url(#glow)">
    <!-- 1. Analytical Growth Indicator Bars (Left side baseline) -->
    <rect x="96" y="340" width="28" height="56" rx="10" fill="url(#barGrad)" opacity="0.6" />
    <rect x="136" y="292" width="28" height="104" rx="10" fill="url(#barGrad)" opacity="0.85" />

    <!-- 2. Lower Body of the Monogram 'S' -->
    <path d="M 178 396
             C 214 416 260 422 300 408
             C 346 392 376 352 372 308
             C 368 266 332 238 274 220
             L 242 210
             C 194 196 172 178 174 150
             C 176 120 206 98 250 96
             C 278 94 308 102 334 116"
          fill="none"
          stroke="url(#baseGrad)"
          stroke-width="50"
          stroke-linecap="round"
          stroke-linejoin="round" />

    <!-- 3. Dynamic Upward Growth Spine & Arrow (Cuts diagonally and launches to the top right) -->
    <line x1="204" y1="316" x2="384" y2="136"
          stroke="url(#growthGrad)"
          stroke-width="54"
          stroke-linecap="round" />

    <!-- 4. Aerodynamic Arrowhead at (396, 124) -->
    <path d="M 296 124 L 396 124 L 396 224"
          fill="none"
          stroke="url(#growthGrad)"
          stroke-width="54"
          stroke-linecap="round"
          stroke-linejoin="round" />

    <!-- 5. Brilliant Radiant White Core Spark -->
    <circle cx="396" cy="124" r="14" fill="#ffffff" />
  </g>
</svg>
`;

async function main() {
  console.log('Writing public/favicon.svg...');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterSvg);

  const svgBuffer = Buffer.from(masterSvg);

  const pngSizes = [
    { size: 16, name: 'temp_16.png' },
    { size: 32, name: 'temp_32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 96, name: 'favicon-96x96.png' },
    { size: 144, name: 'favicon-144x144.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'favicon-192x192.png' },
    { size: 512, name: 'favicon-512x512.png' },
    { size: 512, name: 'favicon.png' }, // Replace invalid JPEG with real 512px PNG!
  ];

  for (const item of pngSizes) {
    const dest = path.join(publicDir, item.name);
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Generate multi-resolution favicon.ico containing 16x16, 32x32, 48x48
  const p16 = path.join(publicDir, 'temp_16.png');
  const p32 = path.join(publicDir, 'temp_32.png');
  const p48 = path.join(publicDir, 'favicon-48x48.png');
  const icoDest = path.join(publicDir, 'favicon.ico');

  console.log('Generating multi-resolution favicon.ico...');
  execSync(`convert "${p16}" "${p32}" "${p48}" "${icoDest}"`);
  console.log('favicon.ico generated successfully!');

  // Clean up temporary 16 and 32 pngs
  fs.unlinkSync(p16);
  fs.unlinkSync(p32);

  console.log('All favicons successfully generated!');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
