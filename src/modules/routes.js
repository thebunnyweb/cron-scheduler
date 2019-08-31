import * as InitalLoader from './generic'

export default app => {
    app.get('/', InitalLoader.renderInitialHomePage)
    app.post('/jobsearch', InitalLoader.renderGetJobsForDate)
}