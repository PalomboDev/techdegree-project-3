// Constant Variables
const doc = document; //Shorten document to doc for efficiency
const nameInput = doc.querySelector("#name");
const emailInput = doc.querySelector("#mail");
const titleSelection = doc.querySelector("#title");
const designSelection = doc.querySelector("#design");
const color = doc.querySelector("#color");
const closedOption = doc.createElement("option");
const activityFieldSet = doc.querySelector("fieldset.activities");
const activityTotalLabel = doc.createElement("label");
const paymentSelection = doc.querySelector("#payment");
const creditCardDiv = doc.querySelector("#credit-card");
const paypalDiv = doc.querySelector("#paypal");
const bitcoinDiv = doc.querySelector("#bitcoin");
const registerButton = doc.querySelector("button[type='submit']");

// Let Variables
let activityTotal = 0;

// Theme
const selectTheme = "Please select a T-shirt theme";

// Payment
const selectPaymentValue = "select method";


// JQuery Variables
const $otherTextBox = $("#other-title"); // Make hiding easier.

// Functions
// ------------------------------------

// Sets element's display to none
function hideElement(element) {
    element.style.display = "none";
}

// Sets element's display to ""
function showElement(element) {
    element.style.display = "";
}

// Check if an element's display is set to none
function isElementHidden(element) {
    if (element.style.display == "none") {
        return true;
    }

    return false;
}

// Gets the design and updates color options to that theme
function updateColorOptions(theme) {
    const currentOptions = [];
    const colorDiv = doc.querySelector("#colors-js-puns");

    for (let child of color.options) {
        switch (theme) {
            case selectTheme: {
                hideElement(child);
                hideElement(colorDiv);
                break;
            }

            case "Theme - JS Puns": {
                if (child.value === "cornflowerblue" ||
                    child.value === "darkslategrey" ||
                    child.value === "gold") {
                    showElement(child);
                    showElement(colorDiv);
                } else {
                    hideElement(child)
                }

                break;
            }

            case "Theme - I ♥ JS": {
                if (child.value === "tomato" ||
                    child.value === "steelblue" ||
                    child.value === "dimgrey") {
                    showElement(child);
                    showElement(colorDiv);
                } else {
                    hideElement(child)
                }
                break;
            }

            default: {
                hideElement(child);
                hideElement(colorDiv);
                break;
            }
        }

        if (!isElementHidden(child)) {
            currentOptions.push(child);
        }
    }

    if (currentOptions.length > 0) {
        selected(currentOptions[0]);
    }
}

// Display proper payment div
function updatePaymentDiv(paymentValue) {

    function setCreditCard() {
        selected(paymentSelection.options[1]);
    }

    function handleDiv(paymentOption) {
        switch (paymentOption) {
            case "Credit Card": {
                hideElement(paypalDiv);
                hideElement(bitcoinDiv);
                showElement(creditCardDiv);
                break;
            }

            case "PayPal": {
                hideElement(bitcoinDiv);
                hideElement(creditCardDiv);
                showElement(paypalDiv);
                break;
            }

            case "Bitcoin": {
                hideElement(paypalDiv);
                hideElement(creditCardDiv);
                showElement(bitcoinDiv);
                break;
            }

            default: {
                break;
            }
        }
    }

    if (paymentValue == selectPaymentValue) {
        setCreditCard();
    } else {
        handleDiv(paymentValue);
    }
}

// Make element selected
function selected(element) {
    element.selected = "selected";
}

// Set the default option to the variable selectTheme
function selectDefaultColor() {
    selected(closedOption);
}

// Get rid of white spaces
function trimSpaces(string) {
    return string.trim("");
}

function isEmpty(string) {
    if (string == null || trimSpaces(string) === "") {
        return true;
    }

    return false;
}

// https://emailregex.com/
function validateEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

function isNumberTrimmed(number) {
    const trimmedNumber = trimSpaces(number);
    const trimmedNumberRegex = /^[0-9]*$/gm;

    if (trimmedNumberRegex.test(trimmedNumber)) {
        return true;
    }

    return false;
}

function handleInvalid(element) {
    element.style.borderBottom = "5px solid red";
}

function handleValid(element) {
    element.style.borderBottom = "5px solid green";
}


function handleSubmit() {

    if (isEmpty(nameInput.value)) {
        handleInvalid(nameInput);
    } else {
        handleValid(nameInput);
    }

    if (!validateEmail(emailInput.value)) {
        handleInvalid(emailInput);
    } else {
        handleValid(emailInput);
    }

    const checkboxes = activityFieldSet.querySelectorAll("input");
    const checkedCheckboxes = [];

    checkboxes.forEach(cb => { if (cb.checked) { checkedCheckboxes.push(cb); }});

    if (checkedCheckboxes.length === 0) {
        handleInvalid(activityFieldSet);
    } else {
        handleValid(activityFieldSet);
    }

    if (paymentSelection.options[paymentSelection.selectedIndex].value === "Credit Card") {
        const cardNumber = doc.querySelector("#cc-num");
        const zipCodeNumber = doc.querySelector("#zip");
        const cvvNumber = doc.querySelector("#cvv");

        if (!isNumberTrimmed(cardNumber.value) || !(cardNumber.value.length >= 13 && cardNumber.value.length <= 16)) {
            handleInvalid(cardNumber);

            if (trimSpaces(cardNumber.value) === "") {
                cardNumber.placeholder = "Input was blank";
            } else if (!isNumberTrimmed(cardNumber.value)) {
                cardNumber.value = "";
                cardNumber.placeholder = "Enter a Number";
            } else if (!(cardNumber.value.length >= 13 && cardNumber.value.length <= 16)) {
                cardNumber.value = "";
                cardNumber.placeholder = "Number amount between 12-17";
            }
        } else {
            handleValid(cardNumber);
        }

        if (!isNumberTrimmed(zipCodeNumber.value) || zipCodeNumber.value.length !== 5) {
            handleInvalid(zipCodeNumber);
        } else {
            handleValid(zipCodeNumber);
        }

        if (!isNumberTrimmed(cvvNumber.value) || cvvNumber.value.length !== 3) {
            handleInvalid(cvvNumber);
        } else {
            handleValid(cvvNumber);
        }
    }
}

// Initialization
// ------------------------------------
// Focus first on first text field
nameInput.focus();

// Hide other job role input
$otherTextBox.hide();

// Hide all color options;
updateColorOptions(selectTheme);

// Empty Color Selector for T-Shirts
closedOption.appendChild(doc.createTextNode("Please select a T-shirt theme"));
color.insertBefore(closedOption, color.firstChild);
selectDefaultColor();

// Add Total Label to Activities
activityTotalLabel.textContent = "Total: $0";
activityTotalLabel.id = "activities-total";
activityFieldSet.appendChild(activityTotalLabel);

// Hide PayPal and Bitcoin Div
hideElement(paypalDiv);
hideElement(bitcoinDiv);

// Select credit-card div on load
selected(paymentSelection.options[1]);
// ------------------------------------

emailInput.addEventListener("input", (event) => {
    const invalidEmail = doc.querySelector("#invalid-email");

    if (!validateEmail(emailInput.value)) {

        if (!invalidEmail) {
            const tempInvalidEmail = doc.createElement("label");

            tempInvalidEmail.textContent = "Invalid email";
            tempInvalidEmail.style.color = "red";
            tempInvalidEmail.id = "invalid-email";

            emailInput.parentElement.insertBefore(tempInvalidEmail, emailInput)
        }

        handleInvalid(emailInput);
    } else {
        if (invalidEmail) {
            emailInput.parentElement.removeChild(invalidEmail);
            handleValid(emailInput);
        }
    }
});

// Checks for the click of the "other" option in the selection "Job Role"
titleSelection.addEventListener("click", (event) => {
    const otherTextBoxHidden = $otherTextBox.is(":hidden"); // Don't want to use redundant code

    if (titleSelection.options[event.target.selectedIndex].text === "Other") {
        if (otherTextBoxHidden) {
            $otherTextBox.show();
        }
    } else {
        if (!otherTextBoxHidden) {
            $otherTextBox.hide();
        }
    }
});

// Make sure a theme is picked before further unlocking other options
designSelection.addEventListener("click", (event) => {
    const selectedOption = designSelection.options[event.target.selectedIndex];

    if (selectedOption.text === "Select Theme") {
        updateColorOptions(selectTheme);
        selectDefaultColor();
    } else {
        updateColorOptions(selectedOption.text);
    }
});

// Activities field set click event listener
activityFieldSet.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        const name = event.target.name;

        if (event.target.checked) {
            if (name === "all") {
                activityTotal += 200;
            } else {
                activityTotal += 100;
            }

            switch (name) {
                case "js-frameworks": {
                    activityFieldSet.querySelector("input[name='express']").setAttribute("disabled", true);
                    break;
                }

                case "js-libs": {
                    activityFieldSet.querySelector("input[name='node']").setAttribute("disabled", true);
                    break;
                }

                case "express": {
                    activityFieldSet.querySelector("input[name='js-frameworks']").setAttribute("disabled", true);
                    break;
                }

                case "node": {
                    activityFieldSet.querySelector("input[name='js-libs']").setAttribute("disabled", true);
                    break;
                }
            }
        } else {
            if (name === "all") {
                activityTotal -= 200;
            } else {
                activityTotal -= 100;
            }

            switch (name) {
                case "js-frameworks": {
                    activityFieldSet.querySelector("input[name='express']").removeAttribute("disabled");
                    break;
                }

                case "js-libs": {
                    activityFieldSet.querySelector("input[name='node']").removeAttribute("disabled");
                    break;
                }

                case "express": {
                    activityFieldSet.querySelector("input[name='js-frameworks']").removeAttribute("disabled");
                    break;
                }

                case "node": {
                    activityFieldSet.querySelector("input[name='js-libs']").removeAttribute("disabled");
                    break;
                }
            }
        }
        activityTotalLabel.textContent = "Total: $" + activityTotal;
    }
});

// Handles which payment method to display
paymentSelection.addEventListener("click", (event) => {
    const selectedOption = paymentSelection.options[event.target.selectedIndex];
    const value = selectedOption.value;

    updatePaymentDiv(value);

});

registerButton.addEventListener("click", (event) => {
    event.preventDefault();

    handleSubmit();
});