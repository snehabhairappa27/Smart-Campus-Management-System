# Smart Campus Management System

A web-based campus operations dashboard designed for software apprenticeship programs. It enables coordinators, mentors, and apprentices to manage cohort rosters, daily attendance roll calls, engineering lab and workstation reservations, and campus-wide notices.

## Features

- **Overview Dashboard**: Live metrics for active apprentices, daily check-in percentage, open engineering labs, scheduled reservations, and recent campus notices, plus quick navigation to roll call, labs, and apprentice details.
- **Apprentice Directory**: Searchable and filterable roster by engineering track (`Full-Stack`, `Cloud & DevOps`, `Data Engineering`, `QA Automation`) and status (`Active`, `On Leave`, `Graduated`), with inline status switching, an inspectable/editable apprentice profile drawer, enrollment modal, and removal controls.
- **Daily Attendance Roll Call**: Date-selectable attendance sheet with live summary counters (`Present`, `Late`, `Absent`, `Unmarked`), search and track filters, per-apprentice roll-call buttons, a bulk **Mark Visible Present** action, and **Download CSV** export.
- **Labs & Workstations**: Directory of campus spaces and workstation pods with photography, seating capacity, equipment specs, status cycling (`Available`, `Occupied`, `Maintenance`), double-booking conflict prevention, and reservation cancellation.
- **Campus Notices**: Searchable and category-filtered bulletin board (`Academic`, `Workshop`, `Facilities`, `IT & Access`) supporting pin/unpin toggles, deletion, and publishing new announcements.
- **Local Persistence**: All edits save automatically to `localStorage`, with a **Reset Campus Data** action in the sidebar to restore the initial dataset.

## Technologies Used

- **HTML5**: Semantic page layout, accessible forms, and modal dialogs (`index.html`).
- **CSS3**: Responsive grid/flexbox layout, design tokens, tabular numerals, and mobile navigation drawer (`style.css`).
- **Vanilla JavaScript (ES6+)**: Client-side hash routing, DOM rendering, filtering, CSV export, form validation, and `localStorage` persistence (`script.js`).
- **Assets**: Local campus and lab photography stored in `assets/`.
- **Node.js & Express** *(optional local/VM web server)*: Lightweight static file server (`server.js`) serving the app on port `3000`.

## Project Structure

```text
Smart-Campus-Management-System/
├── index.html          # Main application HTML structure and modals
├── style.css           # Stylesheet, responsive layout, and typography
├── script.js           # Client-side state, rendering, forms, and handlers
├── assets/             # Campus and lab image assets
│   ├── campus-atrium.jpg
│   ├── lab-workstations.jpg
│   └── demo-studio.jpg
├── server.js           # Optional Express static server (port 3000)
├── package.json        # Node.js scripts and Express dependency
└── README.md           # Project documentation
```

## Steps to Run the Application

### Option 1: Open Directly in a Browser
1. Download or clone this project folder to your local machine or virtual machine.
2. Double-click `index.html` (or open it via `File -> Open File` in Chrome, Firefox, or Edge).

### Option 2: Run via Python Static Server (No Node.js Required)
```bash
cd Smart-Campus-Management-System
python3 -m http.server 3000
```
Open `http://localhost:3000` in your browser.

### Option 3: Run via Node.js / Express
```bash
cd Smart-Campus-Management-System
npm install
npm start
```
Open `http://localhost:3000` in your browser.
