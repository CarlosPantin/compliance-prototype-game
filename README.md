# HR Investigator Game

## Overview

**HR Investigator** is an interactive simulation game built with **React**, **TypeScript**, and **Vite**. Players step into the role of an HR investigator, reviewing various compliance cases and making verdicts based on the information provided. After each decision, the game provides AI-powered feedback to help players learn from their choices. The AI feedback is generated using a local **Ollama model** to offer expert insights.

## Code Architecture

The game follows a simple architecture focused on the front-end user experience. Here's a breakdown of the project:

### Key Components:

- **GameBoard.tsx**: The heart of the game. This file handles:
  - **Fetching Random Cases**: Displays a randomly selected HR case from the predefined list.
  - **User Interaction**: Handles the player's verdicts, including "Guilty" and "Not Guilty" buttons.
  - **AI Feedback**: Sends the player’s verdict and case details to the local Ollama model for analysis and feedback.
  - **State Management**: Uses React's `useState` hooks to manage case details, verdicts, and feedback.

- **App.tsx**: Serves as the main entry point that renders the `GameBoard` component.

- **CaseReport.css**: Provides styling for the layout of the case report, verdict buttons, feedback, and the overall design.

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
- **React** is well-suited for building interactive UIs and managing dynamic states, especially with game mechanics like verdict submission and case switching.
- **TypeScript** provides type safety, which helps in managing dynamic data and reduces runtime errors, ensuring a more robust application.

### 2. **Why Vite?**
- **Vite** was chosen because of its fast build and hot-reload capabilities, offering a smooth development experience. Vite's native support for modern JavaScript and TypeScript features enhances productivity, making it an ideal choice for this project.

### 3. **AI Component Using Ollama Model**
- Using a local AI model powered by **Ollama** enables quick, real-time feedback within the game. This approach is chosen for its convenience in local development, allowing the game to analyze and give valuable insights without needing an external service.

## Areas of Improvement & Future Development

### 1. **More Complex AI Feedback**
   - While the current feedback is helpful, there is potential to enhance the quality of the AI's analysis and advice, making it more context-aware and precise.

### 2. **UI/UX Enhancements**
   - Currently, the user interface is simple. Future improvements could include animations, visual cues for decision-making, and making the game more engaging for users.
   - The styling can be enhanced to create a more immersive experience, such as incorporating visual aids for compliance violations and evidence.

### 3. **Expanding the Case Library**
   - More cases with varying complexity should be added to increase the diversity and challenge of the game. 
   - It would also be beneficial to introduce different types of compliance issues, such as legal disputes, discrimination, etc. With AI-generated cases so now cases are ever the same.

### 4. **More Features**
   - Introducing a point system based on how well the player performs would be very beneficial for the player playing the game. It will show areas of improvement.

### 5. **Backend Integration**
   - The game could be enhanced with a backend to store player data, track progress, and analyze trends over time. This could provide personalized feedback based on the player’s performance.

