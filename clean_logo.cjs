const fs = require('fs');
const path = require('path');

function cleanSvg(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    
    // Remove defs and filters
    data = data.replace(/<defs>[\s\S]*?<\/defs>/g, '');
    // Remove mask usage
    data = data.replace(/ mask="url\(#2904dee246\)"/g, '');
    
    fs.writeFileSync(filePath, data);
}

cleanSvg('public/logo.svg');
cleanSvg('src/assets/logo.svg');
console.log('SVG files cleaned successfully');
