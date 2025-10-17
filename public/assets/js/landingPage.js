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

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function loadRecentCommits() {
    const list = document.getElementById("commit-list");
    if (!list) {
        return;
    }
    
    list.innerHTML = `<p class="muted">Loading commits...</p>`;

    fetch("/api/commits")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP code: ${response.status}`);
            }
            return response.json();
        })
        .then(payload => {
            const commits = payload.data;
            list.innerHTML = "";
            if (!commits.length) {
                showError("commit-list", "No recent commits found");
                return;
            }

            commits.forEach(commit => {
                const li = createCommitItem({
                    repo: commit.repo,
                    message: commit.message,
                    url: commit.url,
                    date: formatDate(commit.date)
                });
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.log("commit fetch failed:", error);
            showError("commit-list", "could not load commits");
        })

}

document.addEventListener("DOMContentLoaded", () => {
    loadRecentCommits();
})