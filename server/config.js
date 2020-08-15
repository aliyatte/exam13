const path = require('path');

const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/books';
let port = 8000;

if (env === 'test') {
  database = 'mongodb://localhost/books-test';
  port = 8010;
}

module.exports = {
  port,
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database,
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};