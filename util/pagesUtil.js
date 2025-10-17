import { readPage, constructPage } from './templatingEngine.js';

const frontPage = readPage("./public/pages/frontend/index.html");
const gitPage = readPage("./public/pages/gitPage/git.html");
const javascriptPage = readPage("./public/pages/javascriptPage/javascriptPage.html");
const expressPage = readPage("./public/pages/expressPage/expressPage.html");

export const frontendPage = constructPage(frontPage, {
    tabTitle: "Portfolio | Welcome",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js"></script>
        <script src="/assets/js/landingPage.js"></script>
    `      
});

export const gitFrontendPage = constructPage(gitPage, {
    tabTitle: "Git basics",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
        <link rel="stylesheet" href="/pages/gitPage/git.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js"></script>
    `
});

export const javascriptFrontendPage = constructPage(javascriptPage, {
    tabTitle: "Javascript fundamentals",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
        <link rel="stylesheet" href="/pages/javascriptPage/javascriptPage.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js"></script>
    `
});

export const expressFrontendPage = constructPage(expressPage, {
    tabTitle: "Express.js",
    cssLinks: `
        <link rel="stylesheet" href="/assets/css/main.css">
        <link rel="stylesheet" href="/assets/css/header.css">
        <link rel="stylesheet" href="/assets/css/footer.css">
        <link rel="stylesheet" href="/pages/expressPage/expressPage.css">
    `,
    scriptLinks: `
        <script src="/assets/js/footer.js"></script>
    `    
});

