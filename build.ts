import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.mkdir(`${outDir}/static`);
s.mkdir(`${outDir}/static/assets`);
s.mkdir(`${outDir}/static/assets/images`);
s.cp('.env', `${outDir}/.env`);
s.cp('-r', 'public/*', `${outDir}/static`);
