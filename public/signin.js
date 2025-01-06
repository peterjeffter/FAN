const loginbtn = document.querySelector('.loginbtn')
const teacherform = document.getElementById('addteachermenu')
const signUp = document.getElementById('signupbtn')
const addteacherform = async (event)=>{
  event.preventDefault();
  const teacher = {
    name: document.getElementById('teachername').value,
    email:document.getElementById('email').value,
    password:document.getElementById('password').value,
  }
  try {   
    if (teacher.name === '' ||
      teacher.email=== ''||
      teacher.password === ''
    ) {
      document.querySelector('.add-teacher-error').innerHTML = 'Must enter details'
    } else {
      const { data } = await axios.post('http://localhost:5000/speak/register', teacher );
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', teacher.name)
      console.log(data.token)
      window.location.href="main.html"
    }
   
  } catch (error) {
    localStorage.removeItem('token')
    
    console.log(error);
  }
}




teacherform.addEventListener('submit', addteacherform)
teacherform.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    async (event)=>{
      event.preventDefault();
      const teacher = {
        name: document.getElementById('teachername').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value,
      }
      try {   
        const { data } = await axios.post('http://localhost:5000/speak/register', teacher );
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', teacher.name)
        console.log(data.token)
        window.location.href="main.html"
      } catch (error) {
        localStorage.removeItem('token')
        console.log(error);
        document.querySelector('.addteachermenu').innerHTML = '<h6 class="add-teacher-error">Must enter details<h6>'
      }
    }
}});

loginbtn.addEventListener('click',()=>{window.location.href = 'login.html'})