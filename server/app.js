let express = require('express');
let app = express();
let mongoose = require('mongoose');
let cors = require('cors');
let multer = require('multer');

let productRouter = require("./router/productRouter");
let productCategoryRouter = require("./router/productCategoryRouter");
let basketRouter = require("./router/basketRouter");
let userRouter = require("./router/userRouter");
let wishlistRouter = require("./router/wishlistRouter");

const MONGO_URL="mongodb://127.0.0.1:27017/snack-pointDB";

mongoose.connect(MONGO_URL).then(res=> console.log("Database connected")).catch(err=>console.log(err));

// Multer Configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

app.use("/snack-point",[productRouter(upload),productCategoryRouter,basketRouter,userRouter,wishlistRouter]);

app.listen(3000,()=> console.log("Server running on port 3000"));