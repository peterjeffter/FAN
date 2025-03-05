import { parseJwt } from "../utility/parsejwt.js"
const loginform = document.getElementById('loginform')

const BASE_URL = "https://fan-msxtf2qxc-0ngutor0s-projects.vercel.app/speak";

const login = async (event)=>{
  event.preventDefault();
  const teacher = {
    email: document.getElementById('loginemail').value,   
    password:document.getElementById('loginpassword').value,
  }
  try { 
    
    if (teacher.email === '' || teacher.password === '') {
      document.querySelector('.login-error').innerHTML = 'Must enter details'
    } else {
      const { data } = await axios.post(`${BASE_URL}/login`, teacher );
    localStorage.setItem('token', data.token)    
    
    const decodedToken = parseJwt(data.token);
    localStorage.setItem('name', decodedToken.name)
    window.location.href="main.html"
    }
  } catch (error) {
    localStorage.removeItem('token')
    console.log(error);
    
  }
}

loginform.addEventListener('submit', login)


