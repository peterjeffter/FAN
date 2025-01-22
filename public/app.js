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

});

