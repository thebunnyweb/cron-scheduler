import firedb from '../../config/firebase';


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