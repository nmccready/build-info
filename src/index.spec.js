import buildInfoAsync from '.';

describe('buildInfoAsync', () => {
  it('should not error', async () => {
    const { build, os, git, pack } = await buildInfoAsync('./src/index.js', '../package.json');
    expect(build).toBeDefined();
    expect(os).toBeDefined();
    expect(git).toBeDefined();
    expect(pack).toBeDefined();
  });
});
