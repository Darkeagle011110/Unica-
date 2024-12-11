const toggle = document.getElementById("toggle");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', () => {
    const historyBody = document.getElementById("history-body");

    // Function to fetch and populate history data
    const fetchHistoryData = async () => {
        try {
            // Fetch data from the backend API
            const response = await fetch('/api/history');

            if (!response.ok) {
                throw new Error(`Error fetching history data: ${response.statusText}`);
            }

            const historyData = await response.json();

            // Clear any existing rows in the table body
            historyBody.innerHTML = '';

            // Populate the table with fetched data
            historyData.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${entry.date}</td>
                    <td>${entry.time}</td>
                    <td>${entry.records}</td>
                    <td>${entry.class}</td>
                    <td>${entry.status}</td>
                    <td>${entry.remaining}</td>
                `;
                historyBody.appendChild(row);
            });

        } catch (error) {
            console.error("Failed to load history data:", error);
            historyBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Failed to load history data. Please try again later.</td></tr>`;
        }
    };

    // Fetch data when the page loads
    fetchHistoryData();
});
document.addEventListener('DOMContentLoaded', () => {
    const historyBody = document.getElementById("history-body");

    // Function to fetch and populate history data
    const fetchHistoryData = async () => {
        try {
            // Fetch data from the backend API
            const response = await fetch('/api/history');

            if (!response.ok) {
                throw new Error(`Error fetching history data: ${response.statusText}`);
            }

            const historyData = await response.json();

            // Clear any existing rows in the table body
            historyBody.innerHTML = '';

            // Populate the table with fetched data
            historyData.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${entry.date}</td>
                    <td>${entry.time}</td>
                    <td>${entry.records}</td>
                    <td>${entry.class}</td>
                    <td>${entry.status}</td>
                    <td>${entry.remaining}</td>
                `;
                historyBody.appendChild(row);
            });

        } catch (error) {
            console.error("Failed to load history data:", error);
            historyBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Failed to load history data. Please try again later.</td></tr>`;
        }
    };

    // Fetch data when the page loads
    fetchHistoryData();
});
