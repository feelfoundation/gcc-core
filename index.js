const { Application, genesisBlockDevnet, configDevnet } = require('feel-sdk'); 

configDevnet.app.label = 'gcc'; 
configDevnet.components.storage.user = 'feel'; 
configDevnet.components.storage.password = 'password'; 

const app = new Application(genesisBlockDevnet, configDevnet); 

app 
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });