document.getElementById('backButton').addEventListener('click', () => {
  history.back();
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Extract the name from the URL
const studentName = getQueryParam('name');  
if (studentName) {
  document.getElementById('scndname').textContent = decodeURIComponent(studentName);
} else {
  document.getElementById('scndname').textContent = 'Anonymous Student';
}

// Start listening as soon as the page loads
window.onload = function() {
  recognition.start();
};

// Photo arrays for different categories
const photoCategories = {
  friends: [
    "photos/friends/PHOTO-2024-11-18-00-47-49.jpg",
    "photos/friends/PHOTO-2024-11-18-00-47-46.jpg", 
    "photos/friends/PHOTO-2024-11-18-00-47-49.jpg", 
    "photos/friends/PHOTO-2024-11-18-00-47-51.jpg"
  ],
  eat: [
    "photos/eat/PHOTO-2024-11-18-00-47-462.jpg",
    "photos/eat/PHOTO-2024-11-18-00-47-504.jpg"
  ],
  dad: [
    "photos/dad/PHOTO-2024-11-18-00-47-50.jpg", 
    "photos/dad/PHOTO-2024-11-18-00-47-485.jpg",
    "photos/dad/PHOTO-2024-11-18-00-47-463.jpg"
  ],
  cat: [
    "photos/cat/PHOTO-2024-11-18-00-47-493.jpg",
    "photos/cat/PHOTO-2024-11-18-00-47-472.jpg"
  ],
  mom: [
    "photos/mom/PHOTO-2024-11-18-00-47-48.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-473.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-475.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-482.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-483.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-484.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-486.jpg",
    "photos/mom/PHOTO-2024-11-18-00-47-492.jpg"
  ]
};

let currentPhotoIndex = 0;
let currentCategory = 'friends'; // Default category

// Function to display a photo
function displayPhoto(index) {
  const imgElement = document.getElementById('photo');
  const currentArray = photoCategories[currentCategory]; // Use current category array
  imgElement.src = currentArray[index];
}

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// Handle recognition results
recognition.onresult = function(event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log(`Command received: ${command}`);
  handleCommand(command);
};

// Restart recognition on end to keep listening
recognition.onend = function() {
  recognition.start(); // Automatically restart recognition
};




// Handle voice commands
function handleCommand(command) {
  const userPrompt = promptInput.value.toLowerCase().trim(); // Get the user input and clean it
  console.log("Command:", command); // Debugging
  console.log("Prompt Input Value:", userPrompt); // Debugging
  
  if (userPrompt && command.includes(userPrompt)) {
    // Only proceed if prompt input exists and command matches
    currentPhotoIndex = (currentPhotoIndex + 1) % photoCategories[currentCategory].length;
    console.log("Matched! Showing next photo.");
  } else {
    console.log("No match. Command ignored.");
  }
  
  displayPhoto(currentPhotoIndex); // Update the displayed photo
}


// Dropdown change listener
document.querySelector('.category').addEventListener("change", () => {
  const selectedValue = document.querySelector('.category').value;
  
  if (photoCategories[selectedValue]) {
    currentCategory = selectedValue; // Switch to the selected category
    currentPhotoIndex = 0; // Reset to the first photo of the selected category
    displayPhoto(currentPhotoIndex);
  }
});
const promptInput = document.querySelector('.setprompt');
const promptDisplay = document.querySelector('.prompt');

// Add an event listener to the input element
promptInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    promptDisplay.innerHTML = promptInput.value; 
}});
