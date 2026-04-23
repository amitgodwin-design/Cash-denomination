const denominations = [2000, 500, 200, 100, 50, 20, 10];

const grid = document.getElementById("denominationGrid");
const totalAmount = document.getElementById("totalAmount");
const resetBtn = document.getElementById("resetBtn");
const langBtn = document.getElementById("langBtn");
const amountWords = document.getElementById("amountWords");

let inputs = [];
let currentLang = "hi";

// 🔹 Render rows
function renderGrid() {
  grid.innerHTML = "";
  inputs = [];

  denominations.forEach(value => {
    const row = document.createElement("div");
    row.className = "row";

    const note = document.createElement("span");
    note.className = "note";
    note.textContent = `₹${value}`;

    const input = document.createElement("input");
    input.type = "number";
    input.inputMode = "numeric";
    input.min = "0";
    input.placeholder = "0";

    const rowTotal = document.createElement("span");
    rowTotal.className = "rowTotal";
    rowTotal.textContent = "₹0";

    input.addEventListener("input", () => {
      if (input.value < 0) input.value = 0;
      updateRowTotal(value, input, rowTotal);
      calculateTotal();
    });

    inputs.push({ value, input, rowTotal });

    row.appendChild(note);
    row.appendChild(input);
    row.appendChild(rowTotal);
    grid.appendChild(row);
  });
}

// 🔹 Row total
function updateRowTotal(value, input, rowTotal) {
  const count = parseInt(input.value) || 0;
  const total = count * value;
  rowTotal.textContent = `₹${total.toLocaleString("en-IN")}`;
}

// 🔹 Total
function calculateTotal() {
  let total = 0;

  inputs.forEach(item => {
    const count = parseInt(item.input.value) || 0;
    total += count * item.value;
  });

  totalAmount.textContent = total.toLocaleString("en-IN");
  amountWords.textContent = numberToWords(total);
}

// 🔹 Reset
resetBtn.addEventListener("click", () => {
  inputs.forEach(item => {
    item.input.value = "";
    item.rowTotal.textContent = "₹0";
  });
  totalAmount.textContent = "0";
  amountWords.textContent = "";
});

// 🔹 Language toggle
langBtn.addEventListener("click", () => {
  if (currentLang === "hi") {
    document.getElementById("title").textContent = "Cash Drawer";
    document.getElementById("subtitle").textContent = "Total Cash";
    langBtn.textContent = "HI";
    currentLang = "en";
  } else {
    document.getElementById("title").textContent = "कैश ड्रॉअर";
    document.getElementById("subtitle").textContent = "कुल नकद";
    langBtn.textContent = "EN";
    currentLang = "hi";
  }
});

// 🔹 Number to words (Indian style basic)
function numberToWords(num) {
  if (num === 0) return "";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"];

  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + " " + ones[num % 10];

  return num.toLocaleString("en-IN");
}

// 🔹 Init
renderGrid();
