// Global variables
let currentDeck = null;
let currentCardIndex = 0;
let isCardFlipped = false;
let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let quizStartTime = null;
let quizEndTime = null;

// Timer globals for quiz questions
let questionTimer = null;
let remainingSeconds = 0;
const QUESTION_TIME_LIMIT_SECS = 30;

// Elon Musk passage (used for flashcard study)
const elonParagraph = `Elon Musk is one of the most influential entrepreneurs and inventors of the 21st century. He was born on June 28, 1971, in Pretoria, South Africa, and later moved to the United States to further his education and career in technology. Musk is best known as the CEO of Tesla, a company that has changed the automobile industry by producing electric vehicles that are both eco-friendly and high-performing. He is also the founder and CEO of SpaceX, a private aerospace company that aims to reduce the cost of space travel and make life multi-planetary by establishing a human settlement on Mars. In addition to these, Musk has founded or supported several other futuristic projects such as Neuralink, which is working on connecting the human brain to computers, and The Boring Company, which focuses on building underground transportation systems to reduce traffic congestion. Through all his ventures, Musk has demonstrated a vision of the future driven by science, sustainability, and innovation.`;

// Sample deck data replaced with Elon Musk passage
const sampleDeck = {
    title: "Elon Musk Passage",
    description: "Study the provided passage about Elon Musk.",
    cards: [
        {
            question: elonParagraph,
            answer: elonParagraph
        }
    ]
};

// Fixed quiz (5 questions provided by user)
const elonQuiz = [
    {
        question: "1. Where and when was Elon Musk born, and why did he move to the United States?",
        options: [
            "A. Elon Musk was born on June 28, 1971, in Pretoria, South Africa. He moved to the United States to pursue higher education and build a career in technology and innovation.",
            "B. Elon Musk was born in Toronto, Canada, in 1980 and moved to the United States because he wanted to become a filmmaker and enter the Hollywood industry.",
            "C. Elon Musk was born in Berlin, Germany, and moved to the United States to work as an agricultural scientist in rural farming communities.",
            "D. Elon Musk was born in New York City and remained in the United States his entire life, working in the retail business before entering the tech industry."
        ],
        correctAnswer: "A. Elon Musk was born on June 28, 1971, in Pretoria, South Africa. He moved to the United States to pursue higher education and build a career in technology and innovation."
    },
    {
        question: "2. What major contribution has Elon Musk made to the automobile industry?",
        options: [
            "A. Elon Musk has significantly impacted the automobile industry through Tesla, by producing electric vehicles that are environmentally friendly and technologically advanced.",
            "B. Elon Musk is best known for inventing a new type of diesel engine used mainly in heavy trucks and industrial vehicles.",
            "C. Elon Musk founded a company that builds luxury sports cars powered by jet fuel for high-speed racing events.",
            "D. Elon Musk introduced a new line of solar-powered bicycles that replaced cars in urban areas around the world."
        ],
        correctAnswer: "A. Elon Musk has significantly impacted the automobile industry through Tesla, by producing electric vehicles that are environmentally friendly and technologically advanced."
    },
    {
        question: "3. What is the primary goal of SpaceX, the aerospace company founded by Elon Musk?",
        options: [
            "A. The main goal of SpaceX is to reduce the cost of space travel and eventually establish a human settlement on Mars to make life multi-planetary.",
            "B. SpaceX was created to launch commercial satellites for television networks and focus solely on providing global internet services.",
            "C. The primary mission of SpaceX is to build space-themed hotels in low Earth orbit for tourism and leisure.",
            "D. SpaceX was established to improve air travel on Earth by building faster airplanes for long-distance travel."
        ],
        correctAnswer: "A. The main goal of SpaceX is to reduce the cost of space travel and eventually establish a human settlement on Mars to make life multi-planetary."
    },
    {
        question: "4. What are some other technological ventures Elon Musk is involved in besides Tesla and SpaceX?",
        options: [
            "A. Besides Tesla and SpaceX, Elon Musk is involved in projects like Neuralink, which connects the brain to computers, and The Boring Company, which builds underground tunnels to reduce traffic.",
            "B. Elon Musk is currently focused on producing a reality TV show about technology and has started a company to manufacture household cleaning robots.",
            "C. In addition to his main companies, Elon Musk runs a global fashion brand and a music production studio that promotes young talent.",
            "D. Elon Musk is the founder of a series of luxury hotels and gourmet restaurants that cater exclusively to billionaires and celebrities."
        ],
        correctAnswer: "A. Besides Tesla and SpaceX, Elon Musk is involved in projects like Neuralink, which connects the brain to computers, and The Boring Company, which builds underground tunnels to reduce traffic."
    },
    {
        question: "5. What overall vision does Elon Musk have for the future through his projects?",
        options: [
            "A. Elon Musk envisions a future shaped by science, sustainability, and innovation, where technology improves human life on Earth and beyond.",
            "B. Elon Musk’s long-term vision focuses on replacing modern technology with ancient practices and encouraging people to live off the grid.",
            "C. He believes that society should return to pre-industrial lifestyles and avoid using any form of artificial intelligence or machines.",
            "D. Musk aims to develop a completely virtual society where humans live in simulated realities and no longer engage with the physical world."
        ],
        correctAnswer: "A. Elon Musk envisions a future shaped by science, sustainability, and innovation, where technology improves human life on Earth and beyond."
    }
];

// Prebuilt decks
const prebuiltDecks = {
    gk: {
        title: 'General Knowledge',
        description: 'Prebuilt questions on world facts, science and history',
        cards: [
            { questions: [
                { question: 'Which is the largest ocean on Earth?', options: ['Pacific Ocean','Atlantic Ocean','Indian Ocean','Arctic Ocean'], correctAnswer: 'A' },
                { question: 'Who wrote the play "Romeo and Juliet"?', options: ['William Shakespeare','Charles Dickens','Leo Tolstoy','Mark Twain'], correctAnswer: 'A' },
                { question: 'What is the chemical symbol for Gold?', options: ['Au','Ag','Gd','Go'], correctAnswer: 'A' },
                { question: 'Which planet is known as the Red Planet?', options: ['Mars','Venus','Jupiter','Mercury'], correctAnswer: 'A' },
                { question: 'The Great Wall is located in which country?', options: ['China','India','Japan','Mongolia'], correctAnswer: 'A' }
            ]}
        ]
    },
    ai: {
        title: 'Artificial Intelligence',
        description: 'Prebuilt questions on AI basics',
        cards: [
            { questions: [
                { question: 'What does AI stand for?', options: ['Artificial Intelligence','Automated Interface','Augmented Integration','Applied Informatics'], correctAnswer: 'A' },
                { question: 'Which algorithm is commonly used for classification?', options: ['Logistic Regression','K-Means','DBSCAN','Apriori'], correctAnswer: 'A' },
                { question: 'What is overfitting?', options: ['Model fits training data too well and fails to generalize','Model performs poorly on training and test data','Model uses too few features','Model has no bias'], correctAnswer: 'A' },
                { question: 'Which is a supervised learning task?', options: ['Regression','Clustering','Association Rule Mining','Dimensionality Reduction'], correctAnswer: 'A' },
                { question: 'Which of these is a loss function?', options: ['Cross-Entropy','Softmax','ReLU','Dropout'], correctAnswer: 'A' }
            ]}
        ]
    }
};

function loadPrebuiltDeck(key) {
    const deck = prebuiltDecks[key];
    if (!deck) return;
    // Flatten prebuilt card.questions into one quizQuestions array at quiz time; for study show simple label
    currentDeck = deck;
    showScreen('study-screen');
    updateStudyDisplay();
}

// Helpers
function stripLabel(optionString) {
    return (optionString || '').replace(/^[A-D]\.[\s\u00A0]*/, '');
}

// Screen management
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Reset card state when going to study screen
    if (screenId === 'study-screen' && currentDeck) {
        resetStudyMode();
    }
    
    // Load saved decks when showing welcome screen
    if (screenId === 'welcome-screen') {
        loadSavedDecks();
    }
}

// Load sample deck
function loadSampleDeck() {
    currentDeck = sampleDeck;
    showScreen('study-screen');
    updateStudyDisplay();
}

// Load saved deck
function loadSavedDeck(deckIndex) {
    const savedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
    if (savedDecks[deckIndex]) {
        currentDeck = savedDecks[deckIndex];
        showScreen('study-screen');
        updateStudyDisplay();
    }
}

// Load and display saved decks on welcome screen
function loadSavedDecks() {
    const savedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
    const deckList = document.getElementById('deck-list');
    
    // Keep the sample deck, remove any existing saved decks
    const sampleDeckElement = deckList.querySelector('.sample-deck');
    deckList.innerHTML = '';
    deckList.appendChild(sampleDeckElement);
    
    // Add saved decks
    savedDecks.forEach((deck, index) => {
        const deckElement = document.createElement('div');
        deckElement.className = 'deck-item';
        
        deckElement.innerHTML = `
            <div class="deck-info" onclick="loadSavedDeck(${index})">
                <h4><i class="fas fa-layer-group"></i> ${deck.title}</h4>
                <p>${deck.description || 'No description'}</p>
            </div>
            <div class="deck-actions">
                <button class="btn btn-secondary" onclick="loadSavedDeck(${index})">
                    <i class="fas fa-play"></i> Study
                </button>
                <button class="btn btn-danger" onclick="deleteDeck(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        deckList.appendChild(deckElement);
    });
}

// Delete saved deck
function deleteDeck(deckIndex) {
    if (confirm('Are you sure you want to delete this deck? This action cannot be undone.')) {
        const savedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
        savedDecks.splice(deckIndex, 1);
        localStorage.setItem('flashcardDecks', JSON.stringify(savedDecks));
        loadSavedDecks(); // Refresh the deck list
    }
}

// Add flashcard to creation form
function addFlashcard() {
    const flashcardsList = document.getElementById('flashcards-list');
    const flashcardIndex = flashcardsList.children.length;
    
    const flashcardItem = document.createElement('div');
    flashcardItem.className = 'flashcard-item';
    flashcardItem.innerHTML = `
        <div class="form-group">
            <label for="flashcard-type-${flashcardIndex}">Flashcard Type:</label>
            <select id="flashcard-type-${flashcardIndex}" onchange="toggleFlashcardType(${flashcardIndex})">
                <option value="simple">Simple Q&A</option>
                <option value="paragraph">Paragraph-based</option>
            </select>
        </div>
        <div class="form-group paragraph-section" id="paragraph-section-${flashcardIndex}" style="display: none;">
            <label for="paragraph-${flashcardIndex}">Paragraph/Content (Optional):</label>
            <textarea id="paragraph-${flashcardIndex}" placeholder="Enter the paragraph or content to study (optional)"></textarea>
        </div>
        <div class="form-group">
            <label for="question-${flashcardIndex}">Question:</label>
            <input type="text" id="question-${flashcardIndex}" placeholder="Enter your question" required>
        </div>
        <div class="form-group">
            <label for="option-a-${flashcardIndex}">Option A:</label>
            <input type="text" id="option-a-${flashcardIndex}" placeholder="Enter option A" required>
        </div>
        <div class="form-group">
            <label for="option-b-${flashcardIndex}">Option B:</label>
            <input type="text" id="option-b-${flashcardIndex}" placeholder="Enter option B" required>
        </div>
        <div class="form-group">
            <label for="option-c-${flashcardIndex}">Option C:</label>
            <input type="text" id="option-c-${flashcardIndex}" placeholder="Enter option C" required>
        </div>
        <div class="form-group">
            <label for="option-d-${flashcardIndex}">Option D:</label>
            <input type="text" id="option-d-${flashcardIndex}" placeholder="Enter option D" required>
        </div>
        <div class="form-group">
            <label for="correct-answer-${flashcardIndex}">Correct Answer:</label>
            <select id="correct-answer-${flashcardIndex}" required>
                <option value="">Select correct answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </div>
        <button type="button" class="remove-flashcard" onclick="removeFlashcard(this)">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
    
    flashcardsList.appendChild(flashcardItem);
}



// Remove flashcard from creation form
function removeFlashcard(button) {
    button.parentElement.remove();
    // Reindex remaining flashcards
    const flashcards = document.querySelectorAll('.flashcard-item');
    flashcards.forEach((flashcard, index) => {
        const flashcardTypeSelect = flashcard.querySelector('select[id^="flashcard-type-"]');
        const paragraphSection = flashcard.querySelector('.paragraph-section');
        const questionInput = flashcard.querySelector('input[id^="question-"]');
        const optionAInput = flashcard.querySelector('input[id^="option-a-"]');
        const optionBInput = flashcard.querySelector('input[id^="option-b-"]');
        const optionCInput = flashcard.querySelector('input[id^="option-c-"]');
        const optionDInput = flashcard.querySelector('input[id^="option-d-"]');
        const correctAnswerSelect = flashcard.querySelector('select[id^="correct-answer-"]');
        const removeButton = flashcard.querySelector('.remove-flashcard');
        
        // Update IDs
        if (flashcardTypeSelect) flashcardTypeSelect.id = `flashcard-type-${index}`;
        if (paragraphSection) paragraphSection.id = `paragraph-section-${index}`;
        if (questionInput) questionInput.id = `question-${index}`;
        if (optionAInput) optionAInput.id = `option-a-${index}`;
        if (optionBInput) optionBInput.id = `option-b-${index}`;
        if (optionCInput) optionCInput.id = `option-c-${index}`;
        if (optionDInput) optionDInput.id = `option-d-${index}`;
        if (correctAnswerSelect) correctAnswerSelect.id = `correct-answer-${index}`;
        removeButton.onclick = () => removeFlashcard(removeButton);
    });
}

// Generate questions and answers from content
function generateQuestionsFromContent(content, numQuestions = 5) {
    const questions = [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    
    // Simple question generation patterns
    const questionPatterns = [
        { type: 'what', pattern: /(\w+)\s+is\s+(\w+)/gi, template: 'What is {1}?' },
        { type: 'who', pattern: /(\w+)\s+(\w+)\s+is\s+(\w+)/gi, template: 'Who is {1} {2}?' },
        { type: 'when', pattern: /(\w+)\s+(\d{4})/gi, template: 'When did {1} happen?' },
        { type: 'where', pattern: /(\w+)\s+in\s+(\w+)/gi, template: 'Where is {1} located?' },
        { type: 'how', pattern: /(\w+)\s+(\w+)\s+(\w+)/gi, template: 'How does {1} {2} work?' }
    ];
    
    // Generate questions based on content
    for (let i = 0; i < Math.min(numQuestions, sentences.length); i++) {
        const sentence = sentences[i].trim();
        if (sentence.length < 10) continue;
        
        // Create a simple question from the sentence
        let question = `Question ${i + 1}: What is the main topic discussed in this content?`;
        let correctAnswer = sentence.substring(0, 100) + (sentence.length > 100 ? '...' : '');
        
        // Generate wrong answers
        const wrongAnswers = [
            'This content discusses a completely different topic.',
            'The main focus is on unrelated subjects.',
            'This passage covers opposite information.',
            'The content is about something else entirely.'
        ];
        
        // Shuffle answers
        const allAnswers = [correctAnswer, ...wrongAnswers];
        const shuffledAnswers = shuffleArray(allAnswers);
        
        questions.push({
            question: question,
            options: shuffledAnswers,
            correctAnswer: String.fromCharCode(65 + shuffledAnswers.indexOf(correctAnswer))
        });
    }
    
    // If we don't have enough questions, create generic ones
    while (questions.length < numQuestions) {
        const genericQuestions = [
            'What is the main topic of this content?',
            'What key information is presented?',
            'What are the important points discussed?',
            'What is the central theme?',
            'What is the primary subject matter?'
        ];
        
        const question = genericQuestions[questions.length] || `Question ${questions.length + 1}: What is discussed in this content?`;
        const correctAnswer = content.substring(0, 80) + (content.length > 80 ? '...' : '');
        
        const wrongAnswers = [
            'This content discusses unrelated topics.',
            'The information presented is different.',
            'This passage covers opposite subjects.',
            'The content is about something else.'
        ];
        
        const allAnswers = [correctAnswer, ...wrongAnswers];
        const shuffledAnswers = shuffleArray(allAnswers);
        
        questions.push({
            question: question,
            options: shuffledAnswers,
            correctAnswer: String.fromCharCode(65 + shuffledAnswers.indexOf(correctAnswer))
        });
    }
    
    return questions;
}

// Topic-based question generator (fallback when no content provided but topic is given)
function generateQuestionsFromTopic(topic, numQuestions = 5) {
    const templates = [
        `What is a key concept of ${topic}?`,
        `Which statement best describes ${topic}?`,
        `Where is ${topic} commonly applied?`,
        `Which of the following relates to ${topic}?`,
        `What is an example use-case of ${topic}?`,
        `Which is true about ${topic}?`,
        `What best defines ${topic}?`
    ];
    const genericAnswers = [
        `A fundamental idea in ${topic}.`,
        `A broadly used aspect of ${topic}.`,
        `An application related to ${topic}.`,
        `A correct description of ${topic}.`
    ];
    const wrongPool = [
        'An unrelated historical event.',
        'A property of marine biology.',
        'A feature of medieval architecture.',
        'A term from culinary arts.'
    ];
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        const q = templates[i % templates.length];
        const correct = genericAnswers[i % genericAnswers.length];
        const wrongs = shuffleArray(wrongPool).slice(0, 3);
        const options = shuffleArray([correct, ...wrongs]);
        questions.push({
            question: q,
            options,
            correctAnswer: String.fromCharCode(65 + options.indexOf(correct))
        });
    }
    return questions;
}

// Save deck
function saveDeck() {
    const title = document.getElementById('deck-title').value.trim();
    const description = document.getElementById('deck-description').value.trim();
    
    if (!title) {
        alert('Please enter a deck title');
        return;
    }
    
    const flashcardItems = document.querySelectorAll('.flashcard-item');
    
    if (flashcardItems.length === 0) {
        alert('Please add at least one flashcard');
        return;
    }

    const cards = [];
    flashcardItems.forEach(item => {
        const topic = (item.querySelector('input[type="text"]')?.value || '').trim();
        const content = (item.querySelector('textarea')?.value || '').trim();
        const numQuestions = parseInt(item.querySelector('select')?.value || '5', 10);

        let questions = [];
        if (content) {
            questions = generateQuestionsFromContent(content, numQuestions);
            cards.push({ content, questions });
        } else if (topic) {
            questions = generateQuestionsFromTopic(topic, numQuestions);
            cards.push({ topic, questions });
        }
    });

    if (cards.length === 0) {
        alert('Please provide topic or content for at least one item');
        return;
    }
    
    currentDeck = {
        title,
        description,
        cards: cards
    };
    
    // Save to localStorage
    const savedDecks = JSON.parse(localStorage.getItem('flashcardDecks') || '[]');
    savedDecks.push(currentDeck);
    localStorage.setItem('flashcardDecks', JSON.stringify(savedDecks));
    
    showScreen('study-screen');
    updateStudyDisplay();
    
    // Clear form
    document.getElementById('deck-title').value = '';
    document.getElementById('deck-description').value = '';
    document.getElementById('flashcards-list').innerHTML = '';
    loadSavedDecks(); // Refresh the deck list after saving
}

// Reset study mode
function resetStudyMode() {
    currentCardIndex = 0;
    isCardFlipped = false;
    updateStudyDisplay();
}

// Update study display
function updateStudyDisplay() {
	if (!currentDeck || currentDeck.cards.length === 0) return;
	
	// Update deck title
	document.getElementById('current-deck-name').textContent = currentDeck.title;
	
	// Update progress
	const progressText = document.getElementById('progress-text');
	const progressFill = document.getElementById('progress-fill');
	const progress = ((currentCardIndex + 1) / currentDeck.cards.length) * 100;
	
	progressText.textContent = `Card ${currentCardIndex + 1} of ${currentDeck.cards.length}`;
	progressFill.style.width = `${progress}%`;
	
	// Update card content
	const currentCard = currentDeck.cards[currentCardIndex];
	
	// For prebuilt decks, show title/description as study content
	if (currentDeck === prebuiltDecks.gk || currentDeck === prebuiltDecks.ai) {
		const frontText = currentDeck.title;
		const backText = currentDeck.description || currentDeck.title;
		document.getElementById('card-question').textContent = frontText;
		document.getElementById('card-answer').textContent = backText;
	} else if (currentCard.content) {
		// New structure: show content on both front and back
		document.getElementById('card-question').textContent = currentCard.content;
		document.getElementById('card-answer').textContent = currentCard.content;
	} else if (currentCard.answer) {
		// Sample deck: show the passage on both sides
		document.getElementById('card-question').textContent = currentCard.question;
		document.getElementById('card-answer').textContent = currentCard.answer;
	} else if (currentCard.topic) {
		// Topic-based cards: show topic on front, a sample detail on back
		document.getElementById('card-question').textContent = currentCard.topic;
		document.getElementById('card-answer').textContent = currentCard.questions[0]?.question || currentCard.topic;
	} else {
		// Fallback for old structure
		document.getElementById('card-question').textContent = currentCard.question || 'Content not available';
		document.getElementById('card-answer').textContent = currentCard.question || 'Content not available';
	}
	
	// Reset card flip state
	isCardFlipped = false;
	document.querySelector('.card-front').classList.remove('hidden');
	document.querySelector('.card-back').classList.add('hidden');
}

// Flip card
function flipCard() {
    isCardFlipped = !isCardFlipped;
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    
    if (isCardFlipped) {
        cardFront.classList.add('hidden');
        cardBack.classList.remove('hidden');
    } else {
        cardFront.classList.remove('hidden');
        cardBack.classList.add('hidden');
    }
}

// Navigate to previous card
function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateStudyDisplay();
    }
}

// Navigate to next card
function nextCard() {
    if (currentCardIndex < currentDeck.cards.length - 1) {
        currentCardIndex++;
        updateStudyDisplay();
    }
}

// Clear any active question timer
function clearQuestionTimer() {
	if (questionTimer) {
		clearInterval(questionTimer);
		questionTimer = null;
	}
}

// Update the timer UI text
function updateTimerDisplay() {
	let timerEl = document.getElementById('quiz-timer');
	if (!timerEl) {
		// Create a timer element next to progress/score if it doesn't exist
		const progressEl = document.getElementById('quiz-progress');
		if (progressEl && progressEl.parentElement) {
			timerEl = document.createElement('div');
			timerEl.id = 'quiz-timer';
			timerEl.style.marginLeft = 'auto';
			timerEl.style.fontWeight = '600';
			progressEl.parentElement.appendChild(timerEl);
		}
	}
	if (timerEl) {
		timerEl.textContent = `Time: ${remainingSeconds}s`;
	}
}

// Handle time up: reveal correct answer and show feedback/next
function handleTimeUp() {
	const question = quizQuestions[currentQuestionIndex];
	const options = document.querySelectorAll('.quiz-option');
	const feedback = document.getElementById('quiz-feedback');
	const feedbackIcon = document.getElementById('feedback-icon');
	const feedbackText = document.getElementById('feedback-text');
	const feedbackExplanation = document.getElementById('feedback-explanation');
	
	// Disable clicks
	options.forEach(option => { option.style.pointerEvents = 'none'; });
	
	// Highlight correct option
	const correctText = stripLabel(question.correctAnswer);
	options.forEach(option => {
		if (option.dataset.value === correctText || option.dataset.correct === 'true') {
			option.classList.add('correct');
		}
	});
	
	// Feedback
	feedbackIcon.className = 'feedback-icon fas fa-clock incorrect';
	feedbackText.textContent = 'Time up';
	feedbackText.className = 'incorrect';
	feedbackExplanation.textContent = `The correct answer is: ${correctText}`;
	feedback.classList.remove('hidden');
	
	// Show next/finish
	if (currentQuestionIndex < quizQuestions.length - 1) {
		document.getElementById('next-question-btn').classList.remove('hidden');
	} else {
		document.getElementById('finish-quiz-btn').classList.remove('hidden');
	}
}

// Start countdown for the current question
function startQuestionTimer() {
	clearQuestionTimer();
	remainingSeconds = QUESTION_TIME_LIMIT_SECS;
	updateTimerDisplay();
	questionTimer = setInterval(() => {
		remainingSeconds--;
		updateTimerDisplay();
		if (remainingSeconds <= 0) {
			clearQuestionTimer();
			handleTimeUp();
		}
	}, 1000);
}

// Start quiz
function startQuiz() {
	if (!currentDeck || currentDeck.cards.length === 0) return;

	if (currentDeck === prebuiltDecks.gk || currentDeck === prebuiltDecks.ai) {
		// Normalize prebuilt questions to labeled options and labeled correct answer
		const labels = ['A', 'B', 'C', 'D'];
		quizQuestions = currentDeck.cards.flatMap(c => c.questions).map(q => {
			const labeledOptions = (q.options || []).map((text, idx) => `${labels[idx]}. ${text}`);
			let correctIndex = 0;
			if (typeof q.correctAnswer === 'string' && q.correctAnswer.length === 1) {
				correctIndex = q.correctAnswer.charCodeAt(0) - 65;
			} else if (typeof q.correctAnswer === 'number') {
				correctIndex = q.correctAnswer;
			} else {
				// Fallback: assume first option is correct
				correctIndex = 0;
			}
			const labeledCorrect = labeledOptions[correctIndex] || labeledOptions[0] || '';
			return {
				question: q.question,
				options: labeledOptions,
				correctAnswer: labeledCorrect
			};
		});
	} else if (currentDeck.cards[0].questions) {
		quizQuestions = currentDeck.cards.flatMap(c => c.questions);
	} else if (currentDeck.cards[0].options) {
		quizQuestions = currentDeck.cards.map(card => ({
			question: card.question,
			correctAnswer: `${card.correctAnswer}. ${card.options[card.correctAnswer.charCodeAt(0) - 65]}`,
			options: card.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`)
		}));
	} else {
		quizQuestions = [...elonQuiz];
	}
	
	currentQuestionIndex = 0;
	quizScore = 0;
	quizStartTime = new Date();
	
	showScreen('quiz-screen');
	displayQuizQuestion();
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Display quiz question (keep A–D fixed, shuffle only the answer texts)
function displayQuizQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        finishQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    
    // Update quiz info
    document.getElementById('quiz-progress').textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('quiz-score').textContent = `Score: ${quizScore}/${currentQuestionIndex}`;
    
    // Update question text
    document.getElementById('quiz-question-text').textContent = question.question;
    
    // Extract answer texts without labels, shuffle them
    const answerTexts = (question.options || []).map(stripLabel);
    const correctAnswerText = stripLabel(question.correctAnswer);
    const shuffledAnswerTexts = shuffleArray(answerTexts);
    
    // Render options with fixed labels A-D
    const labels = ['A', 'B', 'C', 'D'];
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    shuffledAnswerTexts.forEach((text, idx) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = `${labels[idx]}. ${text}`;
        optionElement.dataset.value = text;
        optionElement.dataset.correct = (text === correctAnswerText).toString();
        optionElement.onclick = () => selectAnswer(optionElement);
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide feedback and next/finish buttons
    document.getElementById('quiz-feedback').classList.add('hidden');
    document.getElementById('next-question-btn').classList.add('hidden');
    document.getElementById('finish-quiz-btn').classList.add('hidden');
    
    // Start 30s timer for this question
    startQuestionTimer();
}

// Select answer in quiz (uses dataset flags)
function selectAnswer(selectedElement) {
    clearQuestionTimer();
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackExplanation = document.getElementById('feedback-explanation');
    
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    const isCorrect = selectedElement.dataset.correct === 'true';
    if (isCorrect) quizScore++;
    
    // Apply styles: show correct one, mark selected incorrect if needed
    options.forEach(option => {
        if (option.dataset.correct === 'true') {
            option.classList.add('correct');
        } else if (option === selectedElement && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Feedback
    const correctText = stripLabel(question.correctAnswer);
    feedbackIcon.className = `feedback-icon fas ${isCorrect ? 'fa-check-circle correct' : 'fa-times-circle incorrect'}`;
    feedbackText.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    feedbackText.className = isCorrect ? 'correct' : 'incorrect';
    feedbackExplanation.textContent = `The correct answer is: ${correctText}`;
    feedback.classList.remove('hidden');
    
    // Show next/finish
    if (currentQuestionIndex < quizQuestions.length - 1) {
        document.getElementById('next-question-btn').classList.remove('hidden');
    } else {
        document.getElementById('finish-quiz-btn').classList.remove('hidden');
    }
}

// Next question
function nextQuestion() {
    clearQuestionTimer();
    currentQuestionIndex++;
    displayQuizQuestion();
}

// Finish quiz
function finishQuiz() {
    clearQuestionTimer();
    quizEndTime = new Date();
    const timeElapsed = quizEndTime - quizStartTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    document.getElementById('final-score').textContent = `${quizScore}/${quizQuestions.length}`;
    document.getElementById('final-percentage').textContent = `${percentage}%`;
    document.getElementById('final-time').textContent = timeString;
    
    const resultsMessage = document.getElementById('results-message');
    if (percentage >= 90) {
        resultsMessage.textContent = 'Excellent! You\'ve mastered this topic!';
    } else if (percentage >= 80) {
        resultsMessage.textContent = 'Great job! You\'re making excellent progress.';
    } else if (percentage >= 70) {
        resultsMessage.textContent = 'Good work! Keep studying to improve further.';
    } else if (percentage >= 60) {
        resultsMessage.textContent = 'Not bad! Review the material and try again.';
    } else {
        resultsMessage.textContent = 'Keep practicing! Review the flashcards and try the quiz again.';
    }
    
    showScreen('results-screen');
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return;
    
    const screenId = activeScreen.id;
    
    if (screenId === 'study-screen') {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                previousCard();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextCard();
                break;
            case ' ':
            case 'Enter':
                event.preventDefault();
                flipCard();
                break;
        }
    } else if (screenId === 'quiz-screen') {
        if (event.key >= '1' && event.key <= '4') {
            const options = document.querySelectorAll('.quiz-option');
            const index = parseInt(event.key) - 1;
            if (options[index]) {
                options[index].click();
            }
        }
    }
});

// Simple auth storage keys
const AUTH_USER_KEY = 'fc_user';
const AUTH_USERS_KEY = 'fc_users_map';

function getUsersMap() {
	try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '{}'); } catch { return {}; }
}

function setUsersMap(map) {
	localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(map));
}

function saveCurrentUser(user) {
	localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function getCurrentUser() {
	try { return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null'); } catch { return null; }
}

function clearCurrentUser() {
	localStorage.removeItem(AUTH_USER_KEY);
}

// Update greeting from username
function refreshUserGreeting() {
	try {
		const data = getCurrentUser();
		const greetP = document.getElementById('user-greeting');
		const greetName = document.getElementById('user-greeting-name');
		if (data && data.name) {
			if (greetP) greetP.style.display = '';
			if (greetName) greetName.textContent = data.name;
		} else {
			if (greetP) greetP.style.display = 'none';
		}
	} catch (e) {
		const greetP = document.getElementById('user-greeting');
		if (greetP) greetP.style.display = 'none';
	}
}

// Login history utils
function appendLoginHistory(entry) {
	const key = 'fc_login_history';
	const list = JSON.parse(localStorage.getItem(key) || '[]');
	list.unshift(entry);
	localStorage.setItem(key, JSON.stringify(list.slice(0, 100)));
}

function getLoginHistory() {
	try { return JSON.parse(localStorage.getItem('fc_login_history') || '[]'); } catch { return []; }
}

function renderLoginHistory() {
	const container = document.getElementById('login-history-list');
	if (!container) return;
	const entries = getLoginHistory();
	if (entries.length === 0) {
		container.innerHTML = '<p>No login entries yet.</p>';
		return;
	}
	const html = entries.map(e => {
		const date = new Date(e.ts).toLocaleString();
		return `<div class="deck-item"><div class="deck-info"><h4>${e.name} <small style="font-weight:400;opacity:0.8;">(${e.standard})</small></h4><p>${date}</p></div></div>`;
	}).join('');
	container.innerHTML = html;
}

function clearLoginHistory() {
	if (confirm('Clear all login history?')) {
		localStorage.removeItem('fc_login_history');
		renderLoginHistory();
	}
}

// Override showScreen to refresh greeting and history where needed
const __origShowScreen = showScreen;
showScreen = function(screenId) {
	__origShowScreen(screenId);
	if (screenId === 'welcome-screen') {
		refreshUserGreeting();
	} else if (screenId === 'history-screen') {
		renderLoginHistory();
	}
};

function setText(el, text){ if (!el) return; el.textContent = text; el.style.display = text ? '' : 'none'; }

function handleLogin() {
	const err = document.getElementById('login-error');
	setText(err, '');
	const name = (document.getElementById('login-username')?.value || '').trim();
	const password = (document.getElementById('login-password')?.value || '').trim();
	if (!name || !password) { setText(err, 'Please enter username and password'); return; }
	const users = getUsersMap();
	if (users[name]) {
		if (users[name].password !== password) { setText(err, 'Incorrect password'); return; }
	} else {
		setText(err, 'User not approved yet. Please register and wait for approval.'); return;
	}
	const user = { name };
	saveCurrentUser(user);
	appendLoginHistory({ name, ts: Date.now() });
	// clear fields after success
	['login-username','login-password'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
	showScreen('welcome-screen');
	refreshUserGreeting();
}

function showLoginForm() {
	const choice = document.getElementById('login-choice-buttons');
	if (choice) choice.style.display = 'none';
	const grid = document.querySelector('.forms-grid');
	if (grid) grid.style.display = '';
	document.getElementById('register-form').style.display = 'none';
	document.getElementById('reset-form').style.display = 'none';
	document.getElementById('login-form').style.display = '';
	setText(document.getElementById('login-error'), '');
}
function showRegisterForm() {
	const choice = document.getElementById('login-choice-buttons');
	if (choice) choice.style.display = 'none';
	const grid = document.querySelector('.forms-grid');
	if (grid) grid.style.display = '';
	document.getElementById('login-form').style.display = 'none';
	document.getElementById('reset-form').style.display = 'none';
	document.getElementById('register-form').style.display = '';
	setText(document.getElementById('register-error'), '');
}

function handleRegisterRequest() {
	const err = document.getElementById('register-error');
	setText(err, '');
	const name = (document.getElementById('reg-username')?.value || '').trim();
	const password = (document.getElementById('reg-password')?.value || '').trim();
	const confirm = (document.getElementById('reg-confirm')?.value || '').trim();
	if (!name || !password || !confirm) { setText(err, 'Please fill username, password and confirm password'); return; }
	if (password !== confirm) { setText(err, 'Passwords do not match'); return; }
	const users = getUsersMap();
	if (users[name]) { setText(err, 'Username already exists. Please login instead.'); return; }
	const reqs = getRequests();
	if (reqs.some(r => r.name === name)) { setText(err, 'A request with this username is already pending.'); return; }
	reqs.unshift({ name, password, ts: Date.now(), type: 'register' });
	setRequests(reqs);
	setText(err, 'Registration request submitted. Please wait for approval.');
	['reg-username','reg-password','reg-confirm'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
}

// Admin-only shortcuts
document.addEventListener('keydown', function(e) {
	// Ctrl+Shift+L -> Login History
	if (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
		e.preventDefault();
		const pinRaw = prompt('Enter admin PIN to view login history:');
		const pin = (pinRaw || '').trim();
		if (!pinRaw) return;
		if (pin === ADMIN_PIN) {
			showScreen('history-screen');
			renderLoginHistory();
		} else {
			alert('Incorrect PIN');
		}
	}
	// Ctrl+Shift+U -> User Requests (approvals)
	if (e.ctrlKey && e.shiftKey && (e.key === 'u' || e.key === 'U')) {
		e.preventDefault();
		const pinRaw = prompt('Enter admin PIN to view registration requests:');
		const pin = (pinRaw || '').trim();
		if (!pinRaw) return;
		if (pin === ADMIN_PIN) {
			showScreen('requests-screen');
			renderRequests();
		} else {
			alert('Incorrect PIN');
		}
	}
});

function handleLogout() {
	clearCurrentUser();
	const lu = document.getElementById('login-username');
	const lp = document.getElementById('login-password');
	if (lu) lu.value = '';
	if (lp) lp.value = '';
	showScreen('login-screen');
	document.getElementById('login-form').style.display = 'none';
	document.getElementById('register-form').style.display = 'none';
	const choice = document.getElementById('login-choice-buttons');
	if (choice) choice.style.display = '';
}

// Personalize results header
const _finishQuiz = finishQuiz;
finishQuiz = function() {
	clearQuestionTimer();
	quizEndTime = new Date();
	const timeElapsed = quizEndTime - quizStartTime;
	const minutes = Math.floor(timeElapsed / 60000);
	const seconds = Math.floor((timeElapsed % 60000) / 1000);
	const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
	
	const percentage = Math.round((quizScore / quizQuestions.length) * 100);
	
	document.getElementById('final-score').textContent = `${quizScore}/${quizQuestions.length}`;
	document.getElementById('final-percentage').textContent = `${percentage}%`;
	document.getElementById('final-time').textContent = timeString;
	
	const resultsMessage = document.getElementById('results-message');
	if (percentage >= 90) {
		resultsMessage.textContent = 'Excellent! You\'ve mastered this topic!';
	} else if (percentage >= 80) {
		resultsMessage.textContent = 'Great job! You\'re making excellent progress.';
	} else if (percentage >= 70) {
		resultsMessage.textContent = 'Good work! Keep studying to improve further.';
	} else if (percentage >= 60) {
		resultsMessage.textContent = 'Not bad! Review the material and try again.';
	} else {
		resultsMessage.textContent = 'Keep practicing! Review the flashcards and try the quiz again.';
	}
	
	showScreen('results-screen');
};

// Boot screen always to login
function bootToInitialScreen() {
	showScreen('login-screen');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
	bootToInitialScreen();
	refreshUserGreeting();
	addFlashcard();
	addFlashcard();
	loadSavedDecks();
});

// Admin PIN for admin-only screens
// const ADMIN_PIN = '1234';

// Requests storage
const REQ_KEY = 'fc_reg_requests';

function getRequests() {
	try { return JSON.parse(localStorage.getItem(REQ_KEY) || '[]'); } catch { return []; }
}
function setRequests(list) {
	localStorage.setItem(REQ_KEY, JSON.stringify(list));
}
function clearRequests() {
	if (confirm('Clear all registration requests?')) {
		localStorage.removeItem(REQ_KEY);
		renderRequests();
	}
}

function renderRequests() {
	const container = document.getElementById('requests-list');
	if (!container) return;
	const reqs = getRequests();
	if (reqs.length === 0) {
		container.innerHTML = '<p>No pending requests.</p>';
		return;
	}
	container.innerHTML = reqs.map((r, idx) => {
		const date = new Date(r.ts).toLocaleString();
		const typeClass = r.type === 'register' ? 'primary' : 'warning'; // Different colors for types
		return `<div class=\"deck-item\"><div class=\"deck-info\"><h4>${r.name} <small style="font-weight:400;opacity:0.8;">(${r.type.toUpperCase()})</small></h4><p>${date}</p></div><div class=\"deck-actions\"><button class=\"btn btn-${typeClass}\" onclick=\"approveRequest(${idx})\"><i class=\"fas fa-check\"></i> Approve</button><button class=\"btn btn-danger\" onclick=\"rejectRequest(${idx})\"><i class=\"fas fa-times\"></i> Reject</button></div></div>`;
	}).join('');
}

function approveRequest(index) {
	const reqs = getRequests();
	const r = reqs[index];
	if (!r) return;
	const users = getUsersMap();
	if (users[r.name]) {
		alert('User already exists.');
	} else {
		users[r.name] = { password: r.password };
		setUsersMap(users);
	}
	reqs.splice(index, 1);
	setRequests(reqs);
	renderRequests();
	alert('User approved. They can now log in.');
}

function rejectRequest(index) {
	const reqs = getRequests();
	reqs.splice(index, 1);
	setRequests(reqs);
	renderRequests();
}

function showUserRequests() {
	const pinRaw = prompt('Enter admin PIN to view registration requests:');
	const pin = (pinRaw || '').trim();
	if (!pinRaw) return; // cancelled
	if (pin === ADMIN_PIN) {
		showScreen('requests-screen');
		renderRequests();
	} else {
		alert('Incorrect PIN');
	}
}

// History button remains admin gated
function showHistory() {
	const pinRaw = prompt('Enter admin PIN to view login history:');
	const pin = (pinRaw || '').trim();
	if (!pinRaw) return; // cancelled
	if (pin === ADMIN_PIN) {
		showScreen('history-screen');
		renderLoginHistory();
	} else {
		alert('Incorrect PIN');
	}
} 

function backToLoginChoice() {
	const grid = document.querySelector('.forms-grid');
	if (grid) grid.style.display = 'none';
	document.getElementById('login-form').style.display = 'none';
	document.getElementById('register-form').style.display = 'none';
	document.getElementById('reset-form').style.display = 'none';
	const choice = document.getElementById('login-choice-buttons');
	if (choice) choice.style.display = '';
	setText(document.getElementById('login-error'), '');
	setText(document.getElementById('register-error'), '');
	setText(document.getElementById('reset-error'), '');
	// clear inputs
	['login-username','login-password','reg-username','reg-password','reg-confirm','reset-username','reset-password','reset-confirm'].forEach(id=>{
		const el = document.getElementById(id);
		if (el) el.value = '';
	});
} 

function showResetForm() {
	const choice = document.getElementById('login-choice-buttons');
	if (choice) choice.style.display = 'none';
	const grid = document.querySelector('.forms-grid');
	if (grid) grid.style.display = '';
	document.getElementById('login-form').style.display = 'none';
	document.getElementById('register-form').style.display = 'none';
	document.getElementById('reset-form').style.display = '';
	setText(document.getElementById('reset-error'), '');
}

function handleResetRequest() {
	const err = document.getElementById('reset-error');
	setText(err, '');
	const name = (document.getElementById('reset-username')?.value || '').trim();
	const password = (document.getElementById('reset-password')?.value || '').trim();
	const confirm = (document.getElementById('reset-confirm')?.value || '').trim();
	if (!name || !password || !confirm) { setText(err, 'Please fill username, new password and confirm password'); return; }
	if (password !== confirm) { setText(err, 'Passwords do not match'); return; }
	const users = getUsersMap();
	if (!users[name]) { setText(err, 'Username not found. Please register.'); return; }
	const reqs = getRequests();
	reqs.unshift({ name, password, ts: Date.now(), type: 'reset' });
	setRequests(reqs);
	setText(err, 'Password reset request submitted. Please wait for approval.');
	['reset-username','reset-password','reset-confirm'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
} 

// ===== Active Users Tracking (Admin) =====
const ACTIVE_USERS_KEY = 'fc_active_users';
function getActiveUsersMap() {
	try { return JSON.parse(localStorage.getItem(ACTIVE_USERS_KEY) || '{}'); } catch { return {}; }
}
function setActiveUsersMap(map) {
	localStorage.setItem(ACTIVE_USERS_KEY, JSON.stringify(map));
}
function markUserActive(name) {
	const map = getActiveUsersMap();
	map[name] = { lastSeen: Date.now() };
	setActiveUsersMap(map);
}
function removeActiveUser(name) {
	const map = getActiveUsersMap();
	if (map[name]) { delete map[name]; setActiveUsersMap(map); }
}
let __activeHeartbeat = null;
function startActiveHeartbeat(name) {
	stopActiveHeartbeat();
	markUserActive(name);
	__activeHeartbeat = setInterval(() => markUserActive(name), 30000);
}
function stopActiveHeartbeat() {
	if (__activeHeartbeat) { clearInterval(__activeHeartbeat); __activeHeartbeat = null; }
}
window.addEventListener('beforeunload', () => {
	const u = getCurrentUser();
	if (u?.name) markUserActive(u.name);
});

// Admin shortcut to open Active Users page
document.addEventListener('keydown', function(e) {
	if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
		e.preventDefault();
		const pinRaw = prompt('Enter admin PIN to view active users:');
		const pin = (pinRaw || '').trim();
		if (!pinRaw) return;
		if (pin === ADMIN_PIN) {
			window.open('active.html', '_blank');
		} else {
			alert('Incorrect PIN');
		}
	}
}); 