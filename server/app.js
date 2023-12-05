let express = require('express');
let app = express();
let mongoose = require('mongoose');
let cors = require('cors');
let productRouter = require("./router/productRouter");

const MONGO_URL="mongodb://127.0.0.1:27017/snack-pointDB";

mongoose.connect(MONGO_URL).then(res=> console.log("Database connected")).catch(err=>console.log(err));


app.use(express.json());
app.use(cors());

app.use("/snack-point",productRouter);

app.listen(3000,()=> console.log("Server running on port 3000"));