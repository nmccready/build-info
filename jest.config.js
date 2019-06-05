const toNotIgnore = {
  modules: [].join('|'),
};

const toExport = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  // moduleFileExtensions: ['js', 'css', 'ts'],
  transformIgnorePatterns: [
    'node_modules',
    '/<rootDir>/packages/lib',
    '/<rootDir>/(?!packages)/.*/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/assetsTransformer.js',
    '\\.(css|less|pcss)(!js)$': '<rootDir>/__mocks__/assetsTransformer.js',
  },
  setupFilesAfterEnv: ['<rootDir>/__jest__/setup.js'],
  verbose: true,
};

if (toNotIgnore.modules.length) {
  toExport.transformIgnorePatterns.push(
    `/node_modules/(?!(${toNotIgnore.modules}))`
  );
}

module.exports = toExport;
