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
    const { data } = await axios.get('http://localhost:5000/speak/', {
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
      <a href="studentpage.html?name=${encodeURIComponent(name)}"  class="studentname">${name}</a>
  
      <div class="task-links">
        <button id="openNotes" type="button" class="edit-link" data-id="${studentID}">
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
    
    studentTabHTML.innerHTML = '<h5 class="empty-list">Oops, Error</h5>';
    localStorage.removeItem('token');
    console.error('Error fetching learners:', error);
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
    await axios.post('http://localhost:5000/speak/addlearner', student, {
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
        await axios.delete(`http://localhost:5000/speak/${id}`, {
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
        await axios.patch(`http://localhost:5000/speak/${id}`, { note }, {
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


