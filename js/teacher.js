/*************************
 AUTH CHECK
**************************/
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "teacher") {
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
 ASSIGNMENT – CREATE
**************************/
function addAssignment() {
  const title = document.getElementById("title").value;
  const givenDate = document.getElementById("givenDate").value;
  const dueDate = document.getElementById("dueDate").value;
  const totalMarks = document.getElementById("totalMarks").value;

  const questionInputs = document.querySelectorAll(".question");
  const questions = [];

  questionInputs.forEach(q => {
    if (q.value.trim() !== "") {
      questions.push(q.value);
    }
  });

  if (!title || !givenDate || !dueDate || !totalMarks || questions.length < 2) {
    alert("Fill all fields and at least 2 questions");
    return;
  }

  const assignments = getAssignments();

  assignments.push({
    id: Date.now(),
    title,
    questions,
    givenDate,
    dueDate,
    totalMarks,
    submissions: []
  });

  saveAssignments(assignments);

  bootstrap.Modal.getInstance(
    document.getElementById("addModal")
  ).hide();

  renderAssignments();
}

/*************************
 ADD QUESTION DYNAMICALLY
**************************/
function addQuestion() {
  const container = document.getElementById("questionContainer");
  const count = container.children.length + 1;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control mb-2 question";
  input.placeholder = `Question ${count}`;

  container.appendChild(input);
}

/*************************
 RENDER ASSIGNMENTS
**************************/
function renderAssignments() {
  const assignments = getAssignments();
  const container = document.getElementById("assignmentList");

  container.innerHTML = "";

  assignments.forEach(a => {
    container.innerHTML += `
      <div class="card mb-4">
        <div class="card-body">
          <h5>${a.title}</h5>

          <p><b>Given Date:</b> ${a.givenDate}</p>
          <p><b>Due Date:</b> ${a.dueDate}</p>
          <p><b>Total Marks:</b> ${a.totalMarks}</p>

          <h6>Questions</h6>
          <ul>
            ${a.questions.map(q => `<li>${q}</li>`).join("")}
          </ul>

          <input type="file" class="form-control mb-2"
            id="teacher-file-${a.id}">
          <button class="btn btn-secondary btn-sm mb-3"
            onclick="teacherSubmit(${a.id})">
            Upload File
          </button>

          <h6>Student Submissions</h6>
          ${renderSubmissions(a)}
        </div>
      </div>
    `;
  });
}

/*************************
 TEACHER FILE UPLOAD
**************************/
function teacherSubmit(id) {
  const fileInput = document.getElementById(`teacher-file-${id}`);
  if (!fileInput.files.length) {
    alert("Select a file");
    return;
  }

  const assignments = getAssignments();
  const assignment = assignments.find(a => a.id === id);

  assignment.submissions.push({
    student: "Teacher",
    file: fileInput.files[0].name,
    marks: null
  });

  saveAssignments(assignments);
  alert("File uploaded");
  renderAssignments();
}

/*************************
 RENDER SUBMISSIONS + MARKS
**************************/
function renderSubmissions(assignment) {
  if (assignment.submissions.length === 0) {
    return "<p class='text-muted'>No submissions yet</p>";
  }

  return assignment.submissions.map((s, index) => `
    <div class="border p-2 mb-2">
      <b>${s.student}</b><br>
      File: ${s.file}

      <input type="number"
        class="form-control form-control-sm mt-1"
        placeholder="Enter marks"
        value="${s.marks ?? ""}"
        onchange="assignMarks(${assignment.id}, ${index}, this.value)">
    </div>
  `).join("");
}

/*************************
 ASSIGN MARKS
**************************/
function assignMarks(assignmentId, submissionIndex, marks) {
  const assignments = getAssignments();
  const assignment = assignments.find(a => a.id === assignmentId);

  assignment.submissions[submissionIndex].marks = marks;
  saveAssignments(assignments);
}

/*************************
 ATTENDANCE SYSTEM
**************************/
let attendanceRows = [];
let rollCounter = 1;

function addStudentRow() {
  attendanceRows.push({
    roll: rollCounter,
    status: "Present"
  });

  rollCounter++;
  renderAttendanceTable();
}

function renderAttendanceTable() {
  const table = document.getElementById("attendanceTable");
  table.innerHTML = "";

  attendanceRows.forEach((row, index) => {
    table.innerHTML += `
      <tr>
        <td>${row.roll}</td>
        <td class="text-center">
          <input type="radio" name="att-${index}" checked
            onclick="attendanceRows[${index}].status='Present'">
        </td>
        <td class="text-center">
          <input type="radio" name="att-${index}"
            onclick="attendanceRows[${index}].status='Absent'">
        </td>
      </tr>
    `;
  });
}

function submitAttendance() {
  if (attendanceRows.length === 0) {
    alert("Add students first");
    return;
  }

  const attendance = getAttendance();
  const date = new Date().toLocaleDateString();

  attendanceRows.forEach(r => {
    attendance.push({
      roll: r.roll,
      status: r.status,
      date
    });
  });

  saveAttendance(attendance);

  attendanceRows = [];
  rollCounter = 1;
  renderAttendanceTable();

  alert("Attendance submitted");
}

/*************************
 INITIAL LOAD
**************************/
renderAssignments();
function postAnnouncement() {
  const title = document.getElementById("annTitle").value;
  const body = document.getElementById("annBody").value;
  if (!title || !body) return alert("Fill all fields");

  const data = getAnnouncements();
  data.push({
    title, body,
    by: user.username,
    date: new Date().toLocaleString()
  });
  saveAnnouncements(data);
  alert("Announcement posted");
}
function sendMessage() {
  const to = document.getElementById("msgTo").value;
  const text = document.getElementById("msgText").value;
  if (!to || !text) return alert("Fill all fields");

  const msgs = getMessages();
  msgs.push({
    from: user.username,
    to,
    text,
    date: new Date().toLocaleString()
  });
  saveMessages(msgs);
  alert("Message sent");
}
