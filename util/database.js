const mongodb = require('mongodbl');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://evgi:@cluster0.hhyrx.mongodb.net/CSE341-Shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;
