/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: Main functions
 * 
 * Created Date: November 5, 2021
 * Author: Joey Nip A01263339
 * 
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

const unzip = require("./IOhandler.js").unzip
const readDirP = require("./IOhandler.js").readDirP
const grayScale = require("./IOhandler.js").grayScale
const fileArray = require("./IOhandler")

unzip(zipFilePath, pathUnzipped)
  .then(() => readDirP("./unzipped"))
  .then((fileArr) => {fileArr.forEach(filterImage => {
    grayScale(filterImage, "./grayscaled")
  });
  })
  .catch((err) => console.log(err));