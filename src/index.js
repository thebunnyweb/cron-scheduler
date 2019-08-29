const path = require('path');
const shell = require("shelljs");
const baseDir = path.resolve(__dirname, '')
const configJson = require(`${baseDir}/cronfiles/mycoso/dbbackup/backupall.json`);

module.exports = (function(){

    // let parameters = configJson['script'].split('--').slice(2)
    // let data = []
    // parameters.forEach(function(item){
    //     data.push({
    //         [item.split("=")[0]]: item.split("=")[1]
    //     });
    // });

    if(shell.exec(`node ${baseDir}${configJson['script']}`).code == 0){
        console.log(`Done`)
    }

})();