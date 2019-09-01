const path = require('path');
const shell = require("shelljs");
const baseDir = path.resolve(__dirname, '');
const axios = require('axios');
const cron = require('node-cron');

module.exports = (function(){

    var displayJob = function(id, name, runday, runtime, zone){
        // Display Jobs
        // console.log('DISPLAY JOBS : ', name)
    }

    var scheduleJob = function(id, name, runday, runtime, zone){
        try{
            var config = require(`${baseDir}${name}.json`);
        }catch(e){
            console.log('No config found for the job', name)
            return
        }
        try{
            shell.exec(`node ${baseDir}${config['script']}`)
        }catch(e){
            console.log('Error executing the script',e)
        }
    }

    var generateJobs = function(data){
        let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        data.forEach(function(elem){
            if(elem['path']){
                let rundays = elem['rundays'] === 'a' ? 'Sun,Mon,Wed,Tue,Thu,Fri,Sat' : elem['rundays'] === 'b' ? 'Mon,Tue,Wed,Thu,Fri' : elem['rundays'];
                let runtime = elem['runtime'] ? elem['runtime'] : '22:00';
                let date = new Date();
                if(rundays.split(',').indexOf(days[date.getDay()]) > -1){
                    displayJob(elem['id'], elem['path'],rundays, runtime, elem['zone'])
                    if(!elem['scheduled']){
                        scheduleJob(elem['id'], elem['path'], rundays, runtime, elem['zone'])
                    }
                }
            }
            return
        });
    }

    try{
        axios.get('http://localhost:3000/jobs').then(function(results){
            generateJobs(results['data'])
        });
    }catch(e){
        console.log('Error while fetching information : ', e)
    }
    
})();