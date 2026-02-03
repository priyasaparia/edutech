/************ USERS ************/
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/************ ASSIGNMENTS ************/
function getAssignments() {
  return JSON.parse(localStorage.getItem("assignments")) || [];
}
function saveAssignments(assignments) {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

/************ ATTENDANCE ************/
function getAttendance() {
  return JSON.parse(localStorage.getItem("attendance")) || [];
}
function saveAttendance(attendance) {
  localStorage.setItem("attendance", JSON.stringify(attendance));
}

/************ ANNOUNCEMENTS ************/
function getAnnouncements() {
  return JSON.parse(localStorage.getItem("announcements")) || [];
}
function saveAnnouncements(data) {
  localStorage.setItem("announcements", JSON.stringify(data));
}

/************ MESSAGES ************/
function getMessages() {
  return JSON.parse(localStorage.getItem("messages")) || [];
}
function saveMessages(data) {
  localStorage.setItem("messages", JSON.stringify(data));
}
function getClassrooms() {
  return JSON.parse(localStorage.getItem("classrooms")) || [];
}

function saveClassrooms(data) {
  localStorage.setItem("classrooms", JSON.stringify(data));
}
