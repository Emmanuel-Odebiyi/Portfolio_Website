import fs from 'fs';
import path from 'path';

const files = [
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_asset_nodes_1775106638053.png', dest: 'src/assets/bento/nodes.png' },
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_asset_growth_1775106663926.png', dest: 'src/assets/bento/growth.png' },
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_asset_discovery_1775106692731.png', dest: 'src/assets/bento/discovery.png' }
];

if (!fs.existsSync('src/assets/bento')) {
  fs.mkdirSync('src/assets/bento', { recursive: true });
}

files.forEach(file => {
  if (fs.existsSync(file.src)) {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.warn(`File not found: ${file.src}`);
  }
});
