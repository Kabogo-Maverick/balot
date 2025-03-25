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
  