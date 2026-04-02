import fs from 'fs';
import path from 'path';

const files = [
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_nodes_light_1775108080939.png', dest: 'src/assets/bento/nodes.png' },
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_growth_light_1775108110491.png', dest: 'src/assets/bento/growth.png' },
  { src: 'C:/Users/emman/.gemini/antigravity/brain/e40cd6cb-535b-4802-bf08-8bf878b278f3/bento_discovery_light_1775108329113.png', dest: 'src/assets/bento/discovery.png' }
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
