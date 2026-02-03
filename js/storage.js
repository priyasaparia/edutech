/********************************
 ASSIGNMENT STORAGE
********************************/
function getAssignments() {
  return JSON.parse(localStorage.getItem("assignments")) || [];
}

function saveAssignments(assignments) {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

/********************************
 ATTENDANCE STORAGE
********************************/
function getAttendance() {
  return JSON.parse(localStorage.getItem("attendance")) || [];
}

function saveAttendance(attendance) {
  localStorage.setItem("attendance", JSON.stringify(attendance));
}
