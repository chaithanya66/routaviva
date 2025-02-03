import {post} from "../../api/http-client.js";

const form = document.querySelector('#form');
const username = document.querySelector('#name-input');
const email = document.querySelector('#email-input');
const password = document.querySelector('#password-input');
const cpassword = document.querySelector('#c-password-input');

function validateInputs() {
    const usernameval = username.value.trim();
    const emailval = email.value.trim();
    const passwordval = password.value.trim();
    const cpasswordval = cpassword.value.trim();

    if (usernameval === '') {
        setError(username, 'User name is required');
    } else {
        setSuccess(username);
    }
    if (emailval === '') {
        setError(email, 'Email is required');
    } else if (!validateEmail(emailval)) {
        setError(email, 'Please enter a valid email');
    } else {
        setSuccess(email);
    }
    if (passwordval === '') {
        setError(password, 'Password is required');
    } else if (passwordval.length < 8) {
        setError(password, 'Password must be at least 8 characters');
    }
     else {
        setSuccess(password);
    }
    if (cpasswordval === '') {
        setError(cpassword, 'Confirm password is required');
    } else if (cpasswordval !== passwordval) {
        setError(cpassword, 'Passwords do not match');
    } else {
        setSuccess(cpassword);
    }
    return true;
}

function validateGenericInput(fieldValue,field,message){
    if (fieldValue === '') {
        setError(field, message);
        return false;
    } else {
        setSuccess(field);
        return true;
    }
}

function setError(element, message) {
    const inputype = element.parentElement;
    const errorElement = inputype.querySelector('.error');

    errorElement.innerText = message;
    inputype.classList.add('error');
    inputype.classList.remove('success');
}

function setSuccess(element) {
    const inputype = element.parentElement;
    const errorElement = inputype.querySelector('.error');

    errorElement.innerText = '';
    inputype.classList.add('success');
    inputype.classList.remove('error');
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = document.getElementById('button-input'); // Correctly reference the button
    button.classList.add('loading');
    button.disabled = true;

    if (validateInputs()) { // Ensure inputs are validated before registration
        await registerUser();
    } 
});

export async function registerUser() {
    console.log("Inside register user");

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const usernameValue = username.value.trim();

    if (!emailValue || !passwordValue || !usernameValue) {
        alert("All fields are required.");
        return;
    }
    const body = {
        email: emailValue,
        password: passwordValue,
        fullName: usernameValue
    };

    console.log("Body is " + JSON.stringify(body));

    const button = document.getElementById('button-input');
    button.classList.add('loading');
    button.disabled = true;
    try {
        const response = await post("https://rutavivaunsecured.onrender.com/register", body);
        console.log("Response is ", response)
        if (response.code === 200) {
            console.log("Registration successful:", response);
            window.location.href = '../homepage/homepage.html';
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            alert("Registration failed. Please check your inputs or try again later.");
        }
    } catch (error) {
        console.error("Registration failed: ", error.message || error);
        alert("An error occurred. Please try again later.");
    } finally {
        button.classList.remove('loading');
        button.disabled = false;
    }
}