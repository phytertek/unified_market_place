require('dotenv').config({ path: './spec/.env' });
const enmapi = require('enmapi');

enmapi.server.setConfig({
  Level: 'test',
  Name: 'TEST INSTANCE --- Unified Marketplace',
  Host: 'http://localhost',
  Port: 9876,
  DatabaseName: 'Unified Marketplace Test DB',
  DatabaseURI: process.env.DB_URI
});

enmapi.server.start();

const server = require('enmapi/server');
const db = require('enmapi/database');
const services = require('enmapi/services');

const teardown = async () => {
  try {
    const dbTeardown = Object.keys(db).map(model => db[model].remove());
    await Promise.all(dbTeardown);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { server, db, services, teardown };
