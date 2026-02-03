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

  if (!users || !Array.isArray(users)) {
    users = [];
  }

  const adminExists = users.some(u => u.username === "admin");

  if (!adminExists) {
    users.push({
      username: "admin",
      password: "admin123",
      role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
    console.log("Admin account created");
  }
})();

// ===============================
// LOGIN
// ===============================
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid username or password");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  // Redirect by role
  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else if (user.role === "teacher") {
    window.location.href = "teacher.html";
  } else {
    window.location.href = "student.html";
  }
}
