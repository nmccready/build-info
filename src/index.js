import gitFact from 'simple-git';
import { promisifyAll, props } from 'bluebird';
import osName from 'os-name';
import { pick, first } from 'lodash';
import _fs from 'fs';
import os from 'os';
import macosRelease from 'macos-release';

export const git = promisifyAll(gitFact());

const fs = promisifyAll(_fs);

export const getOS = (osNameArgs = [], release = os.release()) => {
  const name = osName(...osNameArgs);
  const shortName = first(name.split(' '));
  if (['macOS', 'OS X'].indexOf(shortName) >= 0) {
    release = `${macosRelease(release).version}, Darwin: ${release}`;
  }
  return `${name} ${release}`;
};

export const getGitAsync = () =>
  // get all git, and build info and output it to a static json file
  props({
    branch: git.branchAsync().then(({ current }) => current),
    commit: git.showAsync().then((ret) =>
      ret
        .split(' ')[1]
        .replace('commit ', '')
        .replace(/\n.*/g, '')
    ),
  }).then((all) => {
    const { commit } = all;
    return props({ ...all, tag: git.tagsAsync({ '--contains': commit }) });
  });

/**
 * @param  {String} filePath
 * @param  {Array<String>} picks - array of fields allowed to be returned,
 * important for security to return a minimum amount of fields. Keep in
 * mind that if you are exposing dependencies it is a security risk and
 * thus that endpoint should only available to admins.
 */
export const getPackage = (filePath, picks = ['name', 'version']) =>
  pick(require(filePath), picks);

/**
 * @param  {String} filePath
 */
export const getBuildTimeAsync = (filePath) => {
  return fs.statAsync(filePath).then(({ birthtime }) => birthtime);
};

/**
 * @param  {Object} options
 * @param  {Array} options.pack - getBuildTimeAsync args
 * @param  {Array} options.build - getBuildTimeAsync args
 * @param  {Array} options.os - getOs args
 */
const buildInfoAsync = ({ pack = [], build = [], os = [] }) =>
  props({
    pack: getPackage(...pack),
    git: getGitAsync(),
    build: getBuildTimeAsync(...build),
    os: getOS(...os),
  });

export default buildInfoAsync;
