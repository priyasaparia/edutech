/*************************
 AUTH GUARD
**************************/
const currentUser = JSON.parse(localStorage.getItem("user"));
if (!currentUser || currentUser.role !== "admin") {
  window.location.href = "index.html";
}

/*************************
 LOGOUT
**************************/
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

/*************************
 HELPERS
**************************/
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function generatePassword(prefix) {
  return prefix + "-" + Math.floor(1000 + Math.random() * 9000);
}

/*************************
 CREATE USER (AUTO)
**************************/
function createUser() {
  const role = document.getElementById("newRole").value;
  const users = getUsers();

  const count = users.filter(u => u.role === role).length + 1;
  const username = `${role}${count}`;
  const password = generatePassword(role === "teacher" ? "TCH" : "STU");

  users.push({
  username,
  password,
  role,
  forceChangePassword: true,
  lastLogin: null
});


  saveUsers(users);

  alert(
    `Account Created!\n\nUsername: ${username}\nPassword: ${password}`
  );

  renderUsers();
}

/*************************
 RENDER USERS
**************************/
function renderUsers() {
  const users = getUsers();
  const list = document.getElementById("userList");

  const filtered = users.filter(u => u.role !== "admin");

  if (filtered.length === 0) {
    list.innerHTML = "<p class='text-muted'>No users created yet</p>";
    return;
  }

  list.innerHTML = filtered.map(u => `
    <div class="border rounded p-3 mb-2">
      <b>${u.username}</b> <span class="badge bg-secondary">${u.role}</span><br>
      Password: <code>${u.password}</code>
    </div>
  `).join("");
}

renderUsers();
