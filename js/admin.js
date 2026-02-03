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
function renderAnalytics() {
  const users = getUsers();
  const assignments = getAssignments();
  const attendance = getAttendance();

  document.getElementById("tCount").innerText = users.filter(u=>u.role==="teacher").length;
  document.getElementById("sCount").innerText = users.filter(u=>u.role==="student").length;
  document.getElementById("aCount").innerText = assignments.length;

  if (!attendance.length) {
    document.getElementById("avgAtt").innerText = 0;
    return;
  }
  const present = attendance.filter(a=>a.status==="Present").length;
  document.getElementById("avgAtt").innerText = Math.round((present/attendance.length)*100);
}
renderAnalytics();

/************ CSV EXPORTS ************/
function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

function exportAttendanceCSV() {
  const att = getAttendance();
  const rows = [["Roll","Date","Status"], ...att.map(a=>[a.roll,a.date,a.status])];
  downloadCSV("attendance.csv", rows);
}

function exportMarksCSV() {
  const asg = getAssignments();
  const rows = [["Assignment","Student","Marks"]];
  asg.forEach(a=>{
    (a.submissions||[]).forEach(s=>{
      rows.push([a.title, s.student||s.submittedBy, s.marks ?? ""]);
    });
  });
  downloadCSV("marks.csv", rows);
}
function renderUsers() {
  const users = getUsers();
  const list = document.getElementById("userList");

  list.innerHTML = users
    .filter(u => u.role !== "admin")
    .map(u => `
      <div class="border rounded p-3 mb-2 d-flex justify-content-between align-items-center">
        <div>
          <b>${u.username}</b>
          <span class="badge bg-secondary">${u.role}</span><br>
          <small>Password: <code>${u.password}</code></small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${u.username}')">
          Delete
        </button>
      </div>
    `).join("");
}
function deleteUser(username) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  let users = getUsers();
  users = users.filter(u => u.username !== username);
  saveUsers(users);

  alert("User deleted");
  renderUsers();
}
function createClassroom() {
  const name = document.getElementById("className").value;
  if (!name) return alert("Enter classroom name");

  const rooms = getClassrooms();

  rooms.push({
    id: Date.now(),
    name,
    students: [],
    teachers: [],
    requests: []
  });

  saveClassrooms(rooms);
  document.getElementById("className").value = "";
  renderClassrooms();
}

function renderClassrooms() {
  const rooms = getClassrooms();
  const div = document.getElementById("classroomList");

  div.innerHTML = rooms.map(r => `
    <div class="border p-3 mb-2">
      <b>${r.name}</b><br>
      Teachers: ${r.teachers.length}<br>
      Students: ${r.students.length}
    </div>
  `).join("");
}

renderClassrooms();

