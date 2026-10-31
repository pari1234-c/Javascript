// Email Validation
function validateEmail() {

    let email = document.getElementById("email").value;

    // Regular expression for email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
        document.getElementById("emailResult").innerText =
            "Valid Email Address";
        document.getElementById("emailResult").style.color = "green";
    } else {
        document.getElementById("emailResult").innerText =
            "Invalid Email Address";
        document.getElementById("emailResult").style.color = "red";
    }
}


// Data Extraction
function extractData() {

    let text = document.getElementById("textInput").value;

    // Regular expression for extracting emails
    let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    // Regular expression for extracting 10 digit phone numbers
    let phonePattern = /\b\d{10}\b/g;

    let emails = text.match(emailPattern);
    let phones = text.match(phonePattern);

    document.getElementById("emails").innerText =
        emails ? emails.join(", ") : "No emails found";

    document.getElementById("phones").innerText =
        phones ? phones.join(", ") : "No phone numbers found";
}


// Text Analysis
function analyzeText() {

    let text = document.getElementById("analysisText").value;

    // String functions
    let characters = text.length;

    let words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    let uppercaseText = text.toUpperCase();

    let lowercaseText = text.toLowerCase();

    // Count vowels using regular expression
    let vowels = text.match(/[aeiou]/gi);
    let vowelCount = vowels ? vowels.length : 0;

    // Count numbers using regular expression
    let numbers = text.match(/\d/g);
    let numberCount = numbers ? numbers.length : 0;

    document.getElementById("analysisResult").innerHTML = `
        <b>Number of Characters:</b> ${characters}<br>
        <b>Number of Words:</b> ${words}<br>
        <b>Number of Vowels:</b> ${vowelCount}<br>
        <b>Number of Digits:</b> ${numberCount}<br>
        <b>Uppercase:</b> ${uppercaseText}<br>
        <b>Lowercase:</b> ${lowercaseText}
    `;
}