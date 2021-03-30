const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {
        await mongoose.connect( process.env.DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`Database online`)
    } catch (error) {
        console.log(error);
        throw new Error('Error at conectin database');
    }

}


module.exports = {
    dbConnection
}