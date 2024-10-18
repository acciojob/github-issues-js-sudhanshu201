let currentPage = 1;
const perPage = 5;
const apiUrl = `https://api.github.com/repositories/1296269/issues`;

document.addEventListener("DOMContentLoaded", () => {
    loadIssues(currentPage);

    // Event listeners for the buttons
    document.getElementById("load_next").addEventListener("click", () => loadNextPage());
    document.getElementById("load_prev").addEventListener("click", () => loadPreviousPage());
});

// Fetch and display issues for the current page
async function loadIssues(page) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}&per_page=${perPage}`);
        const issues = await response.json();

        // Display issues
        displayIssues(issues);

        // Update page number heading
        document.getElementById("page-number").innerText = `Page number ${page}`;
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
}

// Display the issue titles in an ordered list
function displayIssues(issues) {
    const issueList = document.getElementById("issue-list");
    issueList.innerHTML = ''; // Clear current list

    issues.forEach(issue => {
        const listItem = document.createElement("li");
        listItem.textContent = issue.title; // Only display the title
        issueList.appendChild(listItem);
    });
}

// Load the next page of issues
function loadNextPage() {
    currentPage++;
    loadIssues(currentPage);
}

// Load the previous page of issues
function loadPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadIssues(currentPage);
    }
}
