// Quiz data structure
const competencies = [
    {
        id: 'foundational',
        title: 'Computer Proficiency and Troubleshooting',
        icon: '💻',
        description: 'The essential skills required to operate, manage, and troubleshoot common digital hardware, software, and systems.',
        skills: [
            'Recognize, identify, and navigate different Operating Systems (Windows, macOS, iOS, Android).',
            'Find and work with files and folders effectively through logical folder structures, cloud storage, and shared drives.',
            'Use Office software applications, including word processors, spreadsheets, presentation tools, and web browsers.',
            'Identify core network appliances and understand network connectivity basics (routers, modems, Wi-Fi).',
            'Perform computer & network troubleshooting to identify, research, and resolve common technical issues.'
        ]
    },
    {
        id: 'information',
        title: 'Information Literacy',
        icon: '🔍',
        description: 'The ability to find, critically evaluate, and ethically synthesize digital information while distinguishing credible content from misinformation.',
        skills: [
            'Determine the nature of a problem or research question and information needed to solve or answer it.',
            'Search and locate relevant information from web search engines, scholarly databases, and other digital platforms.',
            'Evaluate information for credibility, currency, reliability, accuracy, and bias.',
            'Synthesize information from multiple sources to build knowledge, support arguments, and solve problems.',
            'Understand and apply proper citation guidelines to avoid plagiarism.'
        ]
    },
    {
        id: 'content',
        title: 'Digital Content Creation & Management',
        icon: '🎨',
        description: 'The capability to produce, format, and share a variety of digital content for different audiences and platforms.',
        skills: [
            'Design professional documents and effective presentations with embedded visuals.',
            'Produce and/or edit images and graphics, using modern design platforms (e.g., Canva, Figma, Adobe).',
            'Develop and publish a basic website using foundational technologies (HTML/CSS) and web hosting.',
            'Apply recognized style guides (e.g., APA, MLA) to format documents and research papers for academic and professional use.',
            'Build and manage a positive and professional digital identity or personal brand.'
        ]
    },
    {
        id: 'communication',
        title: 'Digital Collaboration & Teamwork',
        icon: '👥',
        description: 'The skills needed to communicate and work with others effectively and ethically in digital environments.',
        skills: [
            'Communicate clearly and professionally across various digital channels, including email, messaging apps, and forums.',
            'Use collaborative platforms and tools (e.g., Microsoft Teams, Jira, Slack) to participate on group projects.',
            'Practice proper digital etiquette ("netiquette") on online platforms',
            'Understand what data has legal and ethical responsibilities, such as respecting privacy and consent.',
            'Feel confident contributing to collaborative products using versioning, documentation, messaging, and soft skills.'
        ]
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity & Digital Citizenship',
        icon: '🔒',
        description: 'The awareness, ethics, and practices required to act responsibly and protect oneself and one\'s data in the digital world.',
        skills: [
            'Identify and defend against common cybersecurity threats, including phishing, malware, identity theft, and scams.',
            'Implement security best practices, such as creating strong passwords, using multi-factor authentication, and securing networks.',
            'Understand digital laws and ethics, including copyright, fair use, and accessibility standards.',
            'Recognize the responsibilities of digital citizenship, including promoting civic behavior and combating misinformation.',
            'Understand the social implications and potential health consequences of corporate business models, personalization algorithms, and data collection practices',
        ]
    },
    {
        id: 'emerging',
        title: 'New & Emerging Technologies',
        icon: '🤖',
        description: 'The ability to understand and leverage data, cloud platforms, and new technologies to innovate and solve problems.',
        skills: [
            'Distinguish and be able to query both traditional SQL and newer NoSQL kinds of databases.',
            'Use cloud computing services (AWS, Azure, GCP, Oracle) for data storage, software applications, and scalable problem-solving.',
            'Familiarity with emerging technologies like generative AI (genAI), the Internet of Things (IoT), and Blockchain.',
            'Effectively prompt, iterate upon, and evaluate AI-produced outputs to increase usefulness and trustworthiness.',
            'Incorporate AI/ML approaches to research, identify, and implement technological solutions to complex challenges.'
        ]
    }
];

// The global userName variable is removed to prevent state loss on page reload.
// The user's name will be stored in sessionStorage instead.

// Enable/disable start button based on name input
function handleNameInput() {
    const nameInput = document.getElementById('userName');
    const startButton = document.getElementById('startQuizBtn');

    if (nameInput.value.trim().length > 0) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

// Start the quiz
function startQuiz() {
    const nameInput = document.getElementById('userName');
    const userName = nameInput.value.trim();

    if (userName.length === 0) {
        alert('Please enter your name to begin the quiz.');
        return;
    }

    // Store name in sessionStorage to make it robust against page reloads
    sessionStorage.setItem('quizUserName', userName);

    // Clear any previous results to ensure fresh start
    sessionStorage.removeItem('quizResults');
    localStorage.removeItem('quizResults');

    // Hide name section, show quiz sections
    document.getElementById('nameSection').style.display = 'none';
    document.getElementById('quizSections').style.display = 'block';

    // Generate the quiz
    generateQuiz();
}

// Generate quiz form
function generateQuiz() {
    const form = document.getElementById('quizForm');
    let formHTML = '';

    competencies.forEach((comp, compIndex) => {
        formHTML += `
            <div class="competency-section" id="${comp.id}_section">
                <div class="competency-header">
                    <h3><span class="icon">${comp.icon}</span> ${comp.title}</h3>
                    <p>${comp.description}</p>
                </div>
        `;

        comp.skills.forEach((skill, skillIndex) => {
            const inputName = `${comp.id}_skill_${skillIndex}`;
            formHTML += `
                <div class="skill-item">
                    <label class="skill-label">${skill}</label>
                    <div class="rating-group">
            `;

            for (let i = 1; i <= 5; i++) {
                formHTML += `
                    <div class="rating-option">
                        <input type="radio" id="${inputName}_${i}" name="${inputName}" value="${i}" required>
                        <label class="rating-label" for="${inputName}_${i}">${i}</label>
                    </div>
                `;
            }

            formHTML += `
                    </div>
                </div>
            `;
        });

        formHTML += `</div>`;
    });

    form.innerHTML = formHTML;
}

// Calculate and display results
function calculateResults() {
    // Clear any previous error styling
    document.querySelectorAll('.competency-section.incomplete, .skill-item.incomplete').forEach(el => {
        el.classList.remove('incomplete');
    });

    // Check if all questions are answered
    const totalQuestions = competencies.reduce((sum, comp) => sum + comp.skills.length, 0);
    const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
    const incompleteItems = [];

    if (answeredQuestions < totalQuestions) {
        // Find and highlight incomplete sections
        competencies.forEach(comp => {
            let sectionIncomplete = false;
            comp.skills.forEach((skill, index) => {
                const inputName = `${comp.id}_skill_${index}`;
                const selectedValue = document.querySelector(`input[name="${inputName}"]:checked`);
                if (!selectedValue) {
                    const skillItem = document.querySelector(`input[name="${inputName}"]`).closest('.skill-item');
                    skillItem.classList.add('incomplete');
                    sectionIncomplete = true;
                }
            });

            if (sectionIncomplete) {
                const competencySection = document.querySelector(`#${comp.id}_section`);
                if (competencySection) {
                    competencySection.classList.add('incomplete');
                }
                incompleteItems.push(comp.title);
            }
        });

        // Show error message with maroon styling
        const errorMessage = `Please answer all questions! You've answered ${answeredQuestions} out of ${totalQuestions} questions.\n\nIncomplete sections:\n${incompleteItems.join('\n')}`;
        alert(errorMessage);

        // Scroll to first incomplete section
        const firstIncomplete = document.querySelector('.competency-section.incomplete');
        if (firstIncomplete) {
            firstIncomplete.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return;
    }

    // Retrieve the user's name from sessionStorage
    const userName = sessionStorage.getItem('quizUserName') || 'Anonymous';

    // Calculate scores
    let totalScore = 0;
    const subdomainScores = {};

    competencies.forEach(comp => {
        let compScore = 0;
        let compCount = 0;

        comp.skills.forEach((skill, index) => {
            const inputName = `${comp.id}_skill_${index}`;
            const selectedValue = document.querySelector(`input[name="${inputName}"]:checked`).value;
            compScore += parseInt(selectedValue);
            compCount++;
        });

        const avgScore = compScore / compCount;
        subdomainScores[comp.id] = {
            score: avgScore,
            title: comp.title,
            description: comp.description,
            icon: comp.icon
        };
        totalScore += avgScore;
    });

    const overallAverage = totalScore / competencies.length;

    // Store results and navigate to results page
    const resultsData = {
        userName: userName,
        overallScore: overallAverage,
        subdomainScores: subdomainScores,
        timestamp: Date.now() // Add timestamp for data freshness
    };

    // Store in sessionStorage (preferred) and localStorage as backup
    sessionStorage.setItem('quizResults', JSON.stringify(resultsData));
    localStorage.setItem('quizResults', JSON.stringify(resultsData));

    // Navigate to results page with userName as URL parameter
    const urlParams = new URLSearchParams();
    urlParams.set('userName', encodeURIComponent(userName));
    window.location.href = `results.html?${urlParams.toString()}`;
}

// Reset quiz
function resetQuiz() {
    // Clear stored results
    sessionStorage.removeItem('quizResults');
    localStorage.removeItem('quizResults');
    sessionStorage.removeItem('quizUserName'); // Also clear the stored name

    // Reset form but keep the name
    document.getElementById('quizForm').reset();

    // Clear any error styling
    document.querySelectorAll('.competency-section.incomplete, .skill-item.incomplete').forEach(el => {
        el.classList.remove('incomplete');
    });

    // Show quiz sections (not name section)
    document.getElementById('quizSections').style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize quiz on page load
window.onload = function () {
    // Set up name input handler
    const nameInput = document.getElementById('userName');
    if (nameInput) {
        nameInput.addEventListener('input', handleNameInput);
        nameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !document.getElementById('startQuizBtn').disabled) {
                startQuiz();
            }
        });
    }
};
