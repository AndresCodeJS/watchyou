import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import cors from 'cors'
import routes from './routes/index.js'
import {config} from 'dotenv'
import { sequelize } from "./database/database.js";

import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


config()
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cors())
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/", routes);

server.use(express.static(path.join(__dirname, '..','..', 'client','build','index.html')));

server.get('*', function(req, res) {
  if (fs.existsSync(path.join(__dirname, '..','..', 'client','build','index.html'))) {
    res.sendFile(path.join(__dirname, '..','..', 'client','build','index.html'));
  } else {
    res.sendFile(path.join(__dirname, '..','..', 'client','public','index.html'));
  }
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('sequelize connected')
    await sequelize.sync({ force: true });
    server.listen(process.env.PORT || 4545, () => {
      console.log("Server on port 4545");
    });
  } catch (error) {
    console.log('Unable to connect to the database');
    
  }
}

main();

