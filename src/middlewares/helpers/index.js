import firebase from 'firebase'


export const fetchJobs = async (db) => {
    let jobs = []
    const collection = await db.collection('jobs').get()
    collection.docs.forEach((doc)=>{
        let data = doc.data()
        jobs.push(data);
    });
    return jobs    
}