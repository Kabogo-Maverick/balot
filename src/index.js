// Select necessary elements
const characterBar = document.getElementById("character-bar");
const characterName = document.getElementById("name");
const characterImage = document.getElementById("image");
const voteCount = document.getElementById("vote-count");
const voteForm = document.getElementById("votes-form");
const voteInput = document.getElementById("votes");
const resetBtn = document.getElementById("reset-btn"); // Reset button

let currentCharacter = null;

// lets fetch characters from the json server and display them
function fetchCharacters() {
  fetch("http://localhost:3000/characters")
    .then(response => response.json())
    .then(characters => {
      characterBar.innerHTML = ""; // Clear character bar before adding new ones

      characters.forEach(character => {
        const span = document.createElement("span");
        span.textContent = character.name;

        // When a character is clicked, display its details
        span.addEventListener("click", () => {
          characterName.textContent = character.name;
          characterImage.src = character.image;
          characterImage.alt = character.name;
          voteCount.textContent = character.votes; // Load saved votes
          currentCharacter = character; // Store the selected character
        });

        characterBar.appendChild(span);
      });
    })
    .catch(error => console.error("Error fetching characters:", error));
}

// Call function to load characters when the page loads
fetchCharacters();

// Handle vote submission
voteForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

  if (!currentCharacter) {
    alert("Please select a character first!");
    return;
  }

  const newVotes = parseInt(voteInput.value, 10);
  if (isNaN(newVotes) || newVotes < 0) {
    alert("Enter a valid number of votes.");
    return;
  }

  // Calculate updated votes
  const updatedVotes = currentCharacter.votes + newVotes;
  voteCount.textContent = updatedVotes;

  // Send PATCH request to update the JSON database
  fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: updatedVotes }),
  })
    .then(response => response.json())
    .then(updatedCharacter => {
      currentCharacter.votes = updatedCharacter.votes; // Save updated votes
    })
    .catch(error => console.error("Error updating votes:", error));

  voteInput.value = ""; // Clear input field
});

// Handle Reset Votes
resetBtn.addEventListener("click", () => {
  if (!currentCharacter) {
    alert("Please select a character first!");
    return;
  }

  // Set votes to zero
  voteCount.textContent = 0;

  // Send PATCH request to update the JSON database
  fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: 0 }),
  })
    .then(response => response.json())
    .then(updatedCharacter => {
      currentCharacter.votes = updatedCharacter.votes; // Update stored votes
    })
    .catch(error => console.error("Error resetting votes:", error));
});