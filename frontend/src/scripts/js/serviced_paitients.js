"use strict";
// Function to render completed users in the table
function renderCompletedUsers() {
    const completedUsers = JSON.parse(localStorage.getItem('completedUsers') || '[]');
    const completedUserTableBody = document.getElementById('completedUserTableBody');
    completedUserTableBody.innerHTML = '';
    completedUsers.forEach(user => {
        const row = `<tr class="completed">
            <td>${user.name}</td>
            <td>${user.id}</td>
            <td>${user.age}</td>
            <td>${user.time}</td>
        </tr>`;
        completedUserTableBody.innerHTML += row;
    });
}
// Initial rendering of completed users
document.addEventListener('DOMContentLoaded', renderCompletedUsers);
