export function githubEventToActivity(event) {
  const repo = (event.repo && event.repo.name) ? event.repo.name : "unknown";
  const date = event.created_at || "";
  const type = event.type;

  if (type === "PushEvent") {
    let title = "Pushed to " + repo;

    if (event.payload && Array.isArray(event.payload.commits) && event.payload.commits.length > 0) {
      const firstCommit = event.payload.commits[0];
      if (firstCommit && firstCommit.message) {
         title = firstCommit.message + " (" + repo + ")";
      }
    }

    const head = event.payload && event.payload.head ? event.payload.head : "";
    const url = head
      ? `https://github.com/${repo}/commit/${head}`
      : `https://github.com/${repo}`;

    return { 
        type,
        title,
        repo,
        url,
        date 
    };
  }

  // we will ignore all other event types than push
  return null;
}