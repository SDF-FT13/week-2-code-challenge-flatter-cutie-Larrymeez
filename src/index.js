const API_URL = "http://localhost:3000/animals"; // Your json-server API endpoint

// Fetch animal data and render the character bar
function fetchAnimals() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      displayCharacterBar(data);
    })
    .catch(error => console.error("Error fetching animals:", error));
}

// Display character names and clickable images in the character bar
function displayCharacterBar(animals) {
  const characterBar = document.getElementById("character-bar");
  characterBar.innerHTML = ""; // Clear any existing content

  animals.forEach(animal => {
    const characterLink = document.createElement("div");
    characterLink.classList.add("character-link");
    characterLink.innerHTML = `
      <p>${animal.name}</p>
      <img src="${animal.image}" alt="${animal.name}" class="thumbnail" onclick="showCharacterInfo(${animal.id})"/>
    `;
    characterBar.appendChild(characterLink);
  });
}

// Show detailed information of the clicked character
function showCharacterInfo(animalId) {
  fetch(`${API_URL}/${animalId}`)
    .then(response => response.json())
    .then(animal => {
      const nameElement = document.getElementById("name");
      const imageElement = document.getElementById("image");
      const voteCountElement = document.getElementById("vote-count");

      nameElement.textContent = animal.name;
      imageElement.src = animal.image;
      voteCountElement.textContent = animal.votes;

      // Handle vote form submission
      const votesForm = document.getElementById("votes-form");
      votesForm.onsubmit = function(event) {
        event.preventDefault();
        addVotes(animalId, animal.votes);
      };

      // Handle reset votes button
      const resetBtn = document.getElementById("reset-btn");
      resetBtn.onclick = function() {
        resetVotes(animalId);
      };
    })
    .catch(error => console.error("Error fetching character info:", error));
}

// Add votes to the character
function addVotes(animalId, currentVotes) {
  const voteInput = document.getElementById("votes");
  const addedVotes = parseInt(voteInput.value) || 0;
  const updatedVotes = currentVotes + addedVotes;

  fetch(`${API_URL}/${animalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: updatedVotes }),
  })
  .then(response => response.json())
  .then(updatedAnimal => {
    // Update the vote count displayed
    document.getElementById("vote-count").textContent = updatedAnimal.votes;
    voteInput.value = ""; // Clear input after voting
  })
  .catch(error => console.error("Error adding votes:", error));
}

// Reset votes for the character
function resetVotes(animalId) {
  fetch(`${API_URL}/${animalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: 0 }),
  })
  .then(response => response.json())
  .then(updatedAnimal => {
    // Reset the vote count on the page
    document.getElementById("vote-count").textContent = updatedAnimal.votes;
  })
  .catch(error => console.error("Error resetting votes:", error));
}

fetchAnimals();
// Fetch and display animals when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");
  const voteForm = document.getElementById("votes-form");
  const voteInput = document.getElementById("votes");

  let currentCharacter = null; // Store currently selected character

  function fetchCharacters() {
      fetch("http://localhost:3000/characters")
          .then(response => response.json())
          .then(characters => {
              characters.forEach(character => {
                  const span = document.createElement("span");
                  span.textContent = character.name;
                  span.style.cursor = "pointer";
                  span.addEventListener("click", () => displayCharacter(character));
                  characterBar.appendChild(span);
              });
          })
          .catch(error => console.error("Error fetching characters:", error));
  }

  function displayCharacter(character) {
      currentCharacter = character; // Store selected character
      characterName.textContent = character.name;
      characterImage.src = character.image;
      characterImage.alt = character.name;
      voteCount.textContent = character.votes;
  }

  voteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!currentCharacter) return;

      const addedVotes = parseInt(voteInput.value, 10);
      if (isNaN(addedVotes) || addedVotes < 0) {
          alert("Please enter a valid number of votes!");
          return;
      }

      currentCharacter.votes += addedVotes; // Update vote count
      voteCount.textContent = currentCharacter.votes;
      voteInput.value = ""; // Clear input field
  });
  

  fetchCharacters();
});
