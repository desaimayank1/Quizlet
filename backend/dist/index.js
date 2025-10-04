"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Server running on localhost:3000..." });
});
app.use("/test", test_route_1.default);
app.listen(PORT, () => {
    console.log("server is running on localhost3000");
});
