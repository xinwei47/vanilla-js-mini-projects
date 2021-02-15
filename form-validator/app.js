// Username must be at least 3 characters
// Email must have '@'
// Password must be at least 6 characters
// Password2 is required and must match Password

const username = document.querySelector('#username')
const usernameErr = document.querySelector('#usernameErr')
const email = document.querySelector('#email')
const emailErr = document.querySelector('#emailErr')
const password = document.querySelector('#password')
const pwdErr = document.querySelector('#pwdErr')
const password2 = document.querySelector('#password2')
const pwd2Err = document.querySelector('#pwd2Err')
const btn = document.querySelector('button')

const isValidUsername = username => username && username.value.trim().length > 3;
const isValidEmail = email => {
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && emailFormat.test(email.value);
};
const isValidPwd = password => password.value.length >= 6;
const isValidPwd2 = password2 => password2.value && password.value === password2.value;

const validateResult = (isValidInput, input, err) => {
    if (isValidInput) {
        input.classList.add('success')
    } else {
        input.classList.add('err')
        err.className = 'errMsgDisplay';
    }
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    validateResult(isValidUsername(username), username, usernameErr);
    validateResult(isValidEmail(email), email, emailErr);
    validateResult(isValidPwd(password), password, pwdErr);
    validateResult(isValidPwd2(password2), password2, pwd2Err);
})