import { readPage, constructPage } from './templatingEngine.js';

const frontPage = readPage("./public/pages/frontend/index.html");
const gitPage = readPage("./public/pages/git/git.html")

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

export const gitFrontendPage = constructPage(gitPage, {
    tabTitle: "Git basics",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
        <link rel="stylesheet" href="/pages/git/git.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js">
    `
})

