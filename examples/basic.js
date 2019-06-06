/* eslint-disable no-console */
import path from 'path';
import buildInfoAsync, { getGitAsync, getOS, getPackage } from '../src';

const bar = '--------';

const barThing = (str) => console.log(`\n${bar} ${str} ${bar}\n`);

buildInfoAsync({
  build: [path.join(__dirname, '..', 'src', 'index.js')],
  pack: [path.join(__dirname, '..', 'package.json')],
}).then((ret) => {
  barThing(buildInfoAsync.name);
  console.log(ret);
});

getGitAsync().then((ret) => {
  barThing(getGitAsync.name);
  console.log(ret);
});

barThing(getOS.name);
console.log(getOS());

barThing(getPackage.name);
console.log(getPackage(path.join(__dirname, '..', 'package.json')));
