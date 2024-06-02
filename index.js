import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
// import mysql from "mysql";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/**CONFIGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** ROUTES*/

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/**DB */

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

/**PORT */

mongoose.connect(process.env.MONGO_URL, {
})
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
    }).catch((error) =>
        console.log(error));