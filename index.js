require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ProductModel = require("./models/Products");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(express.json());
app.use(cors(corsOptions));

// mongoose.connect("mongodb+srv://user123:Password123Tech@cluster0.j7fql.mongodb.net/merntutorial?retryWrites=true&w=majority");
// mongoose.connect(
//     "mongodb+srv://qwerty2244668800:6OHB3x1wVa85cR0l@pedrotechmern.j5djsoj.mongodb.net/mern_pedro_tech?retryWrites=true&w=majority&appName=PedroTechMern"
// );

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
};

connectDB();

// mongoose.connect(process.env.DATABASE_URI);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
            // console.log(result);
        }
    });
});

app.get("/getProducts", (req, res) => {
    ProductModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
            // console.log(result);
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(3001, () => console.log("SERVER RUNS PERFECTLY on PORT 3001!"));
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});
