import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import { config } from "dotenv";
import { sequelize } from "./database/database.js";
import http from "http"
import responseTime from "response-time";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { Server } from "socket.io";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config();
export const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

io.on("connect",socket => {});

app.use(responseTime())

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/", routes);

app.use(
  express.static(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  )
);

app.get("*", function (req, res) {
  if (
    fs.existsSync(
      path.join(__dirname, "..", "..", "client", "build", "index.html")
    )
  ) {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "build", "index.html")
    );
  } else {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "public", "index.html")
    );
  }
});

async function main() {
  try {
  /*   await sequelize.authenticate();
    console.log("sequelize connected");
    await sequelize.sync({ force: true }); */
    server.listen(process.env.PORT || 4545, () => {
      console.log("Server on port 4545");
    });
  } catch (error) {
    console.log("Unable to connect to the database");
  }
}

main();
