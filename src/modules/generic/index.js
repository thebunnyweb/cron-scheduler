export const renderInitialHomePage = async (req, res) => {
    res.render('index', { title: 'Hello' })
}

import {fetchJobsWithDateName} from '../../middlewares/helpers'
import firedb from '../../config/firebase';

export const renderGetJobsForDate = async (req, res) =>{
    const {jobdate, jobname} = req.body 
    const jobs = await fetchJobsWithDateName(firedb, jobname, new Date(jobdate))
    res.render('index', {jobs: jobs || [] })
}