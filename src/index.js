const characterBar = document.getElementById("character-bar");
const characterName = document.getElementById("name");
const characterImage = document.getElementById("image");
const voteCount = document.getElementById("vote-count");
const voteForm = document.getElementById("votes-form");
const voteInput = document.getElementById("votes");
const resetBtn = document.getElementById("reset-btn"); // Reset button

let currentCharacter = null;

//fetching characters from json server
function fetchCharacters() {
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
        characterBar.innerHTML = ""; 
  
        characters.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name;
  
          // character to display details
          span.addEventListener("click", () => {
            characterName.textContent = character.name;
            characterImage.src = character.image;
            characterImage.alt = character.name;
            voteCount.textContent = character.votes; 
            currentCharacter = character; 
          });
  
          characterBar.appendChild(span);
        });
      })
      .catch(error => console.error("Error fetching characters:", error));
  }
  fetchCharacters(); 



//vote submission
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



//updated votes
  const updatedVotes = currentCharacter.votes + newVotes;
  voteCount.textContent = updatedVotes;

//PATCH request to update the json database
  fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: updatedVotes }),
  })
    .then(response => response.json())
    .then(updatedCharacter => {
      currentCharacter.votes = updatedCharacter.votes; 
    })
    .catch(error => console.error("Error updating votes:", error));

  voteInput.value = ""; 
});


// Handle Reset Votes
resetBtn.addEventListener("click", () => {
    if (!currentCharacter) {
      alert("Please select a character first!");
      return;
    }
  
// Set votes to zero
    voteCount.textContent = 0;
  
//PATCH request to update the JSON database
    fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ votes: 0 }),
    })
      .then(response => response.json())
      .then(updatedCharacter => {
        currentCharacter.votes = updatedCharacter.votes; 
      })
      .catch(error => console.error("Error resetting votes:", error));
  });