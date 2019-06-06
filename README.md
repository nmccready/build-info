# build-info [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

Simple utility which combines, git, package and build creation info into one.

## buildInfoAsync

### Arguments

#### options

Type: `Object?`

- Type: `Array` options.pack - getBuildTimeAsync args
- Type: `Array` options.build - getBuildTimeAsync args
- Type: `Array` options.os - getOs args

### Returns

`Promise<Object>` of `{ pack, git, build, os }` information.

---

## getBuildTimeAsync

Returns the creation Date of the specified file.

### Arguments

#### filePath

Type: `String`

### Returns

`Promise<Date>`

```js
buildInfoAsync({
  build: [path.join(__dirname, 'index.js')],
  pack: [path.join(__dirname, '..', 'package.json')],
}).then(console.log);

/*
{ pack: { name: '@znemz/build-info', version: '0.0.1' },
  git:
   { branch: 'master',
     commit: '7f84cea66d5faf8c14000bd34a130ce730f68bde',
     tag: TagList { latest: undefined, all: [] } },
  build: 2019-06-05T20:54:50.983Z,
  os: 'macOS Mojave 10.14, Darwin: 18.6.0' }
*/
```

---

## getPackage

Returns the json object info for the specified package.json.

### Arguments

#### filePath

Type: `String`

#### picks

Type: `Array<String>?` - able to specify which fields to return. Defaults to `['name', 'version']`.

### Returns

`Promise<Object>`

---

## getGitAsync

Returns the git current commit, branch, and tag info.

### Returns

`Promise<Object>` - `{ commit, branch, tag }`

```js
getGitAsync().then(console.log);
// { branch: 'master',
//   commit: '7f84cea66d5faf8c14000bd34a130ce730f68bde',
//   tag: TagList { latest: undefined, all: [] } }
```

---

## getOS

Returns detailed OS information. Combines `os-name`, `macos-release`, and `os` libs into one.

### Arguments

#### osNameArgs

Type: `Array<any>`

#### release

Type: `string` - specify a specific release, for `mac-release`.

### Returns

`String` - OS info name + release

```js
getOS();
// macOS Mojave 10.14, Darwin: 18.6.0
```

[npm-image]: https://img.shields.io/npm/v/@znemz/build-info.svg
[npm-url]: https://www.npmjs.com/package/@znemz/build-info
[travis-image]: https://img.shields.io/travis/@znemz/build-info/@znemz/build-info.svg
[travis-url]: https://travis-ci.org/@znemz/build-info/@znemz/build-info
[coveralls-image]: https://coveralls.io/repos/github/nmccready/build-info/badge.svg
[coveralls-url]: https://coveralls.io/github/nmccready/build-info?branch=master
