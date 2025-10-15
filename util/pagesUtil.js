import { readPage, constructPage } from './templatingEngine.js';

const frontPage = readPage("./public/pages/frontend/index.html");

export const frontendPage = constructPage(frontPage, {
    tabTitle: "Portfolio | Welcome",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js">
    `      
});

