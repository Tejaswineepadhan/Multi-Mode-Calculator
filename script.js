const display = document.getElementById("display");

// Mode Sections
const calcMode = document.getElementById("calcMode");
const currencyMode = document.getElementById("currencyMode");
const areaMode = document.getElementById("areaMode");

// Mode Buttons
const calcBtn = document.getElementById("calcBtn");
const currencyBtn = document.getElementById("currencyBtn");
const areaBtn = document.getElementById("areaBtn");

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// 🔥 Helper function to manage active button
function setActiveButton(activeButton) {
    calcBtn.classList.remove("active");
    currencyBtn.classList.remove("active");
    areaBtn.classList.remove("active");

    activeButton.classList.add("active");
}

// 🔹 Show Calculator
function showCalculator() {
    speak("Calculator mode");

    calcMode.classList.remove("hidden");
    currencyMode.classList.add("hidden");
    areaMode.classList.add("hidden");

    setActiveButton(calcBtn);
}

// 🔹 Show Currency
function showCurrency() {
    speak("Currency converter mode");

    calcMode.classList.add("hidden");
    currencyMode.classList.remove("hidden");
    areaMode.classList.add("hidden");

    setActiveButton(currencyBtn);
}

// 🔹 Show Area
function showArea() {
    speak("Area calculator mode");

    calcMode.classList.add("hidden");
    currencyMode.classList.add("hidden");
    areaMode.classList.remove("hidden");

    setActiveButton(areaBtn);
}

// 🔹 Calculator Functions
function press(val) {
    speak(val);
    if (val === "+/-") {
        display.value = display.value ? -display.value : "";
    } else {
        display.value += val;
    }
}

function calculate() {
    speak("equals");
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function backspace() {
    speak("backspace");

    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    speak("clear");
    display.value = "";
}

// 🔹 Currency Converter
function convertCurrency() {
    speak("convert");

    let amount = document.getElementById("currencyAmount").value;
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;

    let rates = {
        USD: 1,
        INR: 83,
        EUR: 0.92
    };

    let result = (amount / rates[from]) * rates[to];
    display.value = result.toFixed(2);
}

// 🔹 Area Calculator
function updateShapeInputs() {
    let shape = document.getElementById("shapeSelect").value;
    let inputs = document.getElementById("shapeInputs");
    inputs.innerHTML = "";

    if (shape === "circle") {
        inputs.innerHTML = '<input type="number" id="radius" placeholder="Radius">';
    }
    if (shape === "square") {
        inputs.innerHTML = '<input type="number" id="side" placeholder="Side">';
    }
    if (shape === "triangle") {
        inputs.innerHTML =
            '<input type="number" id="base" placeholder="Base">' +
            '<input type="number" id="height" placeholder="Height">';
    }
    if (shape === "parallelogram") {
        inputs.innerHTML =
            '<input type="number" id="base" placeholder="Base">' +
            '<input type="number" id="height" placeholder="Height">';
    }
    if (shape === "trapezium") {
        inputs.innerHTML =
            '<input type="number" id="a" placeholder="Side A">' +
            '<input type="number" id="b" placeholder="Side B">' +
            '<input type="number" id="height" placeholder="Height">';
    }
}

function calculateArea() {
    speak("calculate area");

    let shape = document.getElementById("shapeSelect").value;
    let area = 0;

    if (shape === "circle") {
        let r = document.getElementById("radius").value;
        area = Math.PI * r * r;
    }
    if (shape === "square") {
        let s = document.getElementById("side").value;
        area = s * s;
    }
    if (shape === "triangle") {
        let b = document.getElementById("base").value;
        let h = document.getElementById("height").value;
        area = 0.5 * b * h;
    }
    if (shape === "parallelogram") {
        let b = document.getElementById("base").value;
        let h = document.getElementById("height").value;
        area = b * h;
    }
    if (shape === "trapezium") {
        let a = parseFloat(document.getElementById("a").value);
        let b = parseFloat(document.getElementById("b").value);
        let h = document.getElementById("height").value;
        area = 0.5 * (a + b) * h;
    }

    display.value = area.toFixed(2);
}

// Initialize default shape inputs
updateShapeInputs();

// Set default active mode on load
setActiveButton(calcBtn);