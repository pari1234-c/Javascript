// ----------------------------------------
// DOM ELEMENTS
// ----------------------------------------

const username =
    document.getElementById("username");

const fontSize =
    document.getElementById("fontSize");

const notifications =
    document.getElementById("notifications");

const saveBtn =
    document.getElementById("saveBtn");

const resetBtn =
    document.getElementById("resetBtn");

const previewName =
    document.getElementById("previewName");

const avatarLetter =
    document.getElementById("avatarLetter");

const previewTheme =
    document.getElementById("previewTheme");

const previewFont =
    document.getElementById("previewFont");

const previewNotification =
    document.getElementById(
        "previewNotification"
    );

const localStorageStatus =
    document.getElementById(
        "localStorageStatus"
    );

const sessionStorageStatus =
    document.getElementById(
        "sessionStorageStatus"
    );


// ----------------------------------------
// THEME SELECTION
// ----------------------------------------

const themeButtons =
    document.querySelectorAll(".theme-btn");

let currentTheme = "light";


themeButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            currentTheme =
                button.dataset.theme;

            applyTheme(currentTheme);

            updatePreview();

        }
    );

});


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }


    themeButtons.forEach(function(button) {

        button.classList.remove("active");

        if (
            button.dataset.theme === theme
        ) {
            button.classList.add("active");
        }

    });
}


// ----------------------------------------
// FONT SIZE
// ----------------------------------------

fontSize.addEventListener(
    "change",
    function() {

        applyFontSize(fontSize.value);

        updatePreview();

    }
);


function applyFontSize(size) {

    document.body.classList.remove(
        "small",
        "medium",
        "large"
    );

    document.body.classList.add(size);
}


// ----------------------------------------
// LAYOUT
// ----------------------------------------

const layoutOptions =
    document.querySelectorAll(
        'input[name="layout"]'
    );


layoutOptions.forEach(function(option) {

    option.addEventListener(
        "change",
        function() {

            applyLayout(option.value);

        }
    );

});


function applyLayout(layout) {

    if (layout === "compact") {

        document.body.classList.add("compact");

    } else {

        document.body.classList.remove(
            "compact"
        );

    }
}


// ----------------------------------------
// LIVE USERNAME PREVIEW
// ----------------------------------------

username.addEventListener(
    "input",
    function() {

        updatePreview();

    }
);


notifications.addEventListener(
    "change",
    function() {

        updatePreview();

    }
);


function updatePreview() {

    const name =
        username.value.trim();

    previewName.textContent =
        name || "User";


    avatarLetter.textContent =
        name
            ? name.charAt(0).toUpperCase()
            : "U";


    previewTheme.textContent =
        currentTheme === "dark"
            ? "Dark"
            : "Light";


    previewFont.textContent =
        fontSize.value.charAt(0).toUpperCase()
        + fontSize.value.slice(1);


    previewNotification.textContent =
        notifications.checked
            ? "Enabled"
            : "Disabled";
}


// ----------------------------------------
// SAVE PREFERENCES
// ----------------------------------------

saveBtn.addEventListener(
    "click",
    savePreferences
);


function savePreferences() {

    const selectedLayout =
        document.querySelector(
            'input[name="layout"]:checked'
        ).value;


    // Object containing all preferences
    const preferences = {

        username:
            username.value.trim(),

        theme:
            currentTheme,

        fontSize:
            fontSize.value,

        layout:
            selectedLayout,

        notifications:
            notifications.checked

    };


    // Convert object to JSON
    const preferenceData =
        JSON.stringify(preferences);


    // Save permanently
    localStorage.setItem(
        "userPreferences",
        preferenceData
    );


    // Save current session information
    sessionStorage.setItem(
        "sessionUser",
        username.value.trim() || "Guest"
    );


    localStorageStatus.textContent =
        "Preferences saved successfully";

    sessionStorageStatus.textContent =
        "Current user: " +
        (username.value.trim() || "Guest");


    alert(
        "Preferences saved successfully!"
    );
}


// ----------------------------------------
// LOAD SAVED PREFERENCES
// ----------------------------------------

function loadPreferences() {

    const savedData =
        localStorage.getItem(
            "userPreferences"
        );


    if (savedData) {

        const preferences =
            JSON.parse(savedData);


        username.value =
            preferences.username || "";


        currentTheme =
            preferences.theme || "light";


        fontSize.value =
            preferences.fontSize || "medium";


        notifications.checked =
            preferences.notifications !== false;


        applyTheme(currentTheme);

        applyFontSize(fontSize.value);


        layoutOptions.forEach(
            function(option) {

                option.checked =
                    option.value ===
                    preferences.layout;

            }
        );


        applyLayout(
            preferences.layout || "comfortable"
        );


        localStorageStatus.textContent =
            "Saved preferences loaded";


    } else {

        localStorageStatus.textContent =
            "No preferences saved";

    }


    // Read session storage
    const sessionUser =
        sessionStorage.getItem(
            "sessionUser"
        );


    if (sessionUser) {

        sessionStorageStatus.textContent =
            "Current user: " + sessionUser;

    } else {

        sessionStorageStatus.textContent =
            "New session";

    }


    updatePreview();
}


// ----------------------------------------
// RESET PREFERENCES
// ----------------------------------------

resetBtn.addEventListener(
    "click",
    function() {

        const confirmReset =
            confirm(
                "Reset all saved preferences?"
            );


        if (!confirmReset) {
            return;
        }


        // Remove stored data
        localStorage.removeItem(
            "userPreferences"
        );

        sessionStorage.removeItem(
            "sessionUser"
        );


        // Reset form
        username.value = "";

        currentTheme = "light";

        fontSize.value = "medium";

        notifications.checked = true;


        layoutOptions.forEach(
            function(option) {

                option.checked =
                    option.value ===
                    "comfortable";

            }
        );


        // Reset UI
        applyTheme("light");

        applyFontSize("medium");

        applyLayout("comfortable");

        updatePreview();


        localStorageStatus.textContent =
            "No preferences saved";

        sessionStorageStatus.textContent =
            "Session data cleared";


        alert(
            "Preferences have been reset."
        );
    }
);


// ----------------------------------------
// INITIALIZE APPLICATION
// ----------------------------------------

loadPreferences();