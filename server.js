const express = require("express")
const app = express();
const connectDB = require("./database/index")
const {PORT} = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler")



app.use(express.json());

app.use(router)
//error handling
app.use(errorHandler);

//database and server asynchronusly
;(async () =>{
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })
})();