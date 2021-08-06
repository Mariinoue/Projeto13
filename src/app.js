const express = require("express")
const cors = require("cors");
const mongosse=require("mongoose")


mongosse.connect("mongodb://localhost:27017/music",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

let db=mongosse.connection

db.on("error",console.log.bind(console,"connection error:"));
db.once("open",function(){
    console.log("conexão feita com sucesso.")
})

const app = express()

//rotas
const index = require("./routes/index")
const musics = require("./routes/musics")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use(cors());

app.use("/", index)
app.use("/musics", musics)

module.exports = app