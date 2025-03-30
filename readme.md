# Flatacuties

Flatacuties is a simple web application that allows users to view a list of characters, select a character to view its details, vote for a character, and reset the votes.

## Features
- Display a list of characters in the character bar.
- Click on a character to view its details (image, name, votes).
- Submit votes for a selected character.
- Reset votes for a selected character.

## Technologies Used
- HTML
- CSS
- JavaScript
- JSON Server (for backend data)

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- JSON Server (`npm install -g json-server`)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/flatacuties.git
   ```
2. Navigate to the project directory:
   ```sh
   cd flatacuties
   ```
3. Start the JSON Server:
   ```sh
   json-server --watch db.json
   ```
4. Open `index.html` in your browser.

## API Endpoints
- **GET /characters** - Fetch all characters.
- **GET /characters/:id** - Fetch a specific character by ID.
- **PATCH /characters/:id** - Update a character's vote count.

## How to Use
1. Open the application in your browser.
2. Click on a character name in the character bar to view its details.
3. Enter a number in the votes input field and submit to add votes.
4. Click the "Reset Votes" button to reset the vote count for the selected character.

## License
This project is licensed under the MIT License.

## Acknowledgments
- Flatiron School for the project inspiration.

