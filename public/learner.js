

document.addEventListener('DOMContentLoaded', () => {
  const username = document.querySelector('.name');
  const name = localStorage.getItem('name');

  if (username && name) {
    username.innerHTML = `Welcome, ${name}`;
  } else {
    console.error("Unable to find the username element or 'name' is not in localStorage");
  }

  // The showstudents function will be called here after it's defined
  showstudents();
});

const searchinput = document.querySelector('.search-input');
const searchicon = document.querySelector('.search-icon');
const form = document.getElementById('addlearnermenu');
const deletebtn = document.querySelector('.delete-btn');
const studenttabHTML = document.querySelector('.studentstab');
const editbtn = document.querySelector('.edit-link');

export const showstudents = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('http://localhost:5000/speak/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Fetched students:', data); // Log the data to see what is being returned
    
    const students = data;

    if (!Array.isArray(students)) {
      console.error('Expected an array but got:', students);
      return;
    }

    if (students.length < 1) {
      studenttabHTML.innerHTML = '<h5 class="empty-list">Add some learners</h5>';
      return;
    }

    const allstudents = students.map((student) => {
      const { _id: studentID, name } = student;
      return `
        <div class="studentprofile" >  
          <h5 class="studentname">${name}</h5>
          
          <div class="task-links">
            <!-- edit link -->
            <button class="edit-link">
              <i class="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${studentID}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
    }).join('');

    studenttabHTML.innerHTML = allstudents;
  } catch (error) {
    localStorage.removeItem('token');
    console.error('Error fetching learners:', error);
  }
};

const addstudentform = async (event) => {
  const token = localStorage.getItem('token');
  event.preventDefault();
  const student = {   
    name: document.getElementById('name').value,
    grade: document.getElementById('class').value,
    age: document.getElementById('age').value,    
    language: document.getElementById('language').value,
    parentname: document.getElementById('parent-name').value,
    contactinfo: document.getElementById('contact-info').value
  };
  try {
    console.log(student);    
    await axios.post('http://localhost:5000/speak/addlearner', student,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showstudents(); // Refresh the student list
    form.reset();
  } catch (error) {
    console.log(error);
  }
};

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
        showstudents(); // Refresh the list after deletion
      } catch (error) {
        console.log('Error deleting student:', error);
      }
    } else {
      console.error('Student ID is undefined');
    }
  }
};

const addnote = async (e) => {
  const token = localStorage.getItem('token');
  
  const editbtn = e.target.closest('.edit-link');
  if (editbtn) {
    const id = editbtn.dataset.id;
    const note = noteinput.value
    if (id) {
      try {
        await axios.patch(`http://localhost:5000/speak/${id}`,note, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showstudents(); // Refresh the list after deletion
      } catch (error) {
        console.log('Error adding note:', error);
      }
    } else {
      console.error('Student ID is undefined');
    }
  }
};


// Event listeners
form.addEventListener('submit', addstudentform);
form.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addstudentform(event);
  }
});
studenttabHTML.addEventListener('click', expelStudent);
studenttabHTML.addEventListener('click', (e) => {
  const studentelement = e.target.closest('.studentprofile');
});
document.addEventListener('DOMContentLoaded', () => {
  const studentTabHTML = document.querySelector('.studentstab');
  studentTabHTML.addEventListener('click', (e) => {
    if (e.target.closest('.edit-link') || e.target.closest('.delete-btn')) {
      e.stopPropagation(); // Prevent the click from reaching the anchor tag
    }
  });
});
