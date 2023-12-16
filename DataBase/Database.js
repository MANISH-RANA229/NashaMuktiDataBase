const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log("DB successfully connected");
        })
        .catch((err) => {
            console.log("DB CONNECTION ISSUES");
            console.error(err);
            process.exit(1);
        });
};
