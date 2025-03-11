const quotes = [
    {
        text: "Satu-satunya kesalahan nyata adalah kesalahan yang darinya kita tidak belajar apa pun.",
        author: "Henry Ford",
        image: "assets/img/Henry_ford_1919.jpg"
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/FDR_in_1933.jpg/300px-FDR_in_1933.jpg"
    },
    {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Martin_Luther_King_Jr_NYWTS.jpg"
    },
    {
        text: "Kalau ada yang bilang itu Indonesia gelap, yang gelap kau, bukan Indonesia.",
        author: "Luhut Binsar Pandjaitan",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Indonesian_Coordinating_Minister_Luhut_Binsar_Pandjaitan_in_Washington%2C_D.C._on_4_August_2023_-_%28cropped%29.jpg"
    },
];

// Elemen UI
const quoteImage = document.getElementById("quote-image");
const quoteAuthor = document.getElementById("quote-author");
const quoteText = document.getElementById("quote-text");

// Input form
const authorInput = document.getElementById("quote-author-input");
const imageInput = document.getElementById("quote-image-input");
const textInput = document.getElementById("quote-text-input");

// Tombol
const modal = document.getElementById("add-quote-modal");
const addButton = document.getElementById("btn1");
const removeButton = document.getElementById("btn2");

// Tombol popup
const closePopup = document.getElementById("cancel-btn");
const addQuoteForm = document.getElementById("add-quote-form");

// Tombol navigasi
const backButton = document.getElementById("back-btn");
const nextButton = document.getElementById("next-btn");

// Indeks saat ini
let currentIndex = 0;

// 🔹 **Fungsi Update UI**
function updateQuote() {
    if (quotes.length === 0) {
        // Jika tidak ada quote, tampilkan pesan kosong
        document.getElementById("image-container").classList.add("hidden");
        document.getElementById("text-container").classList.add("hidden");
        document.getElementById("quote-card").innerHTML = `
            <p class="text-center text-gray-500 text-lg font-semibold">
            Tidak ada quote yang tersedia.
            </p>
        `;
        return;
    }

    // Tampilkan quote aktif
    let currentQuote = quotes[currentIndex];
    quoteImage.src = currentQuote.image;
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = currentQuote.author;
    document.getElementById("image-container").classList.remove("hidden");
    document.getElementById("text-container").classList.remove("hidden");
}

// 🔹 **Navigasi Quote**
nextButton.addEventListener("click", function () {
    if (quotes.length === 0) return; 
    currentIndex = (currentIndex + 1) % quotes.length;
    updateQuote();
});

backButton.addEventListener("click", () => {
    if (quotes.length === 0) return; 
    currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
    updateQuote();
});

// 🔹 **Tambah Quote Baru**
addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddQuote();
});

function handleAddQuote() {
    const author = authorInput.value.trim();
    const imageUrl = imageInput.value.trim();
    const text = textInput.value.trim();

    if (!author || !imageUrl || !text) {
        alert("Silakan isi semua kolom.");
        return;
    }

    const newQuote = { text, author, image: imageUrl };
    quotes.push(newQuote);
    currentIndex = quotes.length - 1;

    authorInput.value = "";
    imageInput.value = "";
    textInput.value = "";

    modal.classList.add("hidden");
    updateQuote();
}

// 🔹 **Tampilkan Modal**
addButton.addEventListener("click", function () {
    modal.classList.remove("hidden");
});

// 🔹 **Tutup Modal**
closePopup.addEventListener("click", function () {
    modal.classList.add("hidden");
});

// 🔹 **Hapus Quote**
removeButton.addEventListener("click", function () {
    if (quotes.length === 0) return alert("Tidak ada quote yang bisa dihapus.");

    quotes.splice(currentIndex, 1);

    if (quotes.length === 0) {
        updateQuote();
    } else {
        currentIndex = Math.max(0, currentIndex - 1);
        updateQuote();
    }
});

// 🔹 **Tampilkan Quote Pertama**
updateQuote();
