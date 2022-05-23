const fsp = require('fs/promises');
const path = require('path');

async function init() {
  try {
    const stylesDirPath = path.join(__dirname, 'styles');
    const filesNamesList = await fsp.readdir(stylesDirPath);
    const filesPathsList = filesNamesList.map(fileName => path.join(stylesDirPath, fileName));
    const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
    
    let sccFilesContentArr = [];

    for (const filePath of filesPathsList) {
      const fileStat = await fsp.stat(filePath);
      const isCssFile = fileStat.isFile() && path.parse(filePath).ext === '.css';

      if (!isCssFile) continue;

      const styles = await fsp.readFile(filePath, { encoding: 'utf-8'});
      sccFilesContentArr.push(styles);
    }

    await fsp.writeFile(bundlePath, sccFilesContentArr.join('\n'));
    
  } catch (err) {
    console.error('Операция не может быть выполнена: ', err.message);
  }
}

init();