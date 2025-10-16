const username = "lucasmodin";

function createCommitItem({ repo, message, url, date }) {
    const li = document.createElement("li");
    li.innerHTML = `
        <a href="${url}" target="_blank"><strong>${repo}</strong></a><br>
        <span>${message}</span><br>
        <small class="muted">${date}</small>
    `;
    return li;
}

function showError(targetId, message) {
    const container = document.getElementById(targetId);
    if (container) container.innerHTML = `<p class="muted">${message}</p>`;
}

function loadRecentCommits() {
    const list = document.getElementById("commit-list");
    if (!list) {
        return;
    }
    
    list.innerHTML = `<p class="muted">Loading commits...</p>`;

    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP code: ${res.status}`)
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
                        date: new Date(event.created_at).toLocaleString(),
                    }))
                )
                .slice(0, 5);
            
            list.innerHTML = "";

            if(!commits.length) {
                showError("commit-list", "No recent commits found");
                return;
            }

            commits.forEach(commit => list.appendChild(createCommitItem(commit)));
        })
        .catch(error => {
            console.error("commit fetch failed:", error);
            showError("commit-list", "Could not load commits");
        });
}

document.addEventListener("DOMContentLoaded", ()=> {
    loadRecentCommits();
})