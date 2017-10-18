# Automated UI tests for BaltimoreCountyMD.gov features

## Summary

This project is the collection of automation for features for the BaltimoreCountyMD.gov website. 

## Installation (Windows)

1. Clone this repository.
1. Run the command: `npm install`
1. Download the following WebDriver executables, and store in a folder that's in your system's PATH.
    * [Chrome Driver](http://chromedriver.storage.googleapis.com/index.html)
	* [IE Driver](http://selenium-release.storage.googleapis.com/index.html)
	* [FireFox Driver](https://github.com/mozilla/geckodriver/releases/)
	
## Documentation
* [selenium-webdriver api](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

## Running Test

### Individually
To run a test individual you will use mocha.
```cli
mocha path/to/file.js --timeout 20000
```
