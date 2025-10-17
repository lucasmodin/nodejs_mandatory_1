import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
app.use(express.static("public"));
dotenv.config();

// ---------- pages ----------------
import { frontendPage, gitFrontendPage, javascriptFrontendPage } from './util/pagesUtil.js';

app.get("/", (req, res) => {
    res.send(frontendPage);
});

app.get("/subjects/git", (req, res) => {
    res.send(gitFrontendPage);
});

app.get("/subjects/javascript", (req, res) => {
    res.send(javascriptFrontendPage);
});

// ---------- api ------------------
import { getRecentCommits } from './util/commitsUtil.js';

app.get("/api/commits", async (req, res) => {
    const commits = await getRecentCommits();
    res.send({ data: commits });
});














const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});