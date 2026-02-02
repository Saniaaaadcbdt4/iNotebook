const mongoose = require('mongoose');

const cToMongo = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inotebook",{
           
        });
        console.log("Connected to MongoDB successfully");
    } catch (e) {
        console.log("Error connecting to MongoDB", e);
    }
};

module.exports = cToMongo;
