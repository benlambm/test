# Digital Literacy Quiz - Development Instructions

## Project Overview
This is a web-based Digital Literacy Quiz application that assesses users' digital skills across six core competency areas. The quiz provides personalized feedback, scoring, and a visual representation of the results.

## Tech Stack
- **HTML5**: For semantic markup and structure.
- **CSS3**: For modern styling, including Flexbox, Grid, and custom properties.
- **Vanilla JavaScript (ES6+)**: For all client-side logic without frameworks or libraries.

## File Structure
```
/
├── index.html          # Main quiz interface and questions.
├── results.html        # Displays the user's assessment results.
├── styles.css          # Global styles for the application.
├── results.css         # Styles specific to the results page.
├── script.js           # Core quiz logic and data handling.
├── results.js          # Logic for displaying results and rendering the chart.
├── instructions.md     # This file: development guidelines.
└── README.md           # User-facing documentation.
```

## Development Principles

- **Separation of Concerns**: HTML, CSS, and JavaScript are kept in separate, modular files.
- **Clean Code**: Use descriptive names for variables and functions. Comment complex logic.
- **Modern Standards**: Adhere to the latest ES6+ and CSS3 features.
- **Accessibility**: Ensure the application is usable by everyone, following WCAG guidelines.

## Key Features

1.  **Personalized Experience**: The quiz begins by collecting the user's name to personalize the results page.
2.  **Dynamic Scoring**: Users are rated on a 1-5 scale for each skill. The results page shows an overall score, a percentage score, and a breakdown by competency.
3.  **Visual Feedback**: The results page features a dynamic circular chart that visually represents the user's scores in each of the six competencies.
4.  **Secure Data Handling**: Quiz results are stored in `sessionStorage` to ensure data privacy and are cleared when the tab is closed.
5.  **Responsive Design**: The application is fully responsive and optimized for both desktop and mobile devices.

## Workflow

1.  **Making Changes**:
    - Test any changes across modern browsers (Chrome, Firefox, Safari).
    - Ensure the application remains responsive and accessible.
    - Validate HTML and CSS, and check the browser console for errors.
2.  **Adding Features**:
    - Follow the existing code structure and naming conventions.
    - Update this documentation if the changes impact the overall architecture.
    - Prioritize a smooth and intuitive user experience.

---

*Last updated: August 2025*
