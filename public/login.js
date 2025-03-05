const loginbtn = document.querySelector('.loginbtn');
const teacherform = document.getElementById('addteachermenu');
const BASE_URL = "https://fan-msxtf2qxc-0ngutor0s-projects.vercel.app/speak";

// ✅ Corrected `addteacherform` function
const addteacherform = async (event) => {
  event.preventDefault();

  const teacher = {
    name: document.getElementById('teachername').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value.trim(),
  };

  try {
    if (!teacher.name || !teacher.email || !teacher.password) {
      document.querySelector('.add-teacher-error').innerHTML = 'Must enter details';
      return;
    }

    const { data } = await axios.post(`${BASE_URL}/register`, teacher);
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', teacher.name);
    console.log(data.token);
    window.location.href = "main.html";
  } catch (error) {
    localStorage.removeItem('token');
    console.log(error);
    document.querySelector('.add-teacher-error').innerHTML = 'Registration failed';
  }
};

// ✅ Attach event listener correctly
teacherform.addEventListener('submit', addteacherform);

// ✅ Corrected `keypress` event listener
teacherform.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    await addteacherform(event);
  }
});

loginbtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});
