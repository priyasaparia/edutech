// Get all assignments from LocalStorage
function getAssignments() {
  return JSON.parse(localStorage.getItem("assignments")) || [];
}

// Save assignments to LocalStorage
function saveAssignments(assignments) {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}
// ===== ATTENDANCE STORAGE =====
function getAttendance() {
  return JSON.parse(localStorage.getItem("attendance")) || [];
}

function saveAttendance(data) {
  localStorage.setItem("attendance", JSON.stringify(data));
}
function getAttendance() {
  return JSON.parse(localStorage.getItem("attendance")) || [];
}

function saveAttendance(attendance) {
  localStorage.setItem("attendance", JSON.stringify(attendance));
}
