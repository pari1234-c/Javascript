const form = document.getElementById("gymForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const planInput = document.getElementById("plan");
const durationInput = document.getElementById("duration");

const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput = document.getElementById("terms");


// ---------------------------------------
// LIVE VALIDATION
// ---------------------------------------

nameInput.addEventListener("input", validateName);
ageInput.addEventListener("input", validateAge);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);

passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);


// ---------------------------------------
// NAME VALIDATION
// ---------------------------------------

function validateName() {

    const name = nameInput.value.trim();

    if (name.length < 3) {

        showError(
            nameInput,
            "nameError",
            "Name must contain at least 3 characters."
        );

        return false;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {

        showError(
            nameInput,
            "nameError",
            "Name can contain only letters."
        );

        return false;
    }

    showSuccess(nameInput, "nameError", "Valid name");
    return true;
}


// ---------------------------------------
// AGE VALIDATION
// ---------------------------------------

function validateAge() {

    const age = Number(ageInput.value);

    if (age < 15 || age > 70) {

        showError(
            ageInput,
            "ageError",
            "Age must be between 15 and 70."
        );

        return false;
    }

    showSuccess(ageInput, "ageError", "Valid age");
    return true;
}


// ---------------------------------------
// EMAIL VALIDATION
// ---------------------------------------

function validateEmail() {

    const email = emailInput.value.trim();

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {

        showError(
            emailInput,
            "emailError",
            "Enter a valid email address."
        );

        return false;
    }

    showSuccess(emailInput, "emailError", "Valid email");
    return true;
}


// ---------------------------------------
// PHONE VALIDATION
// ---------------------------------------

function validatePhone() {

    const phone = phoneInput.value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {

        showError(
            phoneInput,
            "phoneError",
            "Enter a valid 10-digit phone number."
        );

        return false;
    }

    showSuccess(phoneInput, "phoneError", "Valid phone number");
    return true;
}


// ---------------------------------------
// PASSWORD VALIDATION
// ---------------------------------------

function validatePassword() {

    const password = passwordInput.value;

    if (password.length < 8) {

        showError(
            passwordInput,
            "passwordError",
            "Password must contain at least 8 characters."
        );

        return false;
    }

    if (!/[A-Z]/.test(password)) {

        showError(
            passwordInput,
            "passwordError",
            "Password must contain an uppercase letter."
        );

        return false;
    }

    if (!/[0-9]/.test(password)) {

        showError(
            passwordInput,
            "passwordError",
            "Password must contain a number."
        );

        return false;
    }

    showSuccess(
        passwordInput,
        "passwordError",
        "Strong password"
    );

    return true;
}


// ---------------------------------------
// CONFIRM PASSWORD
// ---------------------------------------

function validateConfirmPassword() {

    if (
        confirmPasswordInput.value !==
        passwordInput.value
    ) {

        showError(
            confirmPasswordInput,
            "confirmError",
            "Passwords do not match."
        );

        return false;
    }

    showSuccess(
        confirmPasswordInput,
        "confirmError",
        "Passwords match"
    );

    return true;
}


// ---------------------------------------
// BMI CALCULATION
// ---------------------------------------

heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

function calculateBMI() {

    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if (height <= 0 || weight <= 0) {
        return;
    }

    const heightInMeters = height / 100;

    const bmi =
        weight / (heightInMeters * heightInMeters);

    document.getElementById("bmiValue").textContent =
        bmi.toFixed(2);

    let status;

    if (bmi < 18.5) {
        status = "Underweight";
    }
    else if (bmi < 25) {
        status = "Normal";
    }
    else if (bmi < 30) {
        status = "Overweight";
    }
    else {
        status = "Obese";
    }

    document.getElementById("bmiStatus").textContent =
        status;
}


// ---------------------------------------
// MEMBERSHIP FEE CALCULATION
// ---------------------------------------

planInput.addEventListener("change", calculateFee);
durationInput.addEventListener("change", calculateFee);

document
    .querySelectorAll('input[name="trainer"]')
    .forEach(function (radio) {

        radio.addEventListener(
            "change",
            calculateFee
        );

    });


function calculateFee() {

    const plan = planInput.value;
    const duration = Number(durationInput.value);

    let monthlyFee = 0;

    if (plan === "Basic") {
        monthlyFee = 1000;
    }
    else if (plan === "Premium") {
        monthlyFee = 1800;
    }
    else if (plan === "Elite") {
        monthlyFee = 2500;
    }

    const membershipFee =
        monthlyFee * duration;

    const trainer =
        document.querySelector(
            'input[name="trainer"]:checked'
        ).value;

    let trainerFee = 0;

    if (trainer === "Yes") {
        trainerFee = 500 * duration;
    }

    const total =
        membershipFee + trainerFee;

    document.getElementById("membershipFee")
        .textContent = `₹${membershipFee}`;

    document.getElementById("trainerFee")
        .textContent = `₹${trainerFee}`;

    document.getElementById("totalFee")
        .textContent = `₹${total}`;
}


// ---------------------------------------
// FORM SUBMISSION
// ---------------------------------------

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const validName = validateName();
    const validAge = validateAge();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validPassword = validatePassword();
    const validConfirm = validateConfirmPassword();

    const plan = planInput.value;
    const duration = durationInput.value;

    let validPlan = true;

    if (plan === "" || duration === "") {

        document.getElementById("planError")
            .textContent =
            "Please select membership plan and duration.";

        document.getElementById("planError")
            .className = "error";

        validPlan = false;
    }
    else {

        document.getElementById("planError")
            .textContent = "";

    }


    if (!termsInput.checked) {

        document.getElementById("termsError")
            .textContent =
            "You must accept the terms and conditions.";

        document.getElementById("termsError")
            .className = "error";

        return;
    }


    if (
        validName &&
        validAge &&
        validEmail &&
        validPhone &&
        validPassword &&
        validConfirm &&
        validPlan
    ) {

        displaySummary();
    }

});


// ---------------------------------------
// DISPLAY ADMISSION SUMMARY
// ---------------------------------------

function displaySummary() {

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const trainer =
        document.querySelector(
            'input[name="trainer"]:checked'
        );

    const total =
        document.getElementById("totalFee")
            .textContent;

    const summary =
        document.getElementById("summary");

    const summaryContent =
        document.getElementById("summaryContent");

    summaryContent.innerHTML = `

        <p><strong>Name:</strong>
            ${nameInput.value}
        </p>

        <p><strong>Age:</strong>
            ${ageInput.value}
        </p>

        <p><strong>Email:</strong>
            ${emailInput.value}
        </p>

        <p><strong>Phone:</strong>
            ${phoneInput.value}
        </p>

        <p><strong>Gender:</strong>
            ${gender ? gender.value : "Not specified"}
        </p>

        <p><strong>Membership:</strong>
            ${planInput.value}
        </p>

        <p><strong>Duration:</strong>
            ${durationInput.value} month(s)
        </p>

        <p><strong>Personal Trainer:</strong>
            ${trainer.value}
        </p>

        <p><strong>Total Amount:</strong>
            ${total}
        </p>

    `;

    summary.classList.remove("hidden");

    summary.scrollIntoView({
        behavior: "smooth"
    });
}


// ---------------------------------------
// RESET FORM
// ---------------------------------------

document
    .getElementById("resetBtn")
    .addEventListener("click", function() {

        document
            .querySelectorAll("small")
            .forEach(function(element) {
                element.textContent = "";
            });

        document
            .querySelectorAll("input, select")
            .forEach(function(element) {
                element.classList.remove(
                    "valid",
                    "invalid"
                );
            });

        document
            .getElementById("summary")
            .classList.add("hidden");

        document.getElementById("bmiValue")
            .textContent = "--";

        document.getElementById("bmiStatus")
            .textContent =
            "Enter height and weight";

        document.getElementById("membershipFee")
            .textContent = "₹0";

        document.getElementById("trainerFee")
            .textContent = "₹0";

        document.getElementById("totalFee")
            .textContent = "₹0";
    });


// ---------------------------------------
// ERROR / SUCCESS FUNCTIONS
// ---------------------------------------

function showError(input, errorId, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    const error =
        document.getElementById(errorId);

    error.textContent = message;
    error.className = "error";
}


function showSuccess(input, errorId, message) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    const error =
        document.getElementById(errorId);

    error.textContent = message;
    error.className = "success";
}