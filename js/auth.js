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
