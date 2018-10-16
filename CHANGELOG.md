# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.7.3"></a>
## [0.7.3](https://github.com/xivapi/angular-client/compare/v0.7.2...v0.7.3) (2018-10-16)


### Bug Fixes

* support for string type in lodestoneIds for long ids (Free company mainly) ([88a1c4e](https://github.com/xivapi/angular-client/commit/88a1c4e))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/xivapi/angular-client/compare/v0.7.1...v0.7.2) (2018-10-16)


### Bug Fixes

* fixed case on list model ([ae078cb](https://github.com/xivapi/angular-client/commit/ae078cb))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/xivapi/angular-client/compare/v0.7.0...v0.7.1) (2018-10-08)


### Bug Fixes

* fixed an issue with Search endpoint being wrong ([e1f39f7](https://github.com/xivapi/angular-client/commit/e1f39f7))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/xivapi/angular-client/compare/v0.6.7...v0.7.0) (2018-10-08)


### Features

* added support for staging requests via request options ([d8a7184](https://github.com/xivapi/angular-client/commit/d8a7184))



<a name="0.6.7"></a>
## [0.6.7](https://github.com/xivapi/angular-client/compare/v0.6.6...v0.6.7) (2018-09-25)


### Bug Fixes

* fixed an issue with aot compilation and service factory ([10df2ad](https://github.com/xivapi/angular-client/commit/10df2ad))



<a name="0.6.6"></a>
## [0.6.6](https://github.com/xivapi/angular-client/compare/v0.6.5...v0.6.6) (2018-09-25)


### Bug Fixes

* fixed aot error with forRoot method ([f251299](https://github.com/xivapi/angular-client/commit/f251299))



<a name="0.6.5"></a>
## [0.6.5](https://github.com/xivapi/angular-client/compare/v0.6.4...v0.6.5) (2018-09-15)


### Bug Fixes

* fix missing search options ([a902fda](https://github.com/xivapi/angular-client/commit/a902fda)), closes [#3](https://github.com/xivapi/angular-client/issues/3)



<a name="0.6.4"></a>
## [0.6.4](https://github.com/xivapi/angular-client/compare/v0.6.3...v0.6.4) (2018-09-14)


### Bug Fixes

* changed search filters to use comma-chaining instead of URL params chaining ([4584b97](https://github.com/xivapi/angular-client/commit/4584b97)), closes [#2](https://github.com/xivapi/angular-client/issues/2)



<a name="0.6.3"></a>
## [0.6.3](https://github.com/xivapi/angular-client/compare/v0.6.2...v0.6.3) (2018-09-14)


### Bug Fixes

* fixed search method and added proper tests for it ([4314791](https://github.com/xivapi/angular-client/commit/4314791))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/xivapi/angular-client/compare/v0.6.1...v0.6.2) (2018-09-13)


### Bug Fixes

* fixed an issue with search options not being passed to query ([66e3851](https://github.com/xivapi/angular-client/commit/66e3851))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/xivapi/angular-client/compare/v0.6.0...v0.6.1) (2018-09-13)


### Bug Fixes

* fixed an issue with search filters not being applied at all ([77050f5](https://github.com/xivapi/angular-client/commit/77050f5))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/xivapi/angular-client/compare/v0.5.2...v0.6.0) (2018-09-03)


### Features

* support for pvp team and schema updates ([4689264](https://github.com/xivapi/angular-client/commit/4689264))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/xivapi/angular-client/compare/v0.5.1...v0.5.2) (2018-09-01)


### Bug Fixes

* update Character schema to follow api updates ([13acf73](https://github.com/xivapi/angular-client/commit/13acf73))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/xivapi/angular-client/compare/v0.5.0...v0.5.1) (2018-09-01)


### Bug Fixes

* fixed an issue with server param error in character search ([4856ce8](https://github.com/xivapi/angular-client/commit/4856ce8))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/xivapi/angular-client/compare/v0.4.1...v0.5.0) (2018-09-01)


### Features

* add support for character search query, including server listing ([1215f7c](https://github.com/xivapi/angular-client/commit/1215f7c))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/xivapi/angular-client/compare/v0.4.0...v0.4.1) (2018-08-27)


### Bug Fixes

* fix a stupid typo in package.json that wat breaking imports ([772bb7c](https://github.com/xivapi/angular-client/commit/772bb7c))



<a name="0.4.0"></a>
# 0.4.0 (2018-08-26)


### Bug Fixes

* fixed an error with AOT build ([ff4ec8e](https://github.com/xivapi/angular-client/commit/ff4ec8e))
* import failing in app.module.ts files ([3cdbe62](https://github.com/xivapi/angular-client/commit/3cdbe62))
* update schemas to follow breaking changes introduced in the API ([8e58e7b](https://github.com/xivapi/angular-client/commit/8e58e7b))


### Features

* implement new filters in search request ([a15834f](https://github.com/xivapi/angular-client/commit/a15834f))
* implemented all endpoints described in docs as of v1.27.8 ([170394b](https://github.com/xivapi/angular-client/commit/170394b))
* support for /Character endpoint ([238c604](https://github.com/xivapi/angular-client/commit/238c604))
* support for new filter operators ([6ac0a9e](https://github.com/xivapi/angular-client/commit/6ac0a9e))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/xivapi/angular-client/compare/v0.2.0...v0.3.0) (2018-08-10)


### Features

* support for /Character endpoint ([238c604](https://github.com/xivapi/angular-client/commit/238c604))



<a name="0.2.0"></a>
# 0.2.0 (2018-08-03)


### Bug Fixes

* fixed an error with AOT build ([ff4ec8e](https://github.com/xivapi/angular-client/commit/ff4ec8e))


### Features

* implement new filters in search request ([a15834f](https://github.com/xivapi/angular-client/commit/a15834f))
* implemented all endpoints described in docs as of v1.27.8 ([170394b](https://github.com/xivapi/angular-client/commit/170394b))
* support for new filter operators ([6ac0a9e](https://github.com/xivapi/angular-client/commit/6ac0a9e))
