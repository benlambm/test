# Digital Literacy Quiz - Development Instructions

## Project Overview
This is a web-based Digital Literacy Quiz application that assesses users' digital skills across 6 core competency areas with 30 total competencies. The quiz provides personalized feedback and scoring.

## Tech Stack
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **No Build Tools** - Simple static files, no webpack/bundlers needed
- **No Dependencies** - Self-contained application with no external libraries

## File Structure
```
/
├── index.html      # Main quiz interface and question flow
├── results.html    # Separate results page for assessment display
├── styles.css      # All styling with high-contrast color scheme
├── script.js       # Quiz logic and navigation to results
├── instructions.md # This file - development guidelines
└── README.md       # User-facing documentation
```

## Code Style Preferences

### General
- **Separation of Concerns**: Keep HTML, CSS, and JavaScript in separate files
- **Clean Code**: Descriptive variable/function names, well-commented code
- **Modern Standards**: Use modern ES6+ features and CSS3
- **Accessibility**: Maintain WCAG compliance with proper ARIA labels

### CSS Guidelines
- Use CSS custom properties for colors and repeated values
- High-contrast design with dark turquoise, white, yellow accents, and maroon for errors
- Mobile-first responsive design approach
- Smooth animations and transitions for better UX
- BEM or similar naming convention for classes
- Modern gradient-based design with accessibility focus
- Maroon borders and backgrounds for validation errors and incomplete sections

### JavaScript Guidelines
- Use `const` and `let`, avoid `var`
- Arrow functions where appropriate
- Template literals for string interpolation
- Descriptive function names (e.g., `calculateResults()`, `displayResults()`)
- Store user data in variables/objects, not in DOM

### HTML Guidelines
- Semantic HTML5 elements
- Proper form structure with labels
- Accessibility attributes where needed
- Clean, readable structure

## Key Features to Maintain

1. **Name Collection First**
   - User must enter name before starting
   - Name is used throughout results for personalization

2. **Scoring System**
   - 1-5 scale for each competency
   - Overall score shown as both /5.0 and /100
   - Individual competency scores with progress bars

3. **User Experience**
   - Smooth animations and transitions
   - Hover effects on interactive elements
   - Clear visual feedback for selections
   - Mobile-responsive design
   - Separate results page for better navigation
   - Enhanced error validation with maroon highlighting

4. **Data Structure**
   - 6 main competencies stored in array
   - Each competency has 5 skills
   - Competencies include: icon, title, description, skills array
   - Results passed via URL parameters and localStorage backup

5. **Error Handling & Validation**
   - Maroon borders highlight incomplete sections and questions
   - Scroll to first incomplete section on validation error
   - Clear error messaging with detailed feedback

## Future Enhancement Suggestions

### Potential Features
- Save results to localStorage
- Export results as PDF
- Email results functionality
- Time tracking for quiz completion
- Comparison with average scores
- Detailed learning resources for each competency
- Multi-language support
- Dark mode toggle

### Technical Improvements
- Add JSDoc comments for better documentation
- Implement unit tests
- Add loading states for better UX
- Progressive Web App capabilities
- Keyboard navigation improvements
- Enhanced accessibility features

## Development Workflow

1. **Making Changes**
   - Test all changes across browsers (Chrome, Firefox, Safari, Edge)
   - Ensure mobile responsiveness
   - Validate HTML/CSS
   - Check console for JavaScript errors

2. **Adding Features**
   - Maintain existing code structure
   - Follow established naming conventions
   - Update this documentation if adding major features
   - Keep user experience smooth and intuitive

3. **Performance**
   - Keep file sizes minimal
   - Optimize images if added
   - Lazy load resources if needed
   - Maintain fast page load times

## Browser Support
- Modern browsers (last 2 versions)
- IE 11+ (with graceful degradation)
- Mobile browsers (iOS Safari, Chrome Android)

## Important Notes

- **No jQuery**: Project uses vanilla JavaScript only
- **No Bootstrap**: Custom CSS for full control
- **Self-contained**: Should work offline once loaded
- **Privacy**: No data is sent to servers, all processing is client-side

## Color Palette
- Primary: `#006666` (Dark turquoise)
- Secondary: `#008080` (Turquoise)
- Accent: `#FFD700` (Gold/Yellow) - for selected ratings
- Error/Warning: `#800020` (Maroon) - for validation and incomplete sections
- Background: `#FFFFFF` (White)
- Text: `#333333` (Dark gray)
- Light backgrounds: `#F5F5F5` (Light gray)

### CSS Custom Properties
```css
:root {
    --primary-dark-turquoise: #006666;
    --secondary-turquoise: #008080;
    --accent-yellow: #FFD700;
    --accent-maroon: #800020;
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
    --dark-gray: #333333;
    --error-maroon: #B22222;
}
```

## Typography
- System font stack for optimal readability
- Font sizes responsive using rem units
- Clear hierarchy with consistent spacing

---

*Last updated: August 2025*
