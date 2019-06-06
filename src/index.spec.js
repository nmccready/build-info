import path from 'path';
import _ from 'lodash';
import buildInfoAsync, { getGitAsync, git, getPackage, getBuildTimeAsync } from '.';

describe(buildInfoAsync.name, () => {
  it('not error', async () => {
    const { build, os, git, pack } = await buildInfoAsync({
      pack: [path.join(__dirname, 'index.js')],
      build: [path.join(__dirname, '..', 'package.json')],
    });
    expect(build).toBeDefined();
    expect(os).toBeDefined();
    expect(git).toBeDefined();
    expect(pack).toBeDefined();
  });

  it('fails',  () =>
    expect(buildInfoAsync({})).rejects.toThrow()
  );

  describe(getGitAsync, () => {
    it('work', async () => {
      const { branch, commit, tag } = await getGitAsync();
      const { current } = await git.branchAsync();
      expect(branch).toEqual(current);
      expect(commit).toBeTruthy();
      expect(tag).toBeTruthy();
    });
  });

  describe(getPackage.name, () => {
    it('default fields', () => {
      const obj = getPackage(path.join(__dirname, '..', 'package.json'));
      expect(Object.keys(obj)).toEqual(['name', 'version']);
    });

    it('override fields', () => {
      const test = ['scripts'];
      const obj = getPackage(path.join(__dirname, '..', 'package.json'), test);
      expect(Object.keys(obj)).toEqual(test);
    });
  });

  describe(getBuildTimeAsync.name, () => {
    it('returns Date', async () => {
      const ret = await getBuildTimeAsync(path.join(__dirname, '..', 'package.json'));
      expect(ret.toUTCString()).toMatch(/.*GMT/);
    });
  });
});
