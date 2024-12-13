import { parseJwt } from "../utility/parsejwt.js"
const loginform = document.getElementById('loginform')
const login = async (event)=>{
  event.preventDefault();
  const teacher = {
    email: document.getElementById('loginemail').value,   
    password:document.getElementById('loginpassword').value,
  }
  try { 
    const { data } = await axios.post('http://localhost:5000/speak/login', teacher );
    localStorage.setItem('token', data.token)    
    
    const decodedToken = parseJwt(data.token);
    localStorage.setItem('name', decodedToken.name)
    window.location.href="main.html"
  } catch (error) {
    localStorage.removeItem('token')
    console.log(error);
  }
}

loginform.addEventListener('submit', login)