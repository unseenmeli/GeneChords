# 🎸 AI Guitar Chord Generator

An AI-powered mobile app that generates guitar chord progressions based on user prompts, complete with strumming patterns and audio playback.

---

## 📋 Project Roadmap

### **Phase 1: Authentication & Database Setup**
- [ ] Set up InstantDB account and project
- [ ] Install InstantDB SDK in React Native app
- [ ] Configure InstantDB schema (users, progressions, favorites)
- [ ] Implement Magic Auth (email-based authentication)
- [ ] Create authentication screens (login/signup)
- [ ] Add sign out functionality
- [ ] Test auth flow end-to-end

### **Phase 2: UI Scaffolding**
- [ ] Design app navigation structure (Expo Router)
- [ ] Create home screen with prompt input
- [ ] Build chord progression display component
  - [ ] Chord name display
  - [ ] Chord diagram visualization
  - [ ] Strumming pattern display
- [ ] Create user profile screen
- [ ] Add progression history screen
- [ ] Build favorites/saved progressions screen
- [ ] Design loading states and placeholders
- [ ] Add basic styling with Tailwind/NativeWind
- [ ] Implement sign out button in settings/profile

**Note**: At this stage, buttons are non-functional except sign out.

---

### **Phase 3: ML Backend Server (Separate Git Project)**

#### 3.1 Project Setup
- [ ] Create new Git repository for backend
- [ ] Initialize Node.js project (`npm init`)
- [ ] Set up project structure (routes, models, utils)
- [ ] Install dependencies (Express, TensorFlow.js/ML libraries)
- [ ] Configure environment variables
- [ ] Set up CORS for React Native communication

#### 3.2 Dataset Preparation
- [ ] Research and gather chord progression datasets
  - Sources: Ultimate Guitar, Hooktheory, user submissions
  - Target: 1,000-10,000 progressions
- [ ] Clean and format data into standardized format
  ```json
  {
    "progression": ["Em", "C", "G", "D"],
    "key": "E Minor",
    "genre": "rock",
    "mood": ["nostalgic", "energetic"]
  }
  ```
- [ ] Create training/validation/test splits
- [ ] Normalize chord naming conventions

#### 3.3 ML Model Development
- [ ] **Option A: Markov Chain Model**
  - [ ] Implement transition probability matrix
  - [ ] Train on chord sequence data
  - [ ] Add genre/mood conditioning
  - [ ] Export model weights

- [ ] **Option B: LSTM/RNN Model**
  - [ ] Design model architecture (TensorFlow.js or brain.js)
  - [ ] Implement training pipeline
  - [ ] Train model on chord sequences
  - [ ] Save trained model weights

- [ ] Test model outputs for musical validity
- [ ] Implement temperature/creativity parameter
- [ ] Add chord filtering (remove unplayable chords)

#### 3.4 Strumming Pattern Generation
- [ ] Create genre-based strumming pattern database
- [ ] Map moods to strumming styles
  - Fast/aggressive: d-d-u-u-d-u
  - Slow/nostalgic: d---d-u-d-u-
- [ ] Implement pattern selection logic
- [ ] Add rhythm notation output

#### 3.5 API Endpoints
- [ ] `POST /api/generate` - Generate chord progression
  ```json
  Request: {
    "prompt": "Nostalgic yet fierce rock chord progression for E Minor",
    "userId": "user_123"
  }
  Response: {
    "progression": ["Em", "C", "Am", "D"],
    "strummingPattern": "d-d-u-u-d-u",
    "bpm": 120,
    "key": "E Minor"
  }
  ```
- [ ] `GET /api/health` - Health check
- [ ] Add rate limiting
- [ ] Implement error handling and validation

#### 3.6 Deployment
- [ ] Choose hosting platform (Render, Railway, Fly.io, Vercel)
- [ ] Set up production environment
- [ ] Deploy backend server
- [ ] Configure production database (if needed)
- [ ] Set up monitoring/logging

---

### **Phase 4: Integration & Features**

#### 4.1 Connect App to Backend
- [ ] Add API client utilities in React Native
- [ ] Configure backend URL (env variables)
- [ ] Implement error handling for network requests
- [ ] Add retry logic and timeout handling
- [ ] Test connection between app and server

#### 4.2 Wire Up Generation Flow
- [ ] Connect prompt input to `/api/generate` endpoint
- [ ] Parse and display generated progressions
- [ ] Show loading states during generation
- [ ] Handle and display errors gracefully
- [ ] Add success animations/feedback

#### 4.3 Chord Visualization
- [ ] Build chord diagram component (SVG)
- [ ] Display finger positions on fretboard
- [ ] Show chord transitions with animations
- [ ] Add chord name labels
- [ ] Implement responsive layout

#### 4.4 Save & History Features
- [ ] Save generated progressions to InstantDB
- [ ] Display user's progression history
- [ ] Implement favorites/bookmark system
- [ ] Add share functionality
- [ ] Allow editing/customizing progressions

#### 4.5 Audio Playback (Stretch Goal)
- [ ] Research audio libraries (expo-av, react-native-sound)
- [ ] Find/create guitar chord audio samples
- [ ] Implement audio player component
- [ ] Add strumming pattern playback
- [ ] Control tempo/BPM
- [ ] Add play/pause/stop controls
- [ ] Implement looping functionality

---

## 🛠 Tech Stack

### Frontend (React Native)
- **Framework**: Expo / React Native
- **Routing**: Expo Router
- **Styling**: Tailwind CSS (NativeWind)
- **Database**: InstantDB (real-time DB + auth)
- **Audio**: expo-av or react-native-sound

### Backend (Node.js)
- **Runtime**: Node.js
- **Framework**: Express.js
- **ML Library**: TensorFlow.js or brain.js
- **Deployment**: Render / Railway / Fly.io

### ML Model
- **Approach**: Markov Chain or LSTM/RNN
- **Training**: Node.js/Python
- **Format**: JSON weights or TensorFlow.js model

---

## 📦 Installation

### Frontend
```bash
cd FuzzyV2
npm install
npm start
```

### Backend (TBD - separate repo)
```bash
cd chord-generator-server
npm install
npm run dev
```

---

## 🎯 Current Phase

**Phase 1: Authentication & Database Setup** ✅ (Starting now!)

---

## 📝 Notes

- UI can be built in parallel with backend development
- Model training can happen independently
- Start simple (Markov Chain) and upgrade to LSTM if needed
- Audio playback is optional - focus on core generation first

---

## 🤝 Contributing

This is a solo project for now, but open to collaboration!

---

## 📄 License

TBD
