const denominations = [2000, 500, 200, 100, 50, 20, 10];

const grid = document.getElementById("denominationGrid");
const totalEl = document.getElementById("totalAmount");
const langBtn = document.getElementById("langBtn");

let isHindi = true;

// Create UI
denominations.forEach(value => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div>₹ ${value}</div>
    <input type="number" min="0" data-value="${value}" placeholder="0" />
  `;

  grid.appendChild(card);
});

// Calculate total
function calculate() {
  let total = 0;

  document.querySelectorAll("input").forEach(input => {
    const count = parseInt(input.value) || 0;
    const value = parseInt(input.dataset.value);
    total += count * value;
  });

  totalEl.textContent = total;
}

// Event listener
document.addEventListener("input", calculate);

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll("input").forEach(i => i.value = "");
  calculate();
});

// Language toggle
langBtn.addEventListener("click", () => {
  isHindi = !isHindi;

  if (isHindi) {
    document.getElementById("appTitle").textContent = "कैश ड्रॉअर";
    document.getElementById("subtitle").textContent = "कुल नकद";
    langBtn.textContent = "EN";
  } else {
    document.getElementById("appTitle").textContent = "Cash Drawer";
    document.getElementById("subtitle").textContent = "Total Cash";
    langBtn.textContent = "हिंदी";
  }
});
