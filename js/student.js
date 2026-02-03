// AUTH CHECK
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "student") {
  window.location.href = "index.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// RENDER ASSIGNMENTS
function renderAssignments() {
  const assignments = getAssignments();
  const list = document.getElementById("assignmentList");
  const history = document.getElementById("submissionHistory");

  list.innerHTML = "";
  history.innerHTML = "";

  assignments.forEach(a => {
    const alreadySubmitted = a.submissions.some(
      s => s.submittedBy === user.name && s.role === "student"
    );

    // Assignment Card
    list.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5>${a.title}</h5>
          <p>Due Date: ${a.dueDate}</p>

          <input type="file" class="form-control mb-2" id="student-file-${a.id}">
          <button class="btn btn-primary btn-sm"
            ${alreadySubmitted ? "disabled" : ""}
            onclick="submitAssignment(${a.id})">
            ${alreadySubmitted ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    `;

    // Submission History
    a.submissions.forEach(s => {
      if (s.submittedBy === user.name && s.role === "student") {
        history.innerHTML += `
          <div class="border rounded p-2 mb-2">
            <b>${a.title}</b><br>
            File: ${s.fileName}<br>
            Submitted On: ${s.submittedOn}
          </div>
        `;
      }
    });
  });
}

// STUDENT FILE SUBMIT
function submitAssignment(id) {
  const fileInput = document.getElementById(`student-file-${id}`);

  if (!fileInput.files.length) {
    alert("Please select a file");
    return;
  }

  const fileName = fileInput.files[0].name;
  const assignments = getAssignments();
  const assignment = assignments.find(a => a.id === id);

  assignment.submissions.push({
    submittedBy: user.name,
    role: "student",
    fileName: fileName,
    submittedOn: new Date().toLocaleDateString()
  });

  saveAssignments(assignments);
  alert("Assignment submitted successfully!");
  renderAssignments();
}

// INITIAL LOAD
renderAssignments();
function renderAttendance() {
  const attendance = getAttendance();
  const container = document.getElementById("attendanceSection");

  const myAttendance = attendance.filter(
    a => a.studentName === user.name
  );

  if (myAttendance.length === 0) {
    container.innerHTML = "<p class='text-muted'>No attendance records yet</p>";
    return;
  }

  let presentCount = 0;

  container.innerHTML = myAttendance.map(a => {
    if (a.status === "Present") presentCount++;
    return `
      <div class="border rounded p-2 mb-2">
        Date: ${a.date} <br>
        Status: <b>${a.status}</b>
      </div>
    `;
  }).join("");

  container.innerHTML += `
    <p class="mt-2"><b>Total Classes:</b> ${myAttendance.length}</p>
    <p><b>Present:</b> ${presentCount}</p>
  `;
}

// Call this on page load
renderAttendance();
