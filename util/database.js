const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://evgi:T7lD37RsQQOR6zBH@cluster0.hhyrx.mongodb.net/CSE341-Shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;
