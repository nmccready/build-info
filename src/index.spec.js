import buildInfoAsync, { getGitAsync, git } from '.';

describe(buildInfoAsync.name, () => {
  it('not error', async () => {
    const { build, os, git, pack } = await buildInfoAsync('./src/index.js', '../package.json');
    expect(build).toBeDefined();
    expect(os).toBeDefined();
    expect(git).toBeDefined();
    expect(pack).toBeDefined();
  });
  describe(getGitAsync, () => {
    it('work', async () => {
      const { branch, commit, tag } = await getGitAsync();
      const { current } = await git.branchAsync();
      expect(branch).toEqual(current);
      expect(commit).toBeTruthy();
      expect(tag).toBeTruthy();
    });
  });
});
