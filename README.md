# Flashcard Quiz Game

A modern, interactive web-based flashcard application that helps users study any topic using digital flashcards and quiz modes.

## Features

### 🎯 **Study Mode**
- Interactive flashcards with flip animation
- Progress tracking with visual progress bar
- Keyboard navigation (arrow keys to navigate, space/enter to flip)
- Smooth transitions between cards

### 📝 **Create Your Own Decks**
- Easy-to-use form to create custom flashcard decks
- Add unlimited flashcards to each deck
- Save decks to browser localStorage
- Remove flashcards with one click

### 🧠 **Quiz Mode**
- Multiple choice questions generated from your flashcards
- Randomized question order and answer options
- Real-time score tracking
- Immediate feedback on answers
- Timer to track study sessions

### 📊 **Results & Analytics**
- Detailed quiz results with score and percentage
- Time tracking for study sessions
- Motivational feedback based on performance
- Progress visualization

### 🎨 **Modern UI/UX**
- Beautiful gradient design
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation
- Font Awesome icons

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. Choose to either:
   - **Try Sample Deck**: Start with a pre-made general knowledge deck
   - **Create New Deck**: Build your own custom flashcard deck

### Creating Your Own Deck
1. Click "Create New Deck"
2. Enter a title and description for your deck
3. Add flashcards by clicking "Add Flashcard"
4. Fill in the question and answer for each card
5. Remove unwanted cards using the "Remove" button
6. Click "Save Deck" when finished

### Studying with Flashcards
1. Navigate through cards using Previous/Next buttons
2. Click "Show Answer" to reveal the answer
3. Use keyboard shortcuts:
   - **Left Arrow**: Previous card
   - **Right Arrow**: Next card
   - **Space/Enter**: Flip card
4. Click "Start Quiz" when ready to test your knowledge

### Taking Quizzes
1. Questions are automatically generated from your flashcards
2. Choose from multiple choice options
3. Get immediate feedback on your answers
4. Track your score in real-time
5. Review your final results and performance

## Technical Details

### Files Structure
```
project/
├── index.html      # Main HTML file
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript functionality
├── launch.json     # VS Code debug configuration
└── README.md       # This file
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and state management
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family
- **LocalStorage**: Data persistence

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Sample Content

The app includes a sample "General Knowledge" deck with 8 flashcards covering:
- Geography (capitals, continents, oceans)
- Science (planets, chemistry, animals)
- History (World War II)
- Art (famous paintings)

## Customization

### Adding More Sample Decks
Edit the `sampleDeck` object in `script.js` to add more pre-made decks.

### Styling Changes
Modify `styles.css` to customize colors, fonts, and layout.

### Feature Extensions
The modular JavaScript code makes it easy to add features like:
- Export/import decks
- Different quiz types
- Study statistics
- Audio support
- Image support for flashcards

## Running the Application

### Method 1: Direct File Opening
Simply double-click `index.html` to open it in your default browser.

### Method 2: Local Server (Recommended)
For the best experience, serve the files through a local web server:

```bash
# Using Python 3
python -m http.server 8080

# Using Python 2
python -m SimpleHTTPServer 8080

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

### Method 3: VS Code Live Server
If using VS Code, install the "Live Server" extension and right-click `index.html` to "Open with Live Server".

## Data Storage

All flashcard decks are saved in your browser's localStorage, so:
- Your data persists between sessions
- Data is stored locally on your device
- No internet connection required
- Data is private and secure

## Keyboard Shortcuts

### Study Mode
- **←**: Previous card
- **→**: Next card
- **Space/Enter**: Flip card

### Quiz Mode
- **1-4**: Select answer option

## Future Enhancements

Potential features for future versions:
- Cloud storage and sync
- Collaborative decks
- Spaced repetition algorithm
- Audio pronunciation
- Image and media support
- Advanced analytics
- Export to PDF/CSV
- Mobile app version

## Contributing

Feel free to fork this project and add your own features or improvements!

## License

This project is open source and available under the MIT License. 