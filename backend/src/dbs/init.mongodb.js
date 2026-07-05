const { default: mongoose } = require("mongoose")

const connectStr = process.env.MONGODB_URI

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        mongoose.connect(connectStr)
            .then(() => { console.log('Connected Mongodb Successfully') })
            .catch(err => { console.log('Error connect') })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance 
    }
}

instanceMongodb = Database.getInstance()

module.exports = instanceMongodb