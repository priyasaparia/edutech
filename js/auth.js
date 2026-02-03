function login() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;

  if (!name || !role || !password) {
    alert("Please fill all fields");
    return;
  }

  // Password validation
  if (role === "teacher" && password !== "teacher123") {
    alert("Incorrect teacher password");
    return;
  }

  if (role === "student" && password !== "student123") {
    alert("Incorrect student password");
    return;
  }

  // Save user info
  localStorage.setItem("user", JSON.stringify({ name, role }));

  // Redirect
  if (role === "teacher") {
    window.location.href = "teacher.html";
  } else {
    window.location.href = "student.html";
  }
}
// ===============================
// ADMIN INITIALIZATION (SAFE)
// ===============================
(function initAdminOnce() {
  let users = JSON.parse(localStorage.getItem("users"));

  if (!Array.isArray(users)) users = [];

  const adminExists = users.some(u => u.username === "admin");

  if (!adminExists) {
    users.push({
      username: "admin",
      password: "admin123",     // temporary
      role: "admin",
      forceChangePassword: true,
      lastLogin: null
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
})();


// ===============================
// LOGIN
// ===============================
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  // Update last login
  user.lastLogin = new Date().toLocaleString();
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(user));

  // FORCE PASSWORD CHANGE
  if (user.forceChangePassword) {
    window.location.href = "change-password.html";
    return;
  }

  // Role redirect
  if (user.role === "admin") location.href = "admin.html";
  else if (user.role === "teacher") location.href = "teacher.html";
  else location.href = "student.html";
}
