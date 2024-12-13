document.addEventListener('DOMContentLoaded', function() { 
  // Function to open another HTML page
  function openProfilePage() {
    window.location.href = 'studentpage.html'; 
  }

  // Add event listener to student profile container
  const profileContainer = document.getElementById('studentstab');

  if (profileContainer) {
    profileContainer.addEventListener('click', function(event) {
      const studentProfile = event.target.closest('.studentprofile');

      if (studentProfile) {
        // Check if click is NOT on edit or delete buttons
        if (!event.target.classList.contains('edit-link') && !event.target.classList.contains('delete-btn')) {
          console.log('Profile clicked'); // Add logging to check if the profile is clicked
          openProfilePage();
        }
      }
    });
  } else {
    console.error("Container with ID 'studentstab' not found.");
  }

  // Open and close popup menu for add learner
  document.addEventListener('DOMContentLoaded', function() { 
    // Toggle add learner menu when clicking the add learner button
    const addLearnerButton = document.getElementById('addLearnerButton');
    const addLearnerMenu = document.getElementById('addlearnermenu');
  
    if (addLearnerButton && addLearnerMenu) {
      addLearnerButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevents the document click listener from closing the menu immediately
        addLearnerMenu.classList.toggle('openn'); // Toggle visibility
      });
  
      // Close the add learner menu if clicking outside
      document.addEventListener('click', function(event) {
        if (!addLearnerMenu.contains(event.target) && event.target !== addLearnerButton) {
          addLearnerMenu.classList.remove('openn');
        }
      });
    } else {
      console.error("Add learner button or menu not found.");
    }
  });
  

  // Edit link functionality for toggling minimenu
  if (profileContainer) {
    profileContainer.addEventListener('click', function(event) {
      const editLink = event.target.closest('.edit-link');
      if (editLink) {
        const studentProfile = editLink.closest('.studentprofile');
        const miniMenu = studentProfile.querySelector('.minimenu');
        if (miniMenu) {
          miniMenu.classList.toggle('open');
          miniMenu.style.position = 'absolute';
        } else {
          console.error("Mini menu not found within student profile.");
        }
      }
    });
  }

  // Close menus when clicking outside
  document.addEventListener('click', function(event) {
    const addLearnerButton = document.getElementById('addLearnerButton');
    const addLearnerMenu = document.getElementById('addlearnermenu');
    if (addLearnerMenu && !addLearnerMenu.contains(event.target) && addLearnerButton && !addLearnerButton.contains(event.target)) {
      addLearnerMenu.classList.remove('open');
    }

    if (addLearnerMenu && !addLearnerMenu.contains(event.target) && addLearnerButton && !addLearnerButton.contains(event.target)) {
      addLearnerMenu.classList.remove('openn');
    }

    // Close all minimenus when clicking outside
    document.querySelectorAll('.minimenu').forEach(function(miniMenu) {
      if (!miniMenu.contains(event.target) && !event.target.closest('.edit-link')) {
        miniMenu.classList.remove('open');
      }
    });
  });
});
