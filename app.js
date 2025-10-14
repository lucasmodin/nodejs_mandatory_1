import express from 'express';
import path from 'path';

const app = express();
app.use(express.static("public"));

// ---------- pages ----------------



// ---------- api ------------------

















const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});