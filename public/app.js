document.addEventListener("DOMContentLoaded", () => {
  // Open and close the menu
  const addLearnerMenu = document.getElementById('addlearnermenu');
  const openBtn = document.getElementById('openbtnn');

  if (openBtn && addLearnerMenu) {
    openBtn.addEventListener('click', () => {
      addLearnerMenu.classList.toggle('openn');
    });

    document.addEventListener('click', (event) => {
      if (!addLearnerMenu.contains(event.target) && !openBtn.contains(event.target)) {
        addLearnerMenu.classList.remove('openn');
      }
    });
  } else {
    console.error('Menu elements not found in the DOM.');
  }

  // Parent container for student profiles
  const studentTabHTML = document.querySelector('.studentstab');

  if (!studentTabHTML) {
    console.error('Student profiles container not found.');
    return;
  }

  // Handle clicks within the student profiles container
  studentTabHTML.addEventListener('click', (event) => {
    // Expand note section
    if (event.target.closest('.expand-note')) {
      const notesDiv = event.target.closest('.notes-div');
      const toggleIcon = event.target;

      if (notesDiv && toggleIcon) {
        notesDiv.classList.toggle('expanded');
        toggleIcon.classList.toggle('fa-up-right-and-down-left-from-center');
        toggleIcon.classList.toggle('fa-down-left-and-up-right-to-center');
      } else {
        console.error('Notes section or toggle icon not found.');
      }
    }

    // Add a new note
    if (event.target.closest('.new-note-button')) {
      const noteInput = event.target.closest('.note-input-sec')?.querySelector('.note-input');
      const notesContainer = event.target.closest('.notes-div')?.querySelector('.notes-container');
      const noteText = noteInput?.value.trim();

      if (noteInput && notesContainer) {
        if (noteText) {
          // Create a new note bubble
          const noteBubble = document.createElement('div');
          noteBubble.className = 'note-bubble';
          noteBubble.textContent = noteText;

          // Add the bubble to the container
          notesContainer.appendChild(noteBubble);

          // Clear the input field
          noteInput.value = '';
        } else {
          alert('Please enter a note before adding!');
        }
      } else {
        console.error('Note input or container not found.');
      }
    }
  });

  // Close notes popup when clicking outside
  document.addEventListener('click', (event) => {
    const openPopups = document.querySelectorAll('.notes-div.action');
    openPopups.forEach((popup) => {
      if (!popup.contains(event.target) && !studentTabHTML.contains(event.target)) {
        popup.classList.remove('action');
      }
    });
  });
});
