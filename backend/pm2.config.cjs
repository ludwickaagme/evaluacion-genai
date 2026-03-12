module.exports = {
    apps: [
        {
            name: 'aws-assessment-backend',
            script: 'index.js',
            pmx: false,
            env_production: {
                "NODE_ENV": "production",
                "PORT": "50900",
                "API_VERSION": "0.1",
            }
        }
    ]
};