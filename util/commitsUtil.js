const USER = process.env.GITHUB_USER || "lucasmodin";
const TOKEN = process.env.GITHUB_TOKEN || "";

let cache = { data: null, ts: 0};
const TimeToLiveMs = 60 * 1000;

export async function getRecentCommits(limit = 5) {
    if (cache.data && Date.now() - cache.ts < TimeToLiveMs) {
        return Promise.resolve(cache.data.slice(0, limit));
    }

    const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
    const url = `https://api.github.com/users/${USER}/events/public?_=${Date.now()}`;

    return fetch(url, { headers })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Github HTTP code: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(events => {
            const commits = events
                .filter(event => event.type === "PushEvent")
                .flatMap(event => 
                    event.payload.commits.map(commit => ({
                        message: commit.message,
                        repo: event.repo.name,
                        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
                        date: new Date(event.created_at).toISOString(),
                    }))
                );
            cache = { data: commits, ts: Date.now()};
            return commits.slice(0, limit);
        })
        .catch(error => {
            console.log("github fetch failed:", error.message);
            throw error;
        });
}