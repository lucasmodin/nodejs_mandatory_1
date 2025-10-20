import { githubEventToActivity } from "./githubEventToActivity.js";
const USER = process.env.GITHUB_USER || "lucasmodin";
const TOKEN = process.env.GITHUB__TOKEN || "";

export async function getRecentGithubActivity(limit = 5) {
    const url = `https://api.github.com/users/${USER}/events/public`;

    const headers = {}
    if (TOKEN) {
        headers["Authorization"] = `Bearer ${TOKEN}`;
    }
    
    return fetch(url, { headers })
        .then(res => {
            if (!res.ok) {
                throw new Error(`github http code: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(events => {
            const activities = events
                .map(event => githubEventToActivity(event))
                .filter(activity => activity !== null)
                .slice(0, limit);

            return activities;
        })
        .catch(error => {
            console.log("github fetch failed", error.message);
            throw error;
        });
}
