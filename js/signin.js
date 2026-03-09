const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const signinBTN = document.getElementById('signin-btn');

signinBTN.addEventListener('click', () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    if( username === 'admin' && password === 'admin123'){
        window.location.replace('all.html');
    }else{
        alert("Invalid Username and Password");
    }
});
