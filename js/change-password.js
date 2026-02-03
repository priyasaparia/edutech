const user = JSON.parse(localStorage.getItem("user"));
const users = JSON.parse(localStorage.getItem("users")) || [];

if (!user) location.href = "index.html";

function changePassword() {
  const newPass = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (!newPass || newPass.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (newPass !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const u = users.find(x => x.username === user.username);
  u.password = newPass;
  u.forceChangePassword = false;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(u));

  alert("Password updated successfully!");

  if (u.role === "teacher") location.href = "teacher.html";
  else if (u.role === "student") location.href = "student.html";
  else location.href = "admin.html";
}
