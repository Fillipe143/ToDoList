import express from "express";
import cors from "cors";
import 'dotenv/config'

import path from "path";
import forwardToRoute from "./routes";
import MySQLTaskRepository from "./database/MySQLTaskRepository";
import LocalTaskRepository from "./database/LocalTaskRespository";

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.LOCAL_DB === "true" ? new LocalTaskRepository() : new MySQLTaskRepository();
const publicPath = path.join(__dirname, "../public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (_req, res) => res.sendFile(path.join(publicPath, "./pages/home.html")));
app.get("/*", (_req, res) => res.sendFile(path.join(publicPath, "./pages/project.html")));
app.post("/*", async (req, res) => {
    const url = req.url.replace("/", "");
    const apiRes = await forwardToRoute(req.body.action, url, req.body.data, db);
    res.status(apiRes.code).send(apiRes.data);
});

app.listen(port, () => console.log("Server running on port 3000."));