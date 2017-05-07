const mongoose = require("./mongoose.js");
const Schema = mongoose.Schema;

const Info = mongoose.model(
    "Info",
    new Schema(
        {
            accNumber: { type: Schema.Types.String },
            githubEmail: { type: Schema.Types.String },
            slackEmail: { type: Schema.Types.String }
        },
        {
            timestamps: true,
            strict: false
        }
    )
);
module.exports = Info;
