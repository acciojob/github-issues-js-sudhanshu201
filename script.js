//your code here
let currentPage = 1;

function loadIssues(action) {
  if (action === 'next') {
    currentPage++;
  } else if (action === 'prev' && currentPage > 1) {
    currentPage--;
  }

  const apiUrl = `https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayIssues(data);
      updatePageNumber();
    })
    .catch(error => console.error('Error fetching issues:', error));
}

function displayIssues(issues) {
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  issues.forEach(issue => {
    const listItem = document.createElement('li');
    listItem.textContent = issue.title;
    issuesList.appendChild(listItem);
  });
}

function updatePageNumber() {
  const pageNumberHeading = document.getElementById('pageNumber');
  pageNumberHeading.textContent = `Page number ${currentPage}`;
}

// Load issues on page load
window.onload = function () {
  loadIssues('next');
};
