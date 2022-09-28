import fs from 'fs';
import chokidar from 'chokidar';
import clc from 'cli-color';
import prettier from 'prettier';
import generatorTypeContent from './generatorTypeContent';
import getSchemaTypes from './getSchemaTypes';

const eventLabel = {
  add: '创建·文件',
  change: '保存·文件',
  unlink: '删除·文件',
  addDir: '创建·目录',
  unlinkDir: '删除·目录',
};

const createService = (basePath: string, serverPath: string, key?: string) => {
  const fileNameKey = key || 'Schema';
  getSchemaTypes(serverPath);

  chokidar
    .watch(basePath, {
      ignoreInitial: true,
      ignored: new RegExp(
        `(^((?!${fileNameKey}).)*(.(j|t)s)+)|.less|.(j|t)sx|.scss`,
      ),
    })
    .on('all', async (event, path) => {
      console.info(clc.blueBright('监听到文件变更！'));
      console.info(clc.blueBright(`${eventLabel[event]}，路径：${path}`));
      const typeFilePath = path.replace(`${fileNameKey}`, 'Type');
      const pathArr = typeFilePath.split('/');
      const typeFileName = pathArr[pathArr.length - 1];
      switch (event) {
        case 'add':
          if (!fs.existsSync(typeFilePath)) {
            fs.writeFileSync(typeFilePath, '');

            console.info(
              clc.greenBright(
                `同步创建 ${typeFileName} 文件，路径：${typeFilePath}`,
              ),
            );
          }
          break;
        case 'unlink':
          if (fs.existsSync(typeFilePath)) {
            fs.unlinkSync(typeFilePath);
            console.info(
              clc.redBright(
                `同步删除 ${typeFileName} 文件，路径：${typeFilePath}`,
              ),
            );
          }
          break;
        case 'change':
          {
            const content = await generatorTypeContent(path, serverPath);
            fs.writeFileSync(
              typeFilePath,
              prettier.format(content, {
                parser: 'typescript',
                singleQuote: true,
              }),
            );
            console.info(
              clc.greenBright(
                `同步更新 ${typeFileName} 文件，路径：${typeFilePath}`,
              ),
            );
          }
          break;
        default:
          break;
      }
    });
};

export default createService;
