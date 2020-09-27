"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var server = http_1.createServer(app);
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
var io = socket_io_1.default(server);
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.get("/", function (_, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
io.on("connection", function (socket) {
    console.log(socket.id);
});
server.listen(PORT, null, function () {
    return console.log("Server started in http://localhost:" + PORT);
});
