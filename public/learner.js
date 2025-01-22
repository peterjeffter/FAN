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
});

const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const form = document.getElementById('addlearnermenu');
const studentTabHTML = document.querySelector('.studentstab');

// Function to fetch and display students
export const showstudents = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('http://localhost:8000/speak/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Fetched students:', data);

    const students = data;

    if (!Array.isArray(students)) {
      console.error('Expected an array but got:', students);
      return;
    }

    if (students.length < 1) {
      studentTabHTML.innerHTML = '<h5 class="empty-list">Add some learners</h5>';
      return;
    }

    const allStudents = students
      .map(({ _id: studentID, name }) => `
      <div class="studentprofile">
        <a href="studentpage.html?name=${encodeURIComponent(name)}" class="studentname">${name}</a>
        <div class="task-links">
          <button type="button" class="edit-link" data-id="${studentID}">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn" data-id="${studentID}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
       
      </div>
      `)
      .join('');

    studentTabHTML.innerHTML = allStudents;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};


// Function to add a student
const addStudentForm = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const student = {
    name: document.getElementById('name').value,
    grade: document.getElementById('class').value,
    age: document.getElementById('age').value,
    language: document.getElementById('language').value,
    parentname: document.getElementById('parent-name').value,
    email: document.getElementById('contact-info').value,
  };

  try {
    if (student.name === '' ||
      student.grade === '' ||
      student.age === '' ||
      student.language === '' ||
      student.parentname === '' ||
      student.email === '') {
      document.querySelector('.add-learner-error').innerHTML = '*Must enter details*'
    } else {
      console.log(student);
    await axios.post('http://localhost:8000/speak/addlearner', student, {
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

// Function to delete a student
const expelStudent = async (e) => {
  const token = localStorage.getItem('token');
  const deleteBtn = e.target.closest('.delete-btn');

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    if (id) {
      try {
        await axios.delete(`http://localhost:8000/speak/${id}`, {
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

// Function to add a note
const addNote = async (e) => {
  const token = localStorage.getItem('token');
  const editBtn = e.target.closest('.edit-link');
  if (editBtn) {
    const id = editBtn.dataset.id;
    const note = document.getElementById('noteinput').value;

    if (id) {
      try {
        await axios.patch(`http://localhost:8000/speak/${id}`, { note }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showstudents();
      } catch (error) {
        console.log('Error adding note:', error);
      }
    } else {
      console.error('Student ID is undefined');
    }
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
studentTabHTML.addEventListener('click', (e) => {
  const studentElement = e.target.closest('.studentprofile');
  if (studentElement) {
    console.log('Student profile clicked:', studentElement);
  }
});

// Prevent edit/delete click from propagating to parent links
document.addEventListener('DOMContentLoaded', () => {
  studentTabHTML.addEventListener('click', (e) => {
    if (e.target.closest('.edit-link') || e.target.closest('.delete-btn')) {
      e.stopPropagation();
    }
  });
});



////notes section
document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the Edit button
  studentTabHTML.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-link');

    if (editBtn) {
      const studentID = editBtn.dataset.id;
      const studentProfile = editBtn.closest('.studentprofile');

      if (studentProfile) {
        createAndToggleNotesDiv(studentProfile, studentID, name);
      }
    }
  });

  // Function to create and toggle the visibility of the notes section
  function createAndToggleNotesDiv(profile, studentID, name) {
    let notesDiv = profile.querySelector('.notes-div');

    // If the notes-div doesn't exist, create it
    if (!notesDiv) {
      notesDiv = document.createElement('div');
      notesDiv.className = 'notes-div';

      // Add content to the notes-div
      notesDiv.innerHTML = `
        <div class="note-name-sec">
          <i class="fa-solid fa-xmark close-icon"></i>
          <span>student's Notes</span>
          <i class="fa-solid fa-up-right-and-down-left-from-center expand-note"></i>
        </div>
        <div class="note-input-sec">
          <input class="note-input" type="text" placeholder="ADD NOTE">
          <button class="new-note-button"><i class="fas fa-plus"></i></button>
        </div>
        <div class="notes-container"></div>
      `;

      // Append the notes-div to the student profile
      profile.appendChild(notesDiv);

      // Add event listener to the close icon
      const closeIcon = notesDiv.querySelector('.close-icon');
      closeIcon.addEventListener('click', () => {
        notesDiv.style.display = 'none'; // Hide the notes-div
      });

      // Add event listener to the expand icon
      const expandIcon = notesDiv.querySelector('.expand-note');
      expandIcon.addEventListener('click', () => {
        notesDiv.classList.toggle('expanded');
        expandIcon.classList.toggle('fa-up-right-and-down-left-from-center');
        expandIcon.classList.toggle('fa-down-left-and-up-right-to-center');
      });

      // Add event listener to the add note button
      const addNoteButton = notesDiv.querySelector('.new-note-button');
      addNoteButton.addEventListener('click', () => {
        const noteInput = notesDiv.querySelector('.note-input');
        const notesContainer = notesDiv.querySelector('.notes-container');
        const noteText = noteInput.value.trim();

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
      });
    }

    // Toggle visibility of the notes-div
    notesDiv.style.display = notesDiv.style.display === 'block' ? 'none' : 'block';
  }
});
