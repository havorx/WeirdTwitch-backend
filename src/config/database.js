const mongoose = require('mongoose');
const dotenv = require ("dotenv");
dotenv.config()

async function connect() {
    try {
        await mongoose.connect(process.env.FINAL_PROJECT_DB_URI);
        console.log('Database connect successfully!');
    } catch (error) {
        console.log('Database connect failure!');
    }
}

module.exports = {connect};
