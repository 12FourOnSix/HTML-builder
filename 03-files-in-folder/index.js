const fs = require('fs/promises');
const path = require('path');

async function init() {
  try {
    const dirPath = path.join(__dirname, 'secret-folder');
    const filesNamesList = await fs.readdir(dirPath);
    const filesPathsList = filesNamesList.map(fileName => path.join(dirPath, fileName));
    
    for (const filePath of filesPathsList) {
      const fileStat = await fs.stat(filePath);
      const isFile = fileStat.isFile();

      if (!isFile) continue;

      const fileSize = fileStat.size + 'B';
      const fileName = path.parse(filePath).name;
      const fileExtension = path.parse(filePath).ext.substring(1);

      console.log(`${fileName} - ${fileExtension} - ${fileSize}`);
    }     
  } catch (err) {
    console.error(err);
  }
}

init();