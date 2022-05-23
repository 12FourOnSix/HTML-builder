const { copyFile, mkdir, readdir } = require('fs/promises');
const { join } = require('path');

async function init() {
  try {
    const copyDirPath = join(__dirname, 'files-copy');
    await mkdir(copyDirPath, { recursive: true});

    const origDirPath = join(__dirname, 'files');
    const filesNamesList = await readdir(origDirPath);
    
    for (const fileName of filesNamesList) {
      const origFilePath = join(origDirPath, fileName);
      const copyFilePath = join(copyDirPath, fileName);

      await copyFile(origFilePath, copyFilePath);
    }

  } catch (err) {
    console.error('Содержимое исходной папки не может быть скопировано: ', err.message);
  }
}

init();