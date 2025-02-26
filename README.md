# HR Investigator Game

## Overview

**HR Investigator** is an interactive simulation game built with **React** and **TypeScript**. Players step into the role of an HR detective, reviewing various compliance cases and making verdicts based on the information provided. After each decision, the game provides AI-powered feedback to help players learn from their choices. The AI feedback is generated using a local **Ollama model** to offer expert insights.

## Code Architecture

The game follows a simple architecture focused on the front-end user experience. Here's a breakdown of the project:

### Key Components:

- **GameBoard.tsx**: The heart of the game. This file handles:
  - **Fetching Random Cases**: Displays a randomly selected HR case from the predefined list.
  - **User Interaction**: Handles the player's verdicts, including "Guilty" and "Not Guilty" buttons.
  - **AI Feedback**: Sends the player's verdict and case details to the local Ollama model for analysis and feedback.
  - **State Management**: Uses React's `useState` hooks to manage case details, verdicts, and feedback.

- **App.tsx**: Serves as the main entry point that renders the `GameBoard` component.

- **CaseReport.css**: Provides styling for the layout of the case report, verdict buttons, feedback, and the overall the main game design.

### Flow of the Game:
1. **Fetch Case**: Click the "Get a New Case" button to fetch a new case.
2. **Make Verdict**: Review the case details and select either "Guilty" or "Not Guilty".
3. **AI Feedback**: After the verdict is submitted, the AI analyzes the decision and provides feedback.
4. **Next Case**: The game either fetches a new case or ends the session.

### Game Component - `GameBoard.tsx`:
- Manages the game logic, including fetching random cases, handling verdicts, and fetching AI-generated feedback.
- The AI feedback is fetched using a `POST` request to the local Ollama API.

## Technical Decisions

### 1. **Why React + TypeScript?**
- **React** offers a component-based architecture ideal for interactive UIs with dynamic states, making it perfect for game mechanics like verdict submission and case switching.
- **TypeScript** provides strong typing that enhances code quality and maintainability, reducing runtime errors and improving developer productivity, especially when handling complex game state and player data.
- **Tradeoffs**: While React + TypeScript provides excellent development experience, it does add complexity compared to vanilla JavaScript solutions. However, the benefits of type safety and component reusability outweigh the initial learning curve and setup overhead.

### 2. **AI Component Using Ollama Model**
- A local AI model powered by **Ollama** provides immediate feedback without requiring constant internet connectivity, subscription costs, or impklementation complexity.
- **Tradeoffs**: Using a local model means the quality of feedback may not match cloud-based AI services, and there are hardware requirements for running the model. However, this approach eliminates API call latency and usage costs while providing complete control over the model.

### 3. **Node.js Backend + MongoDB**
- **Node.js** was selected for its JavaScript-based ecosystem that allows for code sharing between frontend and backend, streamlining development with a unified language.
- **MongoDB** provides a flexible, document-based storage solution that accommodates evolving game data structures and scales well for user authentication and gameplay statistics.
- **Tradeoffs**: While SQL databases might offer stronger data consistency guarantees, MongoDB's schemaless design provides the flexibility needed for rapid iteration during game development. Similarly, while Node.js may not match the raw performance of some compiled languages, its developer-friendly nature and extensive package ecosystem accelerate development.

## Areas of Improvement & Future Development

### 1. **More Complex AI Feedback and AI features**
   - While the current feedback is helpful, there is potential to enhance the quality of the AI's analysis and advice, making it more context-aware and precise.

### 2. **UI/UX Enhancements**
   - Currently, the user interface is simple. Future improvements could include animations, visual cues for decision-making, and making the game more engaging for users.
   - The styling can be enhanced to create a more immersive experience, such as incorporating visual aids for compliance violations and evidence.

### 3. **Expanding the Case Library**
   - More cases with varying complexity should be added to increase the diversity and challenge of the game. 
   - It would also be beneficial to introduce different types of compliance issues, such as legal disputes, discrimination, etc. With AI-generated cases so now cases are ever the same.

### 4. **More Features**
   - Introducing a point system based on how well the player performs would be very beneficial for the player playing the game. It will show areas of improvement.

### 5. **Enhanced Backend Integration**
   - The current Node.js and MongoDB backend handles user authentication through login and registration.
   - Future enhancements will expand the backend's role to:
     - Track detailed player statistics (correct verdicts, decision patterns, time spent per case)
     - Create personalized learning paths based on player performance
     - Implement leaderboards and achievement systems
     - Enable saving game progress and resuming sessions
     - Generate analytics on player improvement over time
     - Provide customized case difficulty based on player skill level
     - Support multi-player modes where players can compare verdicts on the same cases
