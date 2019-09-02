import firedb from '../../config/firebase';
import cron from 'node-cron';



export const dateStringConvert = (date) => {
    let datestring = `${date.getFullYear()}${date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth}` }${date.getDate().toString().length === 1 ? `0${date.getDate() + 1}` : `${date.getDate}`}`
    return datestring;
}

export const fetchJobs = async (db) => {
    let jobs = []
    const collection = await db.collection('jobs').get()
    collection.docs.forEach((doc)=>{
        let data = doc.data()
        jobs.push(data);
    });
    return jobs    
}

export const jobsForDisplay = async (path, rundays, runtime, zone, date) => {
    let datestr = dateStringConvert(date);
    
}

export const jobScheduler = (path, rundays, runtime, zone) =>{
    console.log('SCHEDULED: ', path)
}

export const generateJobsStatusForDate = (datestr, jobs) => {
    let jobsForDate = []
    jobs.forEach((item)=>{
        jobsForDate.push({
            path: item['path'],
            runstatus: 'Ready',
            zone: item['zone'],
            runs: 0
        })
    });
    firedb.collection('jobstatus').add({
        [datestr]: [
            ...jobsForDate
        ]
    });
    console.log('Jobs Generated for date', datestr)
}

export const masterJobScheduler = () => {
    console.log('Master Job Scheduled')
    cron.schedule('*/5 * * * * *', async ()=>{
        let dateString = dateStringConvert(new Date());
        let jobstatusCollection = await firedb.collection('jobstatus').get();
        let jobs = await fetchJobs(firedb);
        let jobStatusDocs = []
        jobstatusCollection.forEach((doc)=>{
            jobStatusDocs.push(doc.data())
        });
        if(jobStatusDocs.length > 0){
            // Check if the doc exits for today
            let checkDataValidity = []
            jobStatusDocs.forEach((item)=>{
                checkDataValidity.push(...Object.keys(item))
            });
            if(checkDataValidity.indexOf(dateString) > -1){
                console.log('Exists', checkDataValidity)
            }else{
                generateJobsStatusForDate(dateString,jobs)
            }
        }else{
            generateJobsStatusForDate(dateString,jobs)
        }
    },{
        scheduled: true,
        timezone: 'Asia/Kolkata'
    })
}


export const fetchJobsWithDateName = async (db, jobname, date) => {
    let jobs = await fetchJobs(db);
    let jobsFilter = jobname === '' ? jobs : jobs.filter((item)=>item['path'].split('/').indexOf(jobname) > -1);
    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];    
    let displayJobs = [];
    jobsFilter.forEach(function(elem){
        if(elem['path']){
            let rundays = elem['rundays'] === 'a' ? 'Sun,Mon,Wed,Tue,Thu,Fri,Sat' : elem['rundays'] === 'b' ? 'Mon,Tue,Wed,Thu,Fri' : elem['rundays'];
            let runtime = elem['runtime'] ? elem['runtime'] : '22:00';
            if(rundays.split(',').indexOf(days[date.getDay()]) > -1){
                displayJobs.push(elem)
                jobsForDisplay(elem['path'],rundays, runtime, elem['zone'], date)
                if(!elem['scheduled']){
                    jobScheduler(elem['path'], rundays, runtime, elem['zone'])
                }
            }
        }
        return
    });
    return displayJobs;
}

