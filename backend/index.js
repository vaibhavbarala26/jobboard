require("dotenv").config
const express = require("express")
const bodyParser = require("body-parser");
const connectiona = require("./connect");
const cookiParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const AppRouter = require("./Router/User");
const app = express();

app.use(express.json())
app.use(cookiParser("26020451202"))
app.use(bodyParser.text({limit:'200mb'}))
app.use(cors({
    credentials:true,
origin:"http://localhost:5173"
}))

app.use("/api" , AppRouter)
const PORT = process.env.PORT || 1042;
connectiona()
.then(()=>{app.listen(PORT , ()=>{
    console.log("Listening to PORT" , PORT);
})})
