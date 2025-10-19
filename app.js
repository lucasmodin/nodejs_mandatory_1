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
import { getRecentGithubActivity } from './util/githubActivity.js';

app.get("/api/activities", async (req, res) => {
    const githubActivity = await getRecentGithubActivity();
    res.send({ data: githubActivity });
});



const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});