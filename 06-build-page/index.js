const fsp = require('fs/promises');
const { join } = require('path');

const projectDir = join(__dirname, 'project-dist');

async function copyAssets() {
  try {
    const destProjectDirPath = join(projectDir, 'assets');
    await fsp.mkdir(destProjectDirPath, { recursive: true});

    const origDirPath = join(__dirname, 'assets');
    const contentList = await fsp.readdir(origDirPath);
    
    for (const item of contentList) {
      let origPath1 = join(origDirPath, item);
      let copyPath1 = join(destProjectDirPath, item);
      const itemStat = await fsp.stat(origPath1);
      const isDirectory = itemStat.isDirectory();

      if (isDirectory) {
        await fsp.mkdir(copyPath1, { recursive: true});

        const innerOrigContentList = await fsp.readdir(origPath1);

        for (const item of innerOrigContentList) {
          const origPath2 = join(origPath1, item);
          const copyPath2 = join(copyPath1, item);
          
          await fsp.copyFile(origPath2, copyPath2);
        }

      } else {
        await fsp.copyFile(origPath1, copyPath1);
      }
    }

  } catch (err) {
    console.error('Содержимое исходной папки не может быть скопировано: ', err.message);
  }
}

function init() {
  copyAssets();
}

init();