import express from 'express';
import path from 'path';

const app = express();
app.use(express.static("public"));


// ---------- pages ----------------
import { frontendPage, gitFrontendPage, javascriptFrontendPage, nodeFrontendPage, expressFrontendPage, restFrontendPage, ssrCsrFrontendPage } from './util/pagesUtil.js';

app.get("/", (req, res) => {
    res.send(frontendPage);
});

app.get("/subjects/git", (req, res) => {
    res.send(gitFrontendPage);
});

app.get("/subjects/javascript", (req, res) => {
    res.send(javascriptFrontendPage);
});

app.get("/subjects/node", (req, res) => {
    res.send(nodeFrontendPage);
});

app.get("/subjects/express", (req, res) => {
    res.send(expressFrontendPage);
});

app.get("/subjects/rest", (req, res) => {
    res.send(restFrontendPage);
});

app.get("/subjects/ssr-csr", (req, res) => {
    res.send(ssrCsrFrontendPage);
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