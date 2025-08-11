# F1 Dashboard

A modern React + TypeScript dashboard for Formula 1 data, built with Vite. This project visualizes race results, driver performance, and season statistics using official F1 data from [Ergast API](https://api.jolpi.ca/ergast/).

---

## 🚀 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning)

### 1. Clone the Repository

```sh
git clone https://github.com/AmlYES/F1-Dashboard.git
cd F1-Dashboard
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Development Server

```sh
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Unit Tests

```sh
npm test
```
or
```sh
npx jest
```

---

## 🧪 Project Structure

```
src/
  components/         # Reusable UI components (Pagination, RaceList, etc.)
  context/            # React Context for global state (ViewContext)
  hooks/              # Custom React hooks
  pages/              # Top-level pages (Home, Races, RaceDetails)
  tests/              # Unit tests
  Types/              # TypeScript type definitions
  utils/              # Utility functions (date formatting, sorting)
  assets/             # Static assets (logos, images)
  styles.css          # Global styles
  App.tsx             # Main app component
  main.tsx            # Entry point
```

---

## 🛠 Technical Approach & Architecture

### **Frontend Stack**
- **React** (with hooks and context for state management)
- **TypeScript** (type safety across components and utilities)
- **Vite** (fast development server and build tool)
- **Jest + React Testing Library** (unit and component testing)
- **Chart.js** (for data visualization)

### **Key Architectural Decisions**

- **Component-Driven Design:**  
  UI is split into small, reusable components (`RaceList`, `PerformanceVisualization`, `Pagination`, etc.) for maintainability and scalability.


- **Context API:**  
  `ViewContext` provides global state (e.g., list/grid view) accessible by any component.

- **Hooks:**  
  Custom hooks encapsulate logic for context and data fetching.

- **Testing:**  
  Unit tests are written for core logic and components, ensuring reliability and easy refactoring.

- **Data Fetching:**  
  Uses Axios to fetch F1 data from the [Ergast API](https://ergast.com/mrd/), with pagination and error handling.

- **Visualization:**  
  Race results and driver performance are visualized using Chart.js for clear, interactive insights.

---

## 📝 Usage

- **Browse Seasons:**  
  Select a season to view all races.
- **View Race Details:**  
  Click a race to see results and driver performance.
- **Pin Races:**  
  Pin favorite races to the top for quick access (stored in localStorage).
- **Switch Views:**  
  Toggle between list and grid layouts.
- **Pagination:**  
  Long List Pagination for better experience.

---

## 🧑‍💻 Development Notes

- All code is written in TypeScript for safety and clarity.
- Styling uses a single global CSS file (`styles.css`).
- The project is structured for easy extension (add new pages, components, or features).
- Tests are located in `src/tests/` and can be run with Jest.

