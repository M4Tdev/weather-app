import fs from 'fs';

fs.writeFileSync('./.env', `APIKEY=${process.env.APIKEY} PROXY=${process.env.PROXY}`);
