# EduConnect - Educational Management System

A comprehensive web-based educational management system built with HTML, CSS, JavaScript, and Bootstrap. EduConnect provides a complete solution for managing educational institutions with role-based dashboards for administrators, teachers, and students.

## 📋 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Default Credentials](#default-credentials)
- [Features by Role](#features-by-role)
- [Data Storage](#data-storage)
- [Contributing](#contributing)

## ✨ Features

### Admin Features
- **User Management**: Create and manage teacher and student accounts
- **Auto-Generated Credentials**: Automatic username and password generation for new users
- **Analytics Dashboard**: View system-wide statistics (teachers, students, assignments, attendance)
- **Data Export**: Export attendance and marks data to CSV format
- **Classroom Management**: Create and manage classrooms
- **Announcements**: View all system announcements

### Teacher Features
- **Assignment Management**: Create, manage, and track assignments with multiple questions
- **Attendance Tracking**: Mark and submit student attendance
- **Announcements**: Post announcements for students
- **Messaging System**: Send direct messages to students
- **Classroom Access**: Request access to specific classrooms
- **Grade Management**: Assign marks to student submissions

### Student Features
- **Assignment Viewing**: View all available assignments and due dates
- **Submission Tracking**: Track assignment submissions and received marks
- **Attendance Records**: View personal attendance with date range filtering
- **Monthly Summaries**: Access monthly attendance summaries
- **Announcements**: View teacher and admin announcements
- **Inbox**: Receive and read messages from teachers

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.2
- **Data Storage**: LocalStorage (Browser-based)
- **Icons & Styling**: Bootstrap Icons and Components

## 📁 Project Structure

```
edutech/
├── index.html              # Login page
├── admin.html              # Admin dashboard
├── teacher.html            # Teacher dashboard
├── student.html            # Student dashboard
├── profile.html            # User profile page
├── change-password.html    # Password change interface
├── css/
│   └── style.css          # Custom styles
└── js/
    ├── auth.js            # Authentication logic
    ├── storage.js         # LocalStorage management
    ├── admin.js           # Admin functionality
    ├── teacher.js         # Teacher functionality
    ├── student.js         # Student functionality
    ├── profile.js         # Profile management
    └── change-password.js # Password change logic
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyasaparia/edutech.git
   cd edutech
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or server required
   - Compatible with all modern browsers

3. **Alternative: Using a local server (Optional)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   Then navigate to `http://localhost:8000`

## 💻 Usage

1. Open `index.html` in your web browser
2. Login with the default admin credentials (see below)
3. Create teacher and student accounts from the admin dashboard
4. Use the generated credentials to login as teacher or student
5. Explore role-specific features

## 👥 User Roles

### 1. Administrator
- Full system access
- User management capabilities
- System analytics and reporting
- Data export functionality

### 2. Teacher
- Classroom management
- Assignment creation and grading
- Attendance marking
- Student communication

### 3. Student
- Assignment viewing and submission
- Attendance tracking
- Receiving announcements and messages
- Grade viewing

## 🔑 Default Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Note**: You will be required to change password on first login

### Creating Teacher/Student Accounts
1. Login as admin
2. Navigate to "Create User" section
3. Select role (Teacher/Student)
4. Click "Generate Account"
5. Credentials will be auto-generated with format:
   - **Teachers**: Username: `teacher1`, `teacher2`, etc. | Password: `TCH-XXXX`
   - **Students**: Username: `student1`, `student2`, etc. | Password: `STU-XXXX`

## 📊 Features by Role

### Admin Dashboard
| Feature | Description |
|---------|-------------|
| User Creation | Generate teacher and student accounts automatically |
| Account Management | View all generated accounts with credentials |
| Analytics | Real-time statistics on users, assignments, and attendance |
| CSV Export | Export attendance and marks data |
| Classroom Setup | Create and manage classrooms |

### Teacher Dashboard
| Feature | Description |
|---------|-------------|
| Create Assignments | Add assignments with multiple questions and due dates |
| Mark Attendance | Daily attendance tracking with roll numbers |
| Post Announcements | Broadcast messages to all students |
| Send Messages | Direct messaging to individual students |
| Classroom Access | Request access to specific classrooms |

### Student Dashboard
| Feature | Description |
|---------|-------------|
| View Assignments | See all assignments with due dates |
| Submission History | Track submitted assignments and marks |
| Attendance Records | View personal attendance with filtering |
| Monthly Summary | Attendance breakdown by month |
| Announcements | Read teacher/admin announcements |
| Inbox | Receive messages from teachers |

## 💾 Data Storage

EduConnect uses browser LocalStorage for data persistence:
- **users**: All user accounts and credentials
- **assignments**: Assignment data and submissions
- **attendance**: Attendance records
- **announcements**: System announcements
- **messages**: User messages
- **classrooms**: Classroom information

**Note**: Data is stored locally in the browser. Clearing browser data will remove all stored information.

## 🔒 Security Features

- Role-based access control
- Forced password change on first login
- Session management
- Auth guards on all protected pages
- Secure password validation

## 🌟 Key Functionalities

### Assignment Management
- Create assignments with multiple questions
- Set given date, due date, and total marks
- Track student submissions
- Grade assignments

### Attendance System
- Mark attendance by roll number
- Filter by date range
- View monthly summaries
- Export attendance data

### Communication
- Announcements (broadcast)
- Direct messaging (teacher to student)
- Inbox system for students

### Analytics
- Teacher count
- Student count
- Assignment statistics
- Average attendance percentage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is available for educational purposes.

## 👨‍💻 Author

Priya Saparia

## 🙏 Acknowledgments

- Bootstrap team for the UI framework
- All contributors and users of EduConnect

---

**Note**: This is a client-side application using LocalStorage. For production use, consider implementing:
- Backend server with database
- Secure authentication system
- Data encryption
- Real-time synchronization
- File upload capabilities
- Enhanced security measures
