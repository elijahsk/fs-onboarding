if (!process.env.NODE_ENV) {
    require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Info = require("./info-m.js");

let app = express();

//=============================================================================
// regarding cors setup, im throwing everything including the kitchen sink
// to make it work, do not consider this hack solution as reference
// would welcome a pull request that will handle cors properly =D
//=============================================================================
let corsOptions = {
    origin: ["http://localhost:3000", "http://192.168.1.102:4501/"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true
};
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.options("*", cors(corsOptions)); // include before other routes
//======================================================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("*", (req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.json({ msg: "its the root" });
});

app.get("/simple", (req, res) => {
    res.json({ msg: "simple" });
});

app.post("/submitInfo", (req, res) => {
    // console.log(req.body);
    Info.create(Object.assign({}, req.body.data))
        .then(data => {
            console.log(data);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.listen(9000, function() {
    console.log("Example app listening on port 9000!");
});
