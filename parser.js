const csvFilePath = './licenses.csv';
const csv = require('csvtojson');
const fs = require('fs');

const dot = '•';
const maps = new Map();
const outputArr = [];

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    for (let i = 0; i < jsonObj.length; i++) {
        if (!maps.has(jsonObj[i].name + '@' + jsonObj[i].version)) {
            maps.set(jsonObj[i].name + '@' + jsonObj[i].version, jsonObj[i]['from package'].json || jsonObj[i]['from license'] || 'UNKNOWN');
        }
    }
    maps.delete('name@version');
    for (const [key, value] of maps.entries()) {
        outputArr.push(`${dot} ${key} --licenses: ${value}`);

    }
    fs.writeFile('./output.txt', outputArr.join('\n'), (err) => {
        if (err) throw err;
    })
    
})