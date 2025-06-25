# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Soil Contaminant Guideline Manager – Frontend

This is the frontend of the **Soil Contaminant Guideline Manager App**, built using **React.js** and **CSS**. The application allows users to manage chemical contaminants and evaluate their compliance with environmental guideline values.

---

## 📁 Project Structure

src/
│
├── components/         # Reusable React components (e.g., Form, Table)
├── pages/              # Manage and Analyze views
├── services/           # API interaction logic
├── App.js              # Root component
├── index.js            # Entry point
└── styles/             # CSS styling

---

## 🚀 Features

- **Manage Chemicals**: Add, update, and delete contaminants and their guideline values per pathway and soil type.
- **Analyze Contaminants**: Input a measured concentration and evaluate it against pathway-specific criteria.
- **Responsive Design**: Clean and functional UI styled with basic CSS.
- **Form Validation**: Ensures valid input for critical fields.
- **Dynamic Feedback**: Real-time display of results (compliance, exceeding pathways).

---

## 🛠️ Technologies Used

- React.js (Functional Components + Hooks)
- JavaScript (ES6)
- CSS
- Axios (for backend API calls)
- React Router (optional for navigation)

---

## 📦 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/soil-contaminant-manager-frontend.git
   cd soil-contaminant-manager-frontend

2. Install dependencies:
   npm install

3. Configure API base URL in services/api.js.

4. Run the app:
   npm start
   
6.	The app will run at: http://localhost:3000
