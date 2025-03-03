document.addEventListener('DOMContentLoaded', () => {
  
  const username = document.querySelector('.name');
  const name = localStorage.getItem('name');

  if (username && name) {
    username.innerHTML = `${name}`;
  } else {
    console.error("'name' is not in localStorage");
  }

  // Initialize and display the student list
  showstudents();
})

const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const form = document.getElementById('addlearnermenu');
const studentTabHTML = document.querySelector('.studentstab');


// Function to fetch and display students

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
    const { data } = await axios.get(`https://fan-cxhedyjd9-0ngutor0s-projects.vercel.app/speak/?name=${encodeURIComponent(searchQuery)}`, {
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
        <div data-id="${_id}" class="studentprofile">
          <a href="studentpage.html?name=${encodeURIComponent(name)}" data-name=${name} class="studentname" >${name}</a>
          <div class="task-links">
            <button type="button" class="edit-link" data-name=${name} data-id="${_id}">
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
}, 300);
// Attach the input event to the search field
searchInput.addEventListener('input', handleSearch);

// Load all students initially
showstudents();
;



// Function to add a student
const addStudentForm = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const student = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    language: document.getElementById('language').value,
    parentname: document.getElementById('parent-name').value,
    email: document.getElementById('contact-info').value,
  };

  try {
    if (student.name === '' ||
      
      student.age === '' ||
      student.language === '' ||
      student.parentname === '' ||
      student.email === '') {
      document.querySelector('.add-learner-error').innerHTML = '*Must enter details*'
    } else {
      console.log(student);
    await axios.post('https://fan-cxhedyjd9-0ngutor0s-projects.vercel.app/speak/addlearner', student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showstudents();
    form.reset();
    document.getElementById('addlearnermenu').classList.remove('openn');
    }
    
  } catch (error) {
    
    if (error.message.includes('ValidationError')) {
      
      console.log('Must enter details');
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
  }
};

// Function to expel a student
const expelStudent = async (e) => {
  const token = localStorage.getItem('token');
  const deleteBtn = e.target.closest('.delete-btn');

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    if (id) {
      try {
        await axios.delete(`https://fan-cxhedyjd9-0ngutor0s-projects.vercel.app/speak/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showstudents();
      } catch (error) {
        console.log('Error deleting student:', error);
      }
    } else {
      console.error('Student ID is undefined');
    }
  }
};



const createNotesContainer = (studentID) => {
  const notesContainer = document.createElement('div');
  notesContainer.className = 'notes-container';
  notesContainer.setAttribute('data-id', studentID);
  document.body.appendChild(notesContainer); // Append to an appropriate parent element
  return notesContainer;
};




const showNotes = async (studentID) => {
  
  if (!studentID) {
    console.error('Student ID is missing.');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Authorization token is missing.');
    alert('You must be logged in to view notes.');
    return;
  }

  let notesContainer = document.querySelector(`.notes-container[data-id="${studentID}"]`);

  if (!notesContainer) {
    console.error('Notes container missing. Creating a new one.');
    const studentProfile = document.querySelector(`.studentprofile[data-id="${studentID}"]`);
    
    if (!studentProfile) {
      console.error('Student profile not found.');
      return;
    }

    notesContainer = createNotesContainer(studentID);
    studentProfile.appendChild(notesContainer);
  }

  try {
    const { data } = await axios.get(
      `https://fan-cxhedyjd9-0ngutor0s-projects.vercel.app/speak/notes/${studentID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    notesContainer.innerHTML = ''; // Clear existing notes

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((note) => {
        const noteBubble = document.createElement('div');
        noteBubble.className = 'note-bubble';
        noteBubble.textContent = note.note;
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




// Function to post the note
const postNote = async (studentID, noteText) => {
  const token = localStorage.getItem('token');

  try {
    const { data } = await axios.post(
      `https://fan-cxhedyjd9-0ngutor0s-projects.vercel.app/speak/notes/${studentID}`, 
      { note: noteText }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Note added successfully',studentID, noteText );
  } catch (error) {
    console.error('Error posting note:', error);
  }
  
};


// Event listeners
form.addEventListener('submit', addStudentForm);
form.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addStudentForm(event);
  }
});

studentTabHTML.addEventListener('click', expelStudent);



////notes section
document.addEventListener('click', (e) => {
  const editBtn = e.target.closest('.edit-link');
  if (editBtn) {
    e.stopPropagation();
    const name = editBtn.getAttribute('data-name');
    const studentID = editBtn.getAttribute('data-id');
    const studentProfile = editBtn.closest('.studentprofile');

    if (!studentID || !studentProfile) {
      console.error('Student ID or student profile missing.');
      return;
    }

    let notesDiv = studentProfile.querySelector('.notes-div');

    if (!notesDiv) {
      // If notesDiv doesn't exist, create it
      notesDiv = document.createElement('div');
      notesDiv.className = 'notes-div';
      notesDiv.innerHTML = `
        <div class="note-name-sec">
          <i class="fa-solid fa-xmark close-icon"></i>
          <span>${name}'s Notes</span>
        </div>
        <div class="note-input-sec">
          <input class="note-input" type="text" placeholder="ADD NOTE">
          <button class="new-note-button"><i class="fas fa-plus"></i></button>
        </div>
        <div data-id="${studentID}" class="notes-container"></div>
      `;
      notesDiv.style.display = 'block';
      studentProfile.appendChild(notesDiv);

      // Add event listener for close icon
      const closeIcon = notesDiv.querySelector('.close-icon');
      closeIcon.addEventListener('click', () => {
        notesDiv.style.display = 'none';
      });

      // Add event listener for add note button
      const addNoteButton = notesDiv.querySelector('.new-note-button');
      addNoteButton.addEventListener('click', () => {
        const noteInput = notesDiv.querySelector('.note-input');
        const notesContainer = notesDiv.querySelector('.notes-container');
        const noteText = noteInput.value.trim();

        if (!noteText) {
          alert('Please enter a note before adding!');
          return;
        }
        // Call postNote to send the note to the backend
        postNote(studentID, noteText);

        // Create a new note bubble
        const noteBubble = document.createElement('div');
        noteBubble.className = 'note-bubble';
        noteBubble.textContent = noteText;

        // Add the bubble to the container
        notesContainer.appendChild(noteBubble);

        // Clear the input field
        noteInput.value = '';

        
        
      });
    } else {
      // Toggle visibility instead of removing
      notesDiv.style.display = notesDiv.style.display === 'none' ? 'block' : 'none';
    }

    showNotes(studentID);
  }
});
