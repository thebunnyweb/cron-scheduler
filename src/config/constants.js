const devConfig = {}
const prodConfig = {}
const defaultConfig = {
    PORT: process.env.PORT || 5001
}

function getEnVConfig(env){
    switch(env){
        case 'development': 
            return devConfig;
        case 'production':
            return prodConfig;
        default:
            return {}
    }
}

export default {
    ...defaultConfig,
    ...getEnVConfig(process.env.NODE_ENV)
}