const Shorten = require('shorten-firebase.realtime-database');
const firebase = require('firebase');
const express = require("express");
const path = require("path");

const firebaseConfig = {
    apiKey: "AIzaSyAmJTth6czuf4feaQusCqj4-4kBwnY0lP4",
    authDomain: "expotec-f048f.firebaseapp.com",
    databaseURL: "https://expotec-f048f-default-rtdb.firebaseio.com",
    projectId: "expotec-f048f",
    storageBucket: "expotec-f048f.appspot.com",
    messagingSenderId: "31169006400",
    appId: "1:31169006400:web:098e6f8a8ded87124d08a5"
};

firebase.initializeApp(firebaseConfig);
const database = new Shorten(firebase, false);

express.urlencoded({
    extended: true,
});

const app = express();
const PORT = process.env.PORT || 80;

app.enable("trust proxy");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get("/viewanalytics", async (req, res, next) => {
    if (!req.query.password || req.query.password !== "eteexpotec") {
        res.send("Você não tem acesso a isto.");
    } else {
        res.render('analytics', {
            data: await database.get('data'),
        });
    }
});

app.listen(PORT, () => {
    console.log(`[SERVER]: Conectado na porta ${PORT}.`);
});
