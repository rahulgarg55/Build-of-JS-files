const UglifyJS = require('uglify-js');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const srcDirectory = 'src';
const distDirectory = 'dist';

if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory);
}

const files = glob.sync(`${srcDirectory}/**/*.js`);

files.forEach((file) => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    if (content === undefined) {
      throw new Error(`Empty content in file: ${file}`);
    }

    const outputPath = path.join(distDirectory, path.relative(srcDirectory, file));

    const result = UglifyJS.minify(content);

    if (result.error) {
      throw result.error;
    }
    
    fs.writeFileSync(outputPath, result.code);
    console.log(`Minified ${file} to ${outputPath}`);
  } catch (error) {
    console.error(`Error minifying ${file}: ${error}`);
  }
});

