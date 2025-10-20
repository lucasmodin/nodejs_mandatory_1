function createActivityItem({ repo, title, url, date }) {
  const li = document.createElement("li");
  li.innerHTML = `
    <a class="activity-item" href="${url}">
      <strong>${title}</strong><br>
      <span class="muted">${repo}</span><br>
      <small class="muted">${date}</small>
    </a>
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

function loadRecentActivity() {
  const list = document.getElementById("activity-list");
  if (!list) return;

  list.innerHTML = `<p class="muted">Loading activity...</p>`;

  fetch("/api/activities")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP code: ${response.status}`);
      return response.json();
    })
    .then(payload => {
      const items = payload.data || [];
      list.innerHTML = "";
      if (!items.length) {
        showError("activity-list", "No recent activity found");
        return;
      }

      items.forEach(item => {
        const li = createActivityItem({
          repo: item.repo,
          title: item.title,
          url: item.url,
          date: formatDate(item.date)
        });
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.log("activity fetch failed:", err);
      showError("activity-list", "Could not load activity");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRecentActivity();
});
