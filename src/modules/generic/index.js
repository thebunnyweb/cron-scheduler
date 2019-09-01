export const renderInitialHomePage = async (req, res) => {
    res.render('index', { title: 'Hello' })
}

export const renderGetJobsForDate = async (req, res) =>{
    console.log(req.body)
    res.render('index', {title: 'Hello'})
}