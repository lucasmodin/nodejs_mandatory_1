const USER = process.env.GITHUB_USER || "lucasmodin";

export async function getRecentCommits(limit = 5) {
   
    const url = `https://api.github.com/users/${USER}/events/public`;

    return fetch(url)
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
            return commits.slice(0, limit);
        })
        .catch(error => {
            console.log("github fetch failed:", error.message);
            throw error;
        });
}