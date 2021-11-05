/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 5, 2021
 * Author: Joey Nip A01263339
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');

let fileArray = [];

const readDirP = (file) => {
  return new Promise((resolve, reject) => {
      fs.readdir(file, (err, data) => {
          if (err) {
              reject(err);
          } else {
            data.forEach(pngFile => {
              if (pngFile.toString().slice(-3) === "png") {
                fileArray.push(`./unzipped/${pngFile.toString()}`)}
              });
            resolve(fileArray);
          }
      })
  })
}

/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
    return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .on('entry', entry => entry.autodrain())
    .promise()
    .then(() => console.log("Extraction operation complete"))
}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */

const grayScale = function (pathIn, pathOut) {

    fs.createReadStream(pathIn)
      .pipe(new PNG({}))
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            const conversion = (0.3 * this.data[idx] + 0.59 * this.data[idx + 1] + 0.11 * this.data[idx + 2]);
    
            // color manipulation
            this.data[idx] = conversion;
            this.data[idx + 1] = conversion;
            this.data[idx + 2] = conversion;
          }
        }
      this.pack().pipe(fs.createWriteStream(pathOut + `/filtered${pathIn.slice(11)}`));
    });
  };

module.exports = {
  unzip,
  readDirP,
  grayScale
};