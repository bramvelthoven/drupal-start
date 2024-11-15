import path from "node:path";
import fs from "node:fs";
import { __dirname } from './webpack.path-utils.mjs';

const staticEntries = [
  {
    name: 'css/main',
    path: ['./src/scss/main.scss']
  },
  {
    name: 'libraries/fontawesome/fontawesome',
    path: ['./src/scss/libraries/fontawesome.scss']
  }
];

const componentsPaths = [
  path.resolve(__dirname, './components/atoms'),
  path.resolve(__dirname, './components/molecules'),
  path.resolve(__dirname, './components/organisms'),
];

const jsPaths = [
  path.resolve(__dirname, 'src/js'),
];

function getJsEntryPoints() {
  const entryPoints = {};

  jsPaths.forEach((srcPath) => {
    const files = fs.readdirSync(srcPath);
    files.forEach((file) => {
      if (path.extname(file) === '.js') {
        const { name } = path.parse(file);
        entryPoints[`js/${name}`] = path.resolve(srcPath, file);
      }
    });
  });

  return entryPoints;
}

function getComponentEntryPoints() {
  const entryPoints = {};

  componentsPaths.forEach((componentsPath) => {
    const componentDirs = fs.readdirSync(componentsPath);
    componentDirs.forEach((componentDir) => {
      const componentPath = path.resolve(componentsPath, componentDir);
      const relativeComponentPath = path.relative(__dirname, componentsPath);

      if (fs.existsSync(componentPath) && fs.statSync(componentPath).isDirectory()) {
        const componentFiles = fs.readdirSync(componentPath);

        const jsFiles = componentFiles
          .filter((file) => path.extname(file) === '.js')
          .map((file) => path.resolve(componentPath, file));
        const scssFile = componentFiles.find((file) => path.extname(file) === '.scss');

        if (jsFiles.length > 0 || scssFile) {
          entryPoints[`${relativeComponentPath}/${componentDir}/${componentDir}`] = [
            ...jsFiles,
            scssFile && path.resolve(componentPath, scssFile),
          ].filter(Boolean);
        }
      }
    });
  });

  return entryPoints;
}

function getStaticEntryPoints() {
  return staticEntries.reduce((acc, entry) => {
    acc[entry.name] = entry.path;
    return acc;
  }, {});
}

export default {
  getStaticEntryPoints,
  getJsEntryPoints,
  getComponentEntryPoints
};
