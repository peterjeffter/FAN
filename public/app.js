document.addEventListener("DOMContentLoaded", () => {
  // Open and close the menu
  document.getElementById('openbtnn').addEventListener('click', function () {
    document.getElementById('addlearnermenu').classList.toggle('openn');
  });

  document.addEventListener('click', function (event) {
    const addLearnerMenu = document.getElementById('addlearnermenu');
    const openBtn = document.getElementById('openbtnn');
    
    if (
      !addLearnerMenu.contains(event.target) &&
      !openBtn.contains(event.target)
    ) {
      addLearnerMenu.classList.remove('openn');
    }
  });

  // Display note popup
  const openNotesButton = document.getElementById("openNotes");
  const notesPopup = document.querySelector(".notes-div");

  openNotesButton.addEventListener("click", () => {
    notesPopup.classList.add("action");
  });

  // Close popup when clicking outside the content
  document.addEventListener("click", (event) => {
    if (!notesPopup.contains(event.target) && !openNotesButton.contains(event.target)) {
      notesPopup.classList.remove("action");
    }
  });

  // Expand note
  document.querySelector('.expand-note').addEventListener('click', function () {
    const notesDiv = document.querySelector('.notes-div');
    const toggleIcon = document.querySelector('.expand-note');

    // Toggle the expanded class
    notesDiv.classList.toggle('expanded');

    // Change the icon based on the expanded state
    toggleIcon.classList.toggle('fa-up-right-and-down-left-from-center');
    toggleIcon.classList.toggle('fa-down-left-and-up-right-to-center');
  });

  // Add a new note
  const noteInput = document.querySelector(".note-input");
  const newNoteButton = document.querySelector(".new-note-button");
  const notesContainer = document.querySelector(".notes-container");

  newNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();

    if (noteText) {
      // Create a new note bubble
      const noteBubble = document.createElement("div");
      noteBubble.className = "note-bubble";
      noteBubble.textContent = noteText;

      // Add the bubble to the container
      notesContainer.appendChild(noteBubble);

      // Clear the input field
      noteInput.value = "";
    } else {
      alert("Please enter a note before adding!");
    }
  });
});
