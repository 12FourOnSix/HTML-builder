const fsp = require('fs/promises');
const { join, parse } = require('path');

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

async function bundleStyles() {
  try {
    const stylesDirPath = path.join(__dirname, 'styles');
    const filesNamesList = await fsp.readdir(stylesDirPath);
    const filesPathsList = filesNamesList.map(fileName => path.join(stylesDirPath, fileName));
    const bundlePath = path.join(__dirname, 'style.css');
    
    let sccFilesContentArr = [];

    for (const filePath of filesPathsList) {
      const fileStat = await fsp.stat(filePath);
      const isCssFile = fileStat.isFile() && parse(filePath).ext === '.css';

      if (!isCssFile) continue;

      const styles = await fsp.readFile(filePath, { encoding: 'utf-8'});
      sccFilesContentArr.push(styles);
    }

    await fsp.writeFile(bundlePath, sccFilesContentArr.join('\n'));
    
  } catch (err) {
    console.error('Операция не может быть выполнена: ', err.message);
  }
}

function init() {
  //copyAssets();
  bundleStyles();
}

init();