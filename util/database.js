const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

// To connect to the db and store the connection to it
const mongoConnect = (callback) => {
    // In the url, we place our db's name here: mongodb.net/<dbname>
    MongoClient.connect('mongodb+srv://mnazmi:HvGMsyu29fXUOvOD@cluster0-rbjdo.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

// To return access to the connected db if it exists
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;