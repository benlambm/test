// Use a more vibrant and accessible color palette
const vibrantColors = [
    '#FF6384', // Vivid Pink
    '#36A2EB', // Bright Blue
    '#FFCE56', // Sunny Yellow
    '#4BC0C0', // Aqua Green
    '#9966FF', // Rich Purple
    '#FF9F40'  // Zesty Orange
];

function loadResults() {
    let results = null;
    // Try sessionStorage first, as it's the primary store for the current session.
    let resultsData = sessionStorage.getItem('quizResults');

    // If no results are in sessionStorage, check the localStorage backup.
    // This makes the results persistent across sessions, as intended by the backup logic.
    if (!resultsData) {
        resultsData = localStorage.getItem('quizResults');
    }

    if (resultsData) {
        try {
            results = JSON.parse(resultsData);
            // For consistency, if we load from localStorage, also place it in sessionStorage for the current session.
            sessionStorage.setItem('quizResults', resultsData);
        } catch (error) {
            console.error('Error parsing results data:', error);
            showErrorMessage();
            return;
        }
    }

    if (results) {
        displayResults(results);
    } else {
        showErrorMessage();
    }
}

function showErrorMessage() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.innerHTML = `
        <div class="results-header">
            <h2>No Results Found</h2>
            <p>It looks like you haven't taken the quiz yet or your results have expired.</p>
            <button class="retry-btn" onclick="window.location.href='index.html'">Take Quiz</button>
        </div>
    `;
}

function displayResults(data) {
    const { userName, overallScore, subdomainScores } = data;
    const resultsSection = document.getElementById('resultsSection');

    const scoreOutOf100 = Math.round((overallScore / 5) * 100);
    let level, levelDescription;

    if (overallScore >= 4.5) {
        level = 'Digital Perfection! Are you an AI too?';
        levelDescription = `${userName}, you are a digital wizard! Your skills are exceptional across all areas.`;
    } else if (overallScore >= 3.5) {
        level = 'Digital Power User';
        levelDescription = `${userName}, you have strong digital skills and are well-prepared for the modern digital world.`;
    } else if (overallScore >= 2.5) {
        level = 'Digital Explorer';
        levelDescription = `${userName}, you have solid foundational skills with room for growth in some areas.`;
    } else if (overallScore >= 1.5) {
        level = 'Digital Work in Progress';
        levelDescription = `${userName}, you're on your digital journey! Focus on building your foundational skills.`;
    } else {
        level = 'Digital Newbie';
        levelDescription = `${userName}, everyone starts somewhere! You have exciting opportunities to develop your digital skills.`;
    }

    const resultsHeaderHTML = `
        <div class="results-top-section">
            <div class="results-text">
                <h2>${userName}'s Digital Literacy Results</h2>
                <div class="overall-score">${overallScore.toFixed(1)}/5.0</div>
                <div class="score-out-of-100">Total Score: ${scoreOutOf100}/100</div>
                <div class="score-description">${level}</div>
                <p>${levelDescription}</p>
            </div>
            <div class="results-chart-container">
                <canvas id="scoresChart" width="320" height="320"></canvas>
            </div>
        </div>
    `;

    let subdomainHTML = `
        <div class="subdomain-scores">
            <h3 style="text-align: center; margin-bottom: 2rem; color: var(--primary-dark-turquoise);">Competency Breakdown</h3>
    `;

    Object.values(subdomainScores).forEach(subdomain => {
        const percentage = (subdomain.score / 5) * 100;
        let feedback;

        if (subdomain.score >= 4.5) {
            feedback = `Excellent! You demonstrate expert-level proficiency here.`;
        } else if (subdomain.score >= 3.5) {
            feedback = `Great work! You show advanced skills with minor areas for enhancement.`;
        } else if (subdomain.score >= 2.5) {
            feedback = `Good foundation! Continue practicing to reach advanced levels.`;
        } else if (subdomain.score >= 1.5) {
            feedback = `Developing nicely! Focus on hands-on practice and learning resources.`;
        } else {
            feedback = `Just starting out! Consider taking courses or tutorials in this area.`;
        }

        subdomainHTML += `
            <div class="subdomain-item">
                <div class="subdomain-header">
                    <div class="subdomain-title">${subdomain.icon} ${subdomain.title}</div>
                    <div class="subdomain-score">${subdomain.score.toFixed(1)}/5.0</div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%;" data-width="${percentage}%"></div>
                </div>
                <p class="subdomain-description">
                    <strong>Definition:</strong> ${subdomain.description}<br><br>
                    <strong>Your Performance:</strong> ${feedback}
                </p>
            </div>
        `;
    });

    subdomainHTML += `</div>`;

    const buttonsHTML = `
        <div style="text-align: center; margin-top: 2rem;">
            <button class="retry-btn" onclick="window.location.href='index.html'">Take Quiz Again</button>
        </div>
    `;

    resultsSection.innerHTML = resultsHeaderHTML + subdomainHTML + buttonsHTML;

    // Ensure the canvas element is in the DOM before drawing
    setTimeout(() => {
        drawScoresChart(subdomainScores);
        // Animate progress bars
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);
}

function drawScoresChart(subdomainScores) {
    const canvas = document.getElementById('scoresChart');
    if (!canvas) {
        console.error('Scores chart canvas not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20; // Responsive radius

    const competencies = Object.values(subdomainScores);
    const totalValue = 5 * competencies.length; // Max possible score
    let currentAngle = -Math.PI / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    competencies.forEach((comp, index) => {
        const sliceAngle = (5 / totalValue) * 2 * Math.PI; // Each slice is equal
        const endAngle = currentAngle + sliceAngle;
        const scoreRadius = (comp.score / 5) * radius; // Radius based on score

        // Draw the segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, scoreRadius, currentAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = vibrantColors[index % vibrantColors.length];
        ctx.fill();

        // Add a subtle border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add score text inside the slice
        const textAngle = currentAngle + sliceAngle / 2;
        const textRadius = scoreRadius * 0.7;
        const x = centerX + Math.cos(textAngle) * textRadius;
        const y = centerY + Math.sin(textAngle) * textRadius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(textAngle + Math.PI / 2); // Rotate text to be upright
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Arial';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(comp.score.toFixed(1), 0, 0);
        ctx.restore();

        currentAngle = endAngle;
    });
}

// Load results when the page has finished loading
window.addEventListener('load', loadResults);
