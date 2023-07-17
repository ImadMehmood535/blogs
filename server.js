const express = require("express")
const app = express();
const connectDB = require("./database/index")
const {PORT} = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")
const cors = require("cors");

// const corsOptions = {
//     Credentials:true,
//     origin:["http://localhost:3000"],
// }

app.use(cookieParser());
app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
app.use(express.json());

app.use(router)
//error handling
app.use(errorHandler);
app.use("/storage",express.static("storage"))

//database and server asynchronusly
;(async () =>{
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })
})();