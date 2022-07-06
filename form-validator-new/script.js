// 1. input cannot be empty
// 2. email must be valid: include "@", include ".com"
// 3. password must be valid: at least 8 characters, include symbols, numbers, and alphabets,
// 4. confirm password must be the same as entered password
// 5. when input is focused and then left, the input value will be validated. if failed, error message will show underneath if validation fails

const inputs = document.querySelectorAll('input');
const errors = document.querySelectorAll('.error');

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const usernameErr = document.querySelector('.error__username');
const emailErr = document.querySelector('.error__email');
const pwdErr = document.querySelector('.error__pwd');
const pwdErr2 = document.querySelector('.error__pwd2');

const submitBtn = document.querySelector('button');

const popupBox = document.querySelector('.popup-box');
const popup = document.querySelector('.popup');

let usernameIsValid = false;
let emailIsValid = false;
let pwdIsValid = false;
let pwd2IsValid = false;

inputs.forEach((input, ind) => {
  let inputTouched = false;

  input.onfocus = () => {
    errors[ind].innerHTML = '';
    inputTouched = true;
  };
  input.onblur = () => {
    if (inputTouched) {
      const inputDom = document.querySelector(`#${input.id}`);
      validateInput(inputDom, input.id);
    }
  };
});

const validateInput = (input, id) => {
  if (id === 'username') {
    validateUsername(input);
    return;
  }
  if (id === 'email') {
    validateEmail(input);
    return;
  }
  if (id === 'password') {
    validatePwd(input);
    return;
  }
  if (id === 'password2') {
    validatePwd2(input);
    return;
  }
};

const validateUsername = (username) => {
  usernameErr.innerHTML = '';
  checkInputEmpty(username, usernameErr);
  // username can only contain letters and numbers
  const usernameVal = username.value.toLowerCase().trim();
  if (usernameVal !== '') {
    if (/[^a-z0-9]/.test(usernameVal)) {
      showErr(
        username,
        'Username can only include letters and numbers.',
        usernameErr
      );
    } else {
      usernameIsValid = true;
      showSuccess(username);
    }
  }
  return;
};

const validateEmail = (email) => {
  emailErr.innerHTML = '';
  checkInputEmpty(email, emailErr);

  const emailVal = email.value.trim();
  if (emailVal !== '') {
    if (
      !emailVal.includes('.com') ||
      !emailVal.includes('@') ||
      emailVal.includes(' ')
    ) {
      showErr(email, 'Email address is not valid.', emailErr);
    } else {
      emailIsValid = true;
      showSuccess(email);
    }
  }
  return;
};

const validatePwd = (pwd) => {
  pwdErr.innerHTML = '';
  checkInputEmpty(pwd, pwdErr);

  // password must include letters (both lowercase and uppercase), numbers, and symbols
  const pwdVal = pwd.value;
  if (pwdVal !== '') {
    if (pwdVal.length < 8) {
      showErr(pwd, 'Password must be at least 8 characters.', pwdErr);
    }
    if (!/[a-z]/.test(pwdVal)) {
      showErr(pwd, 'Password must include lowercase letters a-z.', pwdErr);
    }
    if (!/[A-Z]/.test(pwdVal)) {
      showErr(pwd, 'Password must include uppercase letters A-Z.', pwdErr);
    }
    if (!/[\d]/.test(pwdVal)) {
      showErr(pwd, 'Password must include numbers 0-9.', pwdErr);
    }
    pwdIsValid = true;
    showSuccess(pwd);
  }
};

const validatePwd2 = (pwd2) => {
  pwdErr2.innerHTML = '';
  checkInputEmpty(pwd2, pwdErr2);

  const pwdVal2 = pwd2.value;
  if (pwdVal2 !== '' && pwdVal2 !== password.value) {
    showErr(pwd2, "Password doesn't match.", pwdErr2);
  } else {
    pwd2IsValid = true;
    showSuccess(pwd2);
  }
};

const checkInputEmpty = (input, errList) => {
  if (input.value.trim() === '') {
    showErr(input, 'Field cannot be empty.', errList);
    input.className = 'invalid';
  }
  return;
};

const showErr = (input, msg, errList) => {
  const li = document.createElement('li');
  li.innerText = msg;
  errList.append(li);

  input.className = 'invalid';
};

const showSuccess = (input) => {
  input.className = 'valid';
};

const submitForm = (event) => {
  event.preventDefault();
  //   inputs.forEach((input) => {
  //     validateInput(document.querySelector(`#${input.id}`), input.id);
  //   });

  const formIsValid =
    usernameIsValid && emailIsValid && pwdIsValid && pwd2IsValid;
  if (formIsValid) {
    popupBox.classList.remove('hidden');
  }
};

const closePopup = (event) => {
  if (!popup.contains(event.target)) {
    popupBox.classList.add('hidden');
    inputs.forEach((input) => {
      input.value = '';
    });
  }
};

submitBtn.addEventListener('click', submitForm);
popupBox.addEventListener('click', closePopup);