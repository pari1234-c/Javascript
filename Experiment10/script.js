// ------------------------------------------
// GLOBAL DATA
// ------------------------------------------

let employees = [];


// ------------------------------------------
// DOM ELEMENTS
// ------------------------------------------

const employeeTable =
    document.getElementById("employeeTable");

const searchInput =
    document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

const sortSalary =
    document.getElementById("sortSalary");

const fetchBtn =
    document.getElementById("fetchBtn");

const jqueryBtn =
    document.getElementById("jqueryBtn");

const loader =
    document.getElementById("loader");


// ------------------------------------------
// FETCH API
// ------------------------------------------

fetchBtn.addEventListener(
    "click",
    loadUsingFetch
);


function loadUsingFetch() {

    showLoader();

    fetch("employees.json")

        .then(function(response) {

            if (!response.ok) {

                throw new Error(
                    "Unable to load JSON data."
                );

            }

            return response.json();

        })

        .then(function(data) {

            employees = data;

            renderTable(employees);

            updateStatistics(employees);

        })

        .catch(function(error) {

            console.error(error);

            alert(
                "Error loading employee data."
            );

        })

        .finally(function() {

            hideLoader();

        });
}


// ------------------------------------------
// JQUERY getJSON()
// ------------------------------------------

jqueryBtn.addEventListener(
    "click",
    loadUsingJQuery
);


function loadUsingJQuery() {

    showLoader();


    $.getJSON("employees.json")

        .done(function(data) {

            employees = data;

            renderTable(employees);

            updateStatistics(employees);

        })

        .fail(function() {

            alert(
                "Unable to load JSON using jQuery."
            );

        })

        .always(function() {

            hideLoader();

        });
}


// ------------------------------------------
// RENDER TABLE
// ------------------------------------------

function renderTable(data) {

    employeeTable.innerHTML = "";

    const noData =
        document.getElementById("noData");


    if (data.length === 0) {

        noData.style.display = "block";

        return;

    }


    noData.style.display = "none";


    data.forEach(function(employee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>${employee.experience} years</td>

            <td>₹${employee.salary.toLocaleString("en-IN")}</td>

        `;


        employeeTable.appendChild(row);

    });

}


// ------------------------------------------
// SEARCH
// ------------------------------------------

searchInput.addEventListener(
    "input",
    applyFilters
);


departmentFilter.addEventListener(
    "change",
    applyFilters
);


sortSalary.addEventListener(
    "change",
    applyFilters
);


function applyFilters() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const department =
        departmentFilter.value;


    let filtered =
        employees.filter(function(employee) {

            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(searchValue)
                ||
                employee.email
                    .toLowerCase()
                    .includes(searchValue)
                ||
                employee.department
                    .toLowerCase()
                    .includes(searchValue);


            const matchesDepartment =
                department === "All"
                ||
                employee.department ===
                department;


            return (
                matchesSearch &&
                matchesDepartment
            );

        });


    // --------------------------------------
    // SORTING
    // --------------------------------------

    if (sortSalary.value === "low") {

        filtered.sort(function(a, b) {

            return a.salary - b.salary;

        });

    }


    if (sortSalary.value === "high") {

        filtered.sort(function(a, b) {

            return b.salary - a.salary;

        });

    }


    renderTable(filtered);

    updateStatistics(filtered);
}


// ------------------------------------------
// STATISTICS
// ------------------------------------------

function updateStatistics(data) {

    const total =
        data.length;


    document.getElementById(
        "totalEmployees"
    ).textContent = total;


    if (total === 0) {

        document.getElementById(
            "averageSalary"
        ).textContent = "₹0";


        document.getElementById(
            "highestSalary"
        ).textContent = "₹0";

        return;

    }


    const totalSalary =
        data.reduce(
            function(sum, employee) {

                return sum + employee.salary;

            },
            0
        );


    const average =
        totalSalary / total;


    const highest =
        Math.max.apply(
            null,
            data.map(function(employee) {

                return employee.salary;

            })
        );


    document.getElementById(
        "averageSalary"
    ).textContent =
        "₹" +
        Math.round(average)
            .toLocaleString("en-IN");


    document.getElementById(
        "highestSalary"
    ).textContent =
        "₹" +
        highest.toLocaleString("en-IN");
}


// ------------------------------------------
// LOADER
// ------------------------------------------

function showLoader() {

    loader.style.display = "block";

}


function hideLoader() {

    loader.style.display = "none";

}


// ------------------------------------------
// INITIAL LOAD
// ------------------------------------------

loadUsingFetch();