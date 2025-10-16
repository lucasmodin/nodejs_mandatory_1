import express from 'express';
import path from 'path';

const app = express();
app.use(express.static("public"));

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

















const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});