             🦁WAKANDA BALLOT
Wakanda Ballot is a simple and interactive voting application where users can vote for their favorite animals. The project is built using HTML, CSS, and JavaScript and utilizes a JSON server to manage and update vote counts dynamically. This allows users to select an animal from the character bar, view its details, cast votes, and reset votes as needed.

             🔥Features
The application displays a list of animals in the character bar, which users can click on to reveal their respective images and vote counts. Once an animal is selected, users can enter a number into the input field and submit their votes, which will update both the displayed count and the database. A reset button is also provided, allowing users to set the vote count back to zero.

              📂Project Structure
The project consists of several key files and directories that work together to ensure smooth functionality:

The index.html file contains the structure of the webpage, including the character bar, image display, vote form, and reset button.

The style.css file handles the styling of the app, ensuring a visually appealing layout.

The src/index.js file contains the JavaScript logic, which fetches characters from the JSON server, updates the UI dynamically, and handles vote submissions and resets.

The db.json file acts as a mock database, storing the list of characters along with their names, images, and current vote counts.

The images/ directory contains all the GIFs used for displaying the animals.




          🛠Setting Up and Running the Project
To run the Wakanda Balot app locally, follow these steps:


1️⃣ Install JSON Server
Since this project requires a local server to store and update votes, you need to install JSON Server. Ensure that Node.js is installed on your machine, then open a terminal or command prompt and run:

     npm install -g json-server


2️⃣ Start the Server
Once the JSON Server is installed, navigate to the project directory and run the following command:
      
      json-server --watch db.json --port 3000

This will start a local server and make the character data available at:

📌 http://localhost:3000/characters



3️⃣ Open the Application
After starting the server, open the index.html file in your browser. You should see the character bar at the top, displaying different animal names. Clicking on any animal will reveal its image and vote count. Users can enter a number in the input field to add votes, and the vote count will update both on the screen and in the database. The reset button can be used to set the vote count back to zero.
