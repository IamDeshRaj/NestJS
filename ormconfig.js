var config = {
    synchronize: true
}

switch (process.env.NODE_ENV) {
    case 'dev':
        Object.assign(config, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js']
        });
        break;
    case 'test':
        Object.assign(config, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts']
        });
        break;
    case 'prod':
        
        break;

    default:
        throw new Error('unknown environment');
}


console.log(JSON.stringify(config));
module.exports = config;