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


// Photo arrays for different categories
const photoCategories = {
  Random:[
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_6b12c1f4.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_19e0eb2f.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_620e732d.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_6305c257.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_077212c2.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_a15f7d86.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_e9f7ae52.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_0f45083a.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_13d365ee.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_a9d8798b.jpg",
  "photos/wild/IMG-20250213-WA0089.jpg",
  "photos/wild/IMG-20250213-WA0091.jpg",
  "photos/wild/IMG-20250213-WA0092.jpg",
  "photos/wild/IMG-20250213-WA0093.jpg",
  "photos/wild/IMG-20250213-WA0094.jpg",
  "photos/wild/IMG-20250213-WA0095.jpg",
  "photos/wild/IMG-20250213-WA0096.jpg",
  "photos/wild/IMG-20250213-WA0097.jpg",
  "photos/wild/IMG-20250213-WA0098.jpg",
  "photos/wild/IMG-20250213-WA0099.jpg",
  "photos/wild/IMG-20250213-WA0100.jpg",
  "photos/wild/IMG-20250213-WA0101.jpg",
  "photos/wild/IMG-20250213-WA0102.jpg",
  "photos/wild/IMG-20250213-WA0103.jpg",
  "photos/wild/IMG-20250213-WA0104.jpg",
  "photos/wild/IMG-20250213-WA0105.jpg",
  "photos/wild/IMG-20250213-WA0106.jpg",
  "photos/wild/IMG-20250213-WA0107.jpg",
  "photos/wild/IMG-20250213-WA0108.jpg",
  "photos/wild/WhatsApp Image 2025-02-13 at 23.51.20_81fe3312.jpg",
  "photos/farm/IMG-20250213-WA0076.jpg",
  "photos/farm/IMG-20250213-WA0077.jpg",
  "photos/farm/IMG-20250213-WA0078.jpg",
  "photos/farm/IMG-20250213-WA0079.jpg",
  "photos/farm/IMG-20250213-WA0080.jpg",
  "photos/farm/IMG-20250213-WA0081.jpg",
  "photos/farm/IMG-20250213-WA0082.jpg",
  "photos/farm/IMG-20250213-WA0083.jpg",
  "photos/farm/IMG-20250213-WA0084.jpg",
  "photos/farm/IMG-20250213-WA0085.jpg",
  "photos/farm/IMG-20250213-WA0086.jpg",
  "photos/farm/IMG-20250213-WA0087.jpg",
  "photos/farm/IMG-20250213-WA0088.jpg",
  "photos/farm/WhatsApp Image 2025-02-13 at 23.50.53_bec2b2a4.jpg",
  "photos/sea/IMG-20250213-WA0103.jpg",
  "photos/sea/IMG-20250213-WA0110.jpg",
  "photos/sea/IMG-20250213-WA0111.jpg",
  "photos/sea/IMG-20250213-WA0112.jpg",
  "photos/sea/IMG-20250213-WA0113.jpg",
  "photos/sea/IMG-20250213-WA0114.jpg",
  "photos/sea/IMG-20250213-WA0115.jpg",
  "photos/sea/IMG-20250213-WA0116.jpg",
  "photos/sea/IMG-20250213-WA0117.jpg",
  "photos/sea/IMG-20250213-WA0118.jpg",
  "photos/sea/IMG-20250213-WA0119.jpg",
  "photos/sea/WhatsApp Image 2025-02-13 at 23.51.41_4baeaac0.jpg",
  "photos/bird/IMG-20250213-WA0011.jpg",
  "photos/bird/IMG-20250213-WA0035.jpg",
  "photos/bird/IMG-20250213-WA0036.jpg",
  "photos/bird/IMG-20250213-WA0038.jpg",
  "photos/bird/IMG-20250213-WA0039.jpg",
  "photos/bird/IMG-20250213-WA0040.jpg",
  "photos/bird/IMG-20250213-WA0041.jpg",
  "photos/bird/IMG-20250213-WA0042.jpg",
  "photos/bird/IMG-20250213-WA0043.jpg",
  "photos/bird/IMG-20250213-WA0044.jpg",
  "photos/bird/IMG-20250213-WA0045.jpg",
  "photos/bird/IMG-20250213-WA0046.jpg",
  "photos/bird/IMG-20250213-WA0047.jpg",
  "photos/bird/IMG-20250213-WA0048.jpg",
  "photos/bird/IMG-20250213-WA0049.jpg",
  "photos/bird/IMG-20250213-WA0050.jpg",
  "photos/bird/IMG-20250213-WA0051.jpg",
  "photos/bird/IMG-20250213-WA0052.jpg",
  "photos/bird/IMG-20250213-WA0054.jpg",
  "photos/bird/IMG-20250213-WA0053.jpg",
  "photos/insect/WhatsApp Image 2025-02-13 at 23.50.27_2f14ef6b.jpg",
  "photos/insect/IMG-20250213-WA0074.jpg",
  "photos/insect/IMG-20250213-WA0073.jpg",
  "photos/insect/IMG-20250213-WA0072.jpg",
  "photos/insect/IMG-20250213-WA0071.jpg",
  "photos/insect/IMG-20250213-WA0069.jpg",
  "photos/insect/IMG-20250213-WA0070.jpg",
  "photos/insect/IMG-20250213-WA0068.jpg",
  "photos/insect/IMG-20250213-WA0067.jpg",
  "photos/insect/IMG-20250213-WA0066.jpg",
  "photos/insect/IMG-20250213-WA0065.jpg",
  "photos/insect/IMG-20250213-WA0064.jpg",
  "photos/insect/IMG-20250213-WA0063.jpg",
  "photos/insect/IMG-20250213-WA0062.jpg",
  "photos/insect/IMG-20250213-WA0061.jpg",
  "photos/insect/IMG-20250213-WA0060.jpg",
  "photos/insect/IMG-20250213-WA0059.jpg",
  "photos/insect/IMG-20250213-WA0058.jpg",
  "photos/insect/IMG-20250213-WA0057.jpg",
  "photos/insect/IMG-20250213-WA0056.jpg",
  "photos/sky/WhatsApp Image 2025-02-14 at 12.18.19_7aaad326.jpg",
  "photos/sky/IMG-20250214-WA0085.jpg",
  "photos/sky/IMG-20250214-WA0074.jpg",
  "photos/sky/IMG-20250214-WA0073.jpg",
  "photos/sky/IMG-20250214-WA0072.jpg",
  "photos/sky/IMG-20250214-WA0071.jpg",
  "photos/sky/IMG-20250214-WA0070.jpg",
  "photos/sky/IMG-20250214-WA0069.jpg",
  "photos/sky/IMG-20250214-WA0068.jpg",
  "photos/sky/IMG-20250214-WA0067.jpg",
  "photos/sky/IMG-20250214-WA0066.jpg",
  "photos/sky/IMG-20250214-WA0065.jpg",
  "photos/vehicles/IMG-20250214-WA0041.jpg",
  "photos/vehicles/IMG-20250214-WA0042.jpg",
  "photos/vehicles/IMG-20250214-WA0043.jpg",
  "photos/vehicles/IMG-20250214-WA0044.jpg",
  "photos/vehicles/IMG-20250214-WA0045.jpg",
  "photos/vehicles/IMG-20250214-WA0046.jpg",
  "photos/vehicles/IMG-20250214-WA0047.jpg",
  "photos/vehicles/IMG-20250214-WA0048.jpg",
  "photos/vehicles/IMG-20250214-WA0049.jpg",
  "photos/vehicles/IMG-20250214-WA0050.jpg",
  "photos/vehicles/IMG-20250214-WA0051.jpg",
  "photos/vehicles/IMG-20250214-WA0052.jpg",
  "photos/vehicles/IMG-20250214-WA0053.jpg",
  "photos/vehicles/IMG-20250214-WA0054.jpg",
  "photos/vehicles/IMG-20250214-WA0055.jpg",
  "photos/vehicles/IMG-20250214-WA0056.jpg",
  "photos/vehicles/WhatsApp Image 2025-02-14 at 12.17.50_83f7d3a8.jpg",
  "photos/vehicles/IMG-20250214-WA0064.jpg",
  "photos/vehicles/IMG-20250214-WA0063.jpg",
  "photos/vehicles/IMG-20250214-WA0061.jpg",
  "photos/vehicles/IMG-20250214-WA0060.jpg",
  "photos/vehicles/IMG-20250214-WA0059.jpg",
  "photos/vehicles/IMG-20250214-WA0058.jpg",
  "photos/vehicles/IMG-20250214-WA0057.jpg",
  "photos/flora/WhatsApp Image 2025-02-14 at 12.17.21_a7e8c6de.jpg",
  "photos/flora/IMG-20250214-WA0040.jpg",
  "photos/flora/IMG-20250214-WA0038.jpg",
  "photos/flora/IMG-20250214-WA0037.jpg",
  "photos/flora/IMG-20250214-WA0036.jpg",
  "photos/flora/IMG-20250214-WA0035.jpg",
  "photos/flora/IMG-20250214-WA0034.jpg",
  "photos/flora/IMG-20250214-WA0033.jpg",
  "photos/flora/IMG-20250214-WA0032.jpg",
  "photos/flora/IMG-20250214-WA0031.jpg",
  "photos/flora/IMG-20250214-WA0030.jpg",
  "photos/flora/IMG-20250214-WA0029.jpg",
  "photos/flora/IMG-20250214-WA0028.jpg",
  "photos/flora/IMG-20250214-WA0027.jpg",
  "photos/flora/IMG-20250214-WA0026.jpg",
  "photos/flora/IMG-20250214-WA0025.jpg",
  "photos/flora/IMG-20250214-WA0024.jpg",
  "photos/flora/IMG-20250214-WA0023.jpg",
  "photos/flora/IMG-20250214-WA0021.jpg",
  "photos/flora/IMG-20250214-WA0020.jpg"
  ],
  Pets: [
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_6b12c1f4.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_19e0eb2f.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_620e732d.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_6305c257.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_077212c2.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_a15f7d86.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.19_e9f7ae52.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_0f45083a.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_13d365ee.jpg",
  "photos/pets/WhatsApp Image 2025-02-14 at 12.21.20_a9d8798b.jpg"
  ],
  WildAnimals: [
    "photos/wild/IMG-20250213-WA0089.jpg",
    "photos/wild/IMG-20250213-WA0091.jpg",
    "photos/wild/IMG-20250213-WA0092.jpg",
    "photos/wild/IMG-20250213-WA0093.jpg",
    "photos/wild/IMG-20250213-WA0094.jpg",
    "photos/wild/IMG-20250213-WA0095.jpg",
    "photos/wild/IMG-20250213-WA0096.jpg",
    "photos/wild/IMG-20250213-WA0097.jpg",
    "photos/wild/IMG-20250213-WA0098.jpg",
    "photos/wild/IMG-20250213-WA0099.jpg",
    "photos/wild/IMG-20250213-WA0100.jpg",
    "photos/wild/IMG-20250213-WA0101.jpg",
    "photos/wild/IMG-20250213-WA0102.jpg",
    "photos/wild/IMG-20250213-WA0103.jpg",
    "photos/wild/IMG-20250213-WA0104.jpg",
    "photos/wild/IMG-20250213-WA0105.jpg",
    "photos/wild/IMG-20250213-WA0106.jpg",
    "photos/wild/IMG-20250213-WA0107.jpg",
    "photos/wild/IMG-20250213-WA0108.jpg",
    "photos/wild/WhatsApp Image 2025-02-13 at 23.51.20_81fe3312.jpg"
  ],
  FarmAnimals: [
    "photos/farm/IMG-20250213-WA0076.jpg",
    "photos/farm/IMG-20250213-WA0077.jpg",
    "photos/farm/IMG-20250213-WA0078.jpg",
    "photos/farm/IMG-20250213-WA0079.jpg",
    "photos/farm/IMG-20250213-WA0080.jpg",
    "photos/farm/IMG-20250213-WA0081.jpg",
    "photos/farm/IMG-20250213-WA0082.jpg",
    "photos/farm/IMG-20250213-WA0083.jpg",
    "photos/farm/IMG-20250213-WA0084.jpg",
    "photos/farm/IMG-20250213-WA0085.jpg",
    "photos/farm/IMG-20250213-WA0086.jpg",
    "photos/farm/IMG-20250213-WA0087.jpg",
    "photos/farm/IMG-20250213-WA0088.jpg",
    "photos/farm/WhatsApp Image 2025-02-13 at 23.50.53_bec2b2a4.jpg"
  ],
  SeaAnimals: [
    "photos/sea/IMG-20250213-WA0103.jpg",
    "photos/sea/IMG-20250213-WA0110.jpg",
    "photos/sea/IMG-20250213-WA0111.jpg",
    "photos/sea/IMG-20250213-WA0112.jpg",
    "photos/sea/IMG-20250213-WA0113.jpg",
    "photos/sea/IMG-20250213-WA0114.jpg",
    "photos/sea/IMG-20250213-WA0115.jpg",
    "photos/sea/IMG-20250213-WA0116.jpg",
    "photos/sea/IMG-20250213-WA0117.jpg",
    "photos/sea/IMG-20250213-WA0118.jpg",
    "photos/sea/IMG-20250213-WA0119.jpg",
    "photos/sea/WhatsApp Image 2025-02-13 at 23.51.41_4baeaac0.jpg"
  ],
  Birds: [
    "photos/bird/IMG-20250213-WA0011.jpg",
    "photos/bird/IMG-20250213-WA0035.jpg",
    "photos/bird/IMG-20250213-WA0036.jpg",
    "photos/bird/IMG-20250213-WA0038.jpg",
    "photos/bird/IMG-20250213-WA0039.jpg",
    "photos/bird/IMG-20250213-WA0040.jpg",
    "photos/bird/IMG-20250213-WA0041.jpg",
    "photos/bird/IMG-20250213-WA0042.jpg",
    "photos/bird/IMG-20250213-WA0043.jpg",
    "photos/bird/IMG-20250213-WA0044.jpg",
    "photos/bird/IMG-20250213-WA0045.jpg",
    "photos/bird/IMG-20250213-WA0046.jpg",
    "photos/bird/IMG-20250213-WA0047.jpg",
    "photos/bird/IMG-20250213-WA0048.jpg",
    "photos/bird/IMG-20250213-WA0049.jpg",
    "photos/bird/IMG-20250213-WA0050.jpg",
    "photos/bird/IMG-20250213-WA0051.jpg",
    "photos/bird/IMG-20250213-WA0052.jpg",
    "photos/bird/IMG-20250213-WA0054.jpg",
    "photos/bird/IMG-20250213-WA0053.jpg"
  ],
  Insects: [
    "photos/insect/WhatsApp Image 2025-02-13 at 23.50.27_2f14ef6b.jpg",
    "photos/insect/IMG-20250213-WA0074.jpg",
    "photos/insect/IMG-20250213-WA0073.jpg",
    "photos/insect/IMG-20250213-WA0072.jpg",
    "photos/insect/IMG-20250213-WA0071.jpg",
    "photos/insect/IMG-20250213-WA0069.jpg",
    "photos/insect/IMG-20250213-WA0070.jpg",
    "photos/insect/IMG-20250213-WA0068.jpg",
    "photos/insect/IMG-20250213-WA0067.jpg",
    "photos/insect/IMG-20250213-WA0066.jpg",
    "photos/insect/IMG-20250213-WA0065.jpg",
    "photos/insect/IMG-20250213-WA0064.jpg",
    "photos/insect/IMG-20250213-WA0063.jpg",
    "photos/insect/IMG-20250213-WA0062.jpg",
    "photos/insect/IMG-20250213-WA0061.jpg",
    "photos/insect/IMG-20250213-WA0060.jpg",
    "photos/insect/IMG-20250213-WA0059.jpg",
    "photos/insect/IMG-20250213-WA0058.jpg",
    "photos/insect/IMG-20250213-WA0057.jpg",
    "photos/insect/IMG-20250213-WA0056.jpg"
  ],
  SpaceandSkies:[
    "photos/sky/WhatsApp Image 2025-02-14 at 12.18.19_7aaad326.jpg",
    "photos/sky/IMG-20250214-WA0085.jpg",
    "photos/sky/IMG-20250214-WA0074.jpg",
    "photos/sky/IMG-20250214-WA0073.jpg",
    "photos/sky/IMG-20250214-WA0072.jpg",
    "photos/sky/IMG-20250214-WA0071.jpg",
    "photos/sky/IMG-20250214-WA0070.jpg",
    "photos/sky/IMG-20250214-WA0069.jpg",
    "photos/sky/IMG-20250214-WA0068.jpg",
    "photos/sky/IMG-20250214-WA0067.jpg",
    "photos/sky/IMG-20250214-WA0066.jpg",
    "photos/sky/IMG-20250214-WA0065.jpg"
  ],
  Vehicles:[
    "photos/vehicles/IMG-20250214-WA0041.jpg",
    "photos/vehicles/IMG-20250214-WA0042.jpg",
    "photos/vehicles/IMG-20250214-WA0043.jpg",
    "photos/vehicles/IMG-20250214-WA0044.jpg",
    "photos/vehicles/IMG-20250214-WA0045.jpg",
    "photos/vehicles/IMG-20250214-WA0046.jpg",
    "photos/vehicles/IMG-20250214-WA0047.jpg",
    "photos/vehicles/IMG-20250214-WA0048.jpg",
    "photos/vehicles/IMG-20250214-WA0049.jpg",
    "photos/vehicles/IMG-20250214-WA0050.jpg",
    "photos/vehicles/IMG-20250214-WA0051.jpg",
    "photos/vehicles/IMG-20250214-WA0052.jpg",
    "photos/vehicles/IMG-20250214-WA0053.jpg",
    "photos/vehicles/IMG-20250214-WA0054.jpg",
    "photos/vehicles/IMG-20250214-WA0055.jpg",
    "photos/vehicles/IMG-20250214-WA0056.jpg",
    "photos/vehicles/WhatsApp Image 2025-02-14 at 12.17.50_83f7d3a8.jpg",
    "photos/vehicles/IMG-20250214-WA0064.jpg",
    "photos/vehicles/IMG-20250214-WA0063.jpg",
    "photos/vehicles/IMG-20250214-WA0061.jpg",
    "photos/vehicles/IMG-20250214-WA0060.jpg",
    "photos/vehicles/IMG-20250214-WA0059.jpg",
    "photos/vehicles/IMG-20250214-WA0058.jpg",
    "photos/vehicles/IMG-20250214-WA0057.jpg"
  ],
  Flora:[
    "photos/flora/WhatsApp Image 2025-02-14 at 12.17.21_a7e8c6de.jpg",
    "photos/flora/IMG-20250214-WA0040.jpg",
    "photos/flora/IMG-20250214-WA0038.jpg",
    "photos/flora/IMG-20250214-WA0037.jpg",
    "photos/flora/IMG-20250214-WA0036.jpg",
    "photos/flora/IMG-20250214-WA0035.jpg",
    "photos/flora/IMG-20250214-WA0034.jpg",
    "photos/flora/IMG-20250214-WA0033.jpg",
    "photos/flora/IMG-20250214-WA0032.jpg",
    "photos/flora/IMG-20250214-WA0031.jpg",
    "photos/flora/IMG-20250214-WA0030.jpg",
    "photos/flora/IMG-20250214-WA0029.jpg",
    "photos/flora/IMG-20250214-WA0028.jpg",
    "photos/flora/IMG-20250214-WA0027.jpg",
    "photos/flora/IMG-20250214-WA0026.jpg",
    "photos/flora/IMG-20250214-WA0025.jpg",
    "photos/flora/IMG-20250214-WA0024.jpg",
    "photos/flora/IMG-20250214-WA0023.jpg",
    "photos/flora/IMG-20250214-WA0021.jpg",
    "photos/flora/IMG-20250214-WA0020.jpg"
  ]
};



let currentPhotoIndex = 0;
let currentCategory = 'Random'; // Default category

// Start listening as soon as the page loads with error handling
window.onload = function() {
  try {
    recognition.start();
    console.log("Voice recognition started.");
  } catch (error) {
    console.error("Failed to start recognition:", error);
    alert("Voice recognition failed. Please check your microphone and browser permissions.");
  }
};

// Function to display a photo
function displayPhoto(index) {
  const imgElement = document.getElementById('photo');
  const currentArray = photoCategories[currentCategory]; // Use current category array
  
  if (!currentArray || currentArray.length === 0) {
    console.error("No photos available in category:", currentCategory);
    imgElement.src = ''; // Clear image if invalid
    return;
  }
  
  if (currentCategory === 'Random') {
    // Pick a random photo from the Random category
    const randomIndex = Math.floor(Math.random() * currentArray.length);
    imgElement.src = currentArray[randomIndex];
  } else {
    // Use the provided index for other categories, ensure it’s valid
    const safeIndex = Math.max(0, Math.min(index, currentArray.length - 1));
    imgElement.src = currentArray[safeIndex];
  }
}

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'nl-NL';

// Handle recognition results
recognition.onresult = function(event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log(`Command received: ${command}`);
  handleCommand(command);
};

// Restart recognition on end with error handling
recognition.onend = function() {
  try {
    recognition.start();
    console.log("Recognition restarted.");
  } catch (error) {
    console.error("Failed to restart recognition:", error);
  }
};

// Handle voice commands
function handleCommand(command) {
  const promptInput = document.querySelector('.setprompt');
  const userPrompt = promptInput?.value.toLowerCase().trim() || ''; // Fallback to empty string
  
  console.log("Command:", command);
  console.log("Prompt Input Value:", userPrompt);
  
  if (userPrompt && command.includes(userPrompt)) {
    if (currentCategory !== 'Random') {
      // Only increment index for non-Random categories
      currentPhotoIndex = (currentPhotoIndex + 1) % photoCategories[currentCategory].length;
    }
    console.log("Matched! Showing next photo.");
    displayPhoto(currentPhotoIndex); // Update the displayed photo
  } else {
    console.log("No match. Command ignored.");
  }
}

// Dropdown change listener
document.querySelector('.category')?.addEventListener("change", () => {
  const selectedValue = document.querySelector('.category')?.value;
  
  if (selectedValue && photoCategories[selectedValue]) {
    currentCategory = selectedValue; // Switch to the selected category
    currentPhotoIndex = 0; // Reset to the first photo of the selected category
    displayPhoto(currentPhotoIndex);
  } else {
    console.error("Invalid category selected:", selectedValue);
  }
});

// Error handling for missing prompt input
const promptInput = document.querySelector('.setprompt');
if (!promptInput) {
  console.warn("Prompt input element (.setprompt) not found in HTML.");
}