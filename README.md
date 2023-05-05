# testcafe-reporter-json-custom
[![Build Status](https://travis-ci.org/gwenaelp/testcafe-reporter-json-custom.svg)](https://travis-ci.org/gwenaelp/testcafe-reporter-json-custom)

This is the **json-custom** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/gwenaelp/testcafe-reporter-json-custom/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-json-custom
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter json-custom
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('json-custom') // <-
    .run();
```

## Author
Gwenael Pluchon 
