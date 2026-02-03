/*************************
 AUTH CHECK
**************************/
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "student") {
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
 ASSIGNMENTS & SUBMISSIONS
**************************/
function renderAssignments() {
  const assignments = getAssignments();
  const list = document.getElementById("assignmentList");
  const history = document.getElementById("submissionHistory");

  list.innerHTML = "";
  history.innerHTML = "";

  assignments.forEach(a => {
    list.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5>${a.title}</h5>
          <p><b>Due:</b> ${a.dueDate}</p>
        </div>
      </div>
    `;

    a.submissions.forEach(s => {
      if (s.student === user.username) {
        history.innerHTML += `
          <div class="border p-2 mb-2">
            <b>${a.title}</b><br>
            File: ${s.file}<br>
            Marks: ${s.marks ?? "Pending"}
          </div>
        `;
      }
    });
  });
}

/*************************
 ATTENDANCE LOGIC
**************************/
function filterAttendance() {
  const roll = document.getElementById("rollNo").value;
  if (!roll) {
    alert("Enter roll number");
    return;
  }

  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;

  const attendance = getAttendance();
  let records = attendance.filter(a => a.roll == roll);

  if (from) records = records.filter(a => new Date(a.date) >= new Date(from));
  if (to) records = records.filter(a => new Date(a.date) <= new Date(to));

  renderAttendance(records);
}

function renderAttendance(records) {
  const summary = document.getElementById("attendanceSummary");
  const monthly = document.getElementById("monthlySummary");

  if (records.length === 0) {
    summary.innerHTML = "<p class='text-muted'>No records found</p>";
    monthly.innerHTML = "";
    return;
  }

  const present = records.filter(r => r.status === "Present").length;
  const total = records.length;
  const percent = Math.round((present / total) * 100);

  const warning = percent < 75
    ? `<span class="badge bg-danger ms-2">⚠ Low Attendance</span>`
    : "";

  summary.innerHTML = `
    <p><b>Total Classes:</b> ${total}</p>
    <p><b>Present:</b> ${present}</p>
    <p><b>Attendance:</b> ${percent}% ${warning}</p>

    <div class="progress mb-3">
      <div class="progress-bar ${percent < 75 ? "bg-danger" : "bg-success"}"
        style="width:${percent}%">
      </div>
    </div>
  `;

  // Monthly Summary
  const monthlyData = {};

  records.forEach(r => {
    const key = new Date(r.date).toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

    if (!monthlyData[key]) {
      monthlyData[key] = { total: 0, present: 0 };
    }

    monthlyData[key].total++;
    if (r.status === "Present") monthlyData[key].present++;
  });

  monthly.innerHTML = `
    <h6>Monthly Attendance Summary</h6>
    ${Object.keys(monthlyData).map(m => {
      const p = Math.round(
        (monthlyData[m].present / monthlyData[m].total) * 100
      );
      return `
        <div class="border rounded p-2 mb-2">
          <b>${m}</b><br>
          Attendance: ${p}%
        </div>
      `;
    }).join("")}
  `;
}

/*************************
 INITIAL LOAD
**************************/
renderAssignments();
function renderAnnouncements() {
  const list = document.getElementById("annList");
  const data = getAnnouncements();
  if (!data.length) {
    list.innerHTML = "<p class='text-muted'>No announcements</p>";
    return;
  }
  list.innerHTML = data.map(a=>`
    <div class="border rounded p-2 mb-2">
      <b>${a.title}</b><br>${a.body}
      <div class="text-muted small">${a.by} • ${a.date}</div>
    </div>
  `).join("");
}
renderAnnouncements();
function renderInbox() {
  const box = document.getElementById("inbox");
  const msgs = getMessages().filter(m => m.to === user.username);
  if (!msgs.length) {
    box.innerHTML = "<p class='text-muted'>No messages</p>";
    return;
  }
  box.innerHTML = msgs.map(m=>`
    <div class="border rounded p-2 mb-2">
      <b>From:</b> ${m.from}<br>
      ${m.text}
      <div class="text-muted small">${m.date}</div>
    </div>
  `).join("");
}
renderInbox();
