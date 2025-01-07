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

const photos = [
  "photos/PHOTO-2024-11-18-00-47-46.jpg", "photos/PHOTO-2024-11-18-00-47-47.jpg", "photos/PHOTO-2024-11-18-00-47-48.jpg", "photos/PHOTO-2024-11-18-00-47-49.jpg", "photos/PHOTO-2024-11-18-00-47-50.jpg", "photos/PHOTO-2024-11-18-00-47-51.jpg", "photos/PHOTO-2024-11-18-00-47-462.jpg", "photos/PHOTO-2024-11-18-00-47-463.jpg", "photos/PHOTO-2024-11-18-00-47-472.jpg", "photos/PHOTO-2024-11-18-00-47-473.jpg", "photos/PHOTO-2024-11-18-00-47-474.jpg", "photos/PHOTO-2024-11-18-00-47-475.jpg", "photos/PHOTO-2024-11-18-00-47-482.jpg", "photos/PHOTO-2024-11-18-00-47-483.jpg", "photos/PHOTO-2024-11-18-00-47-484.jpg", "photos/PHOTO-2024-11-18-00-47-485.jpg", "photos/PHOTO-2024-11-18-00-47-486.jpg", "photos/PHOTO-2024-11-18-00-47-492.jpg", "photos/PHOTO-2024-11-18-00-47-493.jpg", "photos/PHOTO-2024-11-18-00-47-502.jpg", "photos/PHOTO-2024-11-18-00-47-503.jpg", "photos/PHOTO-2024-11-18-00-47-504.jpg"
]
;
let currentPhotoIndex = 0;

// Function to display a photo
function displayPhoto(index) {
  const imgElement = document.getElementById('photo');
  imgElement.src = photos[index];
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

// Start listening as soon as the page loads
window.onload = function() {
  recognition.start();
};

// Handle voice commands
function handleCommand(command) {
  if (command.includes('next')) {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  } else if (command.includes('previous')) {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  } else if (command.includes('show')) {
    const photoName = command.replace('show', '').trim();
    const index = photos.findIndex(photo => photo.includes(photoName));
    if (index !== -1) currentPhotoIndex = index;
  }
  displayPhoto(currentPhotoIndex);
}
