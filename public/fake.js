
    const studentTabHTML = document.getElementById('student-tab');
   
  
    if (!studentTabHTML) {
      console.error('Element with id="student-tab" not found in the DOM.');
      return;
    }
  
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };
  
    const showstudents = async (searchQuery = '') => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found. Please log in.');
        studentTabHTML.innerHTML = '<h5 class="error">Please log in to view students.</h5>';
        return;
      }
  
      try {
        studentTabHTML.innerHTML = '<h5>Loading students...</h5>';
        const { data } = await axios.get(`http://localhost:8000/speak/?name=${encodeURIComponent(searchQuery)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!Array.isArray(data)) {
          console.error('Expected an array but got:', data);
          studentTabHTML.innerHTML = '<h5 class="error">Unexpected response from the server.</h5>';
          return;
        }
  
        if (data.length < 1) {
          studentTabHTML.innerHTML = '<h5 class="empty-list">No learners found. Add some learners.</h5>';
          return;
        }
  
        studentTabHTML.innerHTML = data
          .map(({ _id, name }) => `
            <div class="studentprofile">
              <a href="studentpage.html?name=${encodeURIComponent(name)}" class="studentname">${name}</a>
              <div class="task-links">
                <button type="button" class="edit-link" data-id="${_id}">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn" data-id="${_id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `)
          .join('');
      } catch (error) {
        console.error('Error fetching students:', error);
        studentTabHTML.innerHTML = '<h5 class="error">Failed to load students. Please try again later.</h5>';
      }
    };
  
    // Debounced input event for live search
    const handleSearch = debounce((event) => {
      const searchQuery = event.target.value.trim();
      showstudents(searchQuery);
    }, 300); // Adjust debounce delay as needed (300ms in this case)
  
    // Attach the input event to the search field
    searchInput.addEventListener('input', handleSearch);
  
    // Load all students initially
    showstudents();
  ;
  








  const showNotes = async () => {
    const token = localStorage.getItem('token');
    const notesContainer = document.querySelector('.notes-container'); // Assuming you have a parent container for notes
  
    // Check if the container exists
    if (!notesContainer) {
      console.error('The notes container is missing in the DOM.');
      return;
    }
  
    const studentID = notesContainer.dataset.studentId;
  
    if (!studentID) {
      console.error('Student ID is missing in the notes container.');
      return;
    }
  
    if (!token) {
      console.error('Authorization token is missing.');
      alert('You must be logged in to view notes.');
      return;
    }
  
    try {
      const { data } = await axios.get(
        `http://localhost:8000/speak/notes/${studentID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Clear existing notes
      notesContainer.innerHTML = '';
  
      if (Array.isArray(data) && data.length > 0) {
        // Create a note bubble for each note
        data.forEach((note) => {
          const noteBubble = document.createElement('div');
          noteBubble.className = 'note-bubble';
          noteBubble.textContent = note.note; // Adjust this based on your API response
          notesContainer.appendChild(noteBubble);
        });
      } else {
        notesContainer.innerHTML = '<p>No notes available for this student.</p>';
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('An error occurred while fetching notes.');
    }
  };



  const noteBubble = document.createElement('div');
  noteBubble.className = 'note-bubble';
  noteBubble.textContent = noteText;