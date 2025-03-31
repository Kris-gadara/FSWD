function fetchLogs() {
    fetch("/logs")
        .then(response => response.json())
        .then(data => {
            document.getElementById("logOutput").textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error("Error fetching logs:", error));
}
