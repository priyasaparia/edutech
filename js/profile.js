const user = JSON.parse(localStorage.getItem("user"));
if (!user) location.href = "index.html";

document.getElementById("username").innerText = user.username;
document.getElementById("role").innerText = user.role;
document.getElementById("lastLogin").innerText = user.lastLogin || "First login";
