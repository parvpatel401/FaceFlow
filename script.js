const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const slider = document.getElementById('slider');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginBtn.addEventListener('click', () => {
  slider.style.left = '0%';
  loginBtn.classList.add('active');
  registerBtn.classList.remove('active');
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
});

registerBtn.addEventListener('click', () => {
  slider.style.left = '50%';
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
});
