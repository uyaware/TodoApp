const { default: mongoose } = require("mongoose")

const connectStr = 'mongodb://localhost:27017/shopDev'

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