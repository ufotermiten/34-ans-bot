const Papa = require('papaparse');
const fs = require('node:fs');
const kepsDaysFile = './data/kepsdagar.csv';

module.exports = () => Papa.parse(fs.readFileSync(kepsDaysFile, 'utf8'), { header: true, dynamicTyping: true }).data;