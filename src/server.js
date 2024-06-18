import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import configviewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
// const PORT = 8080;

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine
configviewEngine(app);

// Khởi tạo các route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
