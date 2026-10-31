function calculateGrade()
{
    let name = document.getElementById("name").value;
    let marks = Number(document.getElementById("marks").value);

    // Form Validation
    if(name == "")
    {
        alert("Please enter student name.");
        return;
    }

    if(marks == "" || isNaN(marks))
    {
        alert("Please enter marks.");
        return;
    }

    if(marks < 0 || marks > 100)
    {
        alert("Marks should be between 0 and 100.");
        return;
    }

    let grade;

    // Control Structures
    if(marks >= 90)
    {
        grade = "A+";
    }
    else if(marks >= 80)
    {
        grade = "A";
    }
    else if(marks >= 70)
    {
        grade = "B";
    }
    else if(marks >= 60)
    {
        grade = "C";
    }
    else if(marks >= 50)
    {
        grade = "D";
    }
    else
    {
        grade = "Fail";
    }

    document.getElementById("result").innerHTML =
    `
    <h3>Result</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Marks:</b> ${marks}</p>
    <p><b>Grade:</b> ${grade}</p>
    `;
}