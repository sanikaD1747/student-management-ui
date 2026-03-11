# Student Management Dashboard

This is a modern, responsive Angular application built for the **Frontend Developer - Angular (Fresher) Technical Test**. It allows managing student records with full CRUD capabilities.

The application is built using Angular 21 with a focus on an impressive, dashboard-style UI that supports both **Light and Dark modes**.

## Features

* **View Students:** View all students in an organized table with pagination.
* **Add Student:** Register a new student using Angular Reactive Forms with comprehensive validation.
* **Edit Student:** Update existing student details.
* **Delete Student:** Remove student records.
* **Search Functionality:** Instantly filter students by name, email, course, or city.
* **Light/Dark Theme:** Built-in dashboard toggle to switch between light and dark visual themes.
* **Responsive Design:** Optimized for different screen sizes.

## Technology Stack

* **Framework:** Angular (v21)
* **Language:** TypeScript
* **Styling:** Custom CSS, Bootstrap (for layout gridding and utility classes), Bootstrap Icons
* **Data Handling:** RxJS BehaviorSubject (Local Services storing data in memory)

---

## Installation Steps

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/sanikaD1747/student-management-ui.git
    cd student-management-ui
   ```

2. **Install Node.js & Angular CLI:**
   Make sure you have Node.js installed (v18+ recommended). If you don't have the Angular CLI globally installed, run:
   ```bash
   npm install -g @angular/cli
   ```

3. **Install Dependencies:**
   Run the following command inside the project directory to install all required npm packages (including Bootstrap and Bootstrap Icons):
   ```bash
   npm install
   ```

---

## How to Run the Project

1. **Start the Development Server:**
   Execute the core Angular CLI command to run the app:
   ```bash
   ng serve
   ```
   Or using npm:
   ```bash
   npm start
   ```

2. **Open your Browser:**
   Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

## Project Structure Explanation

The project follows a modular, feature-based architecture utilizing Angular's standalone components paradigm:

```text
student-management-ui/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── student-list/         # Displays the table, handles pagination/search and deletion
│   │   │   ├── student-form/         # Contains the Reactive Form used for adding & editing students
│   │   │   └── settings-page/        # Dashboard settings overlay with theme toggle
│   │   ├── models/
│   │   │   └── student.model.ts      # TypeScript interface defining the shape of a Student object
│   │   ├── services/
│   │   │   └── student.service.ts    # Centralized state management utilizing RxJS BehaviorSubject for CRUD
│   │   ├── app.ts                    # Root component containing the dashboard layout and theme switcher
│   │   └── app.routes.ts             # Contains Angular Router configurations
│   ├── index.html                    # The main HTML file containing the app-root component
│   ├── styles.css                    # Main global design styles, custom CSS variables, and themes definitions
│   └── main.ts                       # The main entry point to bootstrap the standalone app
├── angular.json                      # Angular workspace configuration
└── package.json                      # Contains NPM dependencies and project scripts
```

### Key Highlights

* **Component Architecture:** Divided logical boundaries into `student-list` and `student-form` relying on the parent dashboard frame inside `app`.
* **Services & State:** Centralized logical manipulation to `student.service.ts` mimicking an API response lifecycle through Angular's Observables.
* **Forms & Validation:** Used Reactive Forms for tight bindings and synchronous built-in validation checks (e.g., matching numeric input, correct email formats).
## Live Demo

The application is deployed and can be accessed online here:

🔗 https://studentmanagemt.netlify.app/students

Feel free to explore the dashboard, manage student records, and experience the full functionality of the application in real time.
