const bookContainer = document.getElementById("book-container");
const categoryItems = document.querySelectorAll(".category-item");

const books = JSON.parse(localStorage.getItem("books")) || [];

const formatCurrency = (amount) =>
    amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


// ===== HÀM RENDER =====
function renderBooks(bookArray) {
    let html = "";

    if (bookArray.length === 0) {
        bookContainer.innerHTML = "<p>Không có sách thuộc thể loại này.</p>";
        return;
    }

    bookArray.forEach((book) => {
        const originalPrice = book.money;
        const discountPercent = book.discount || 0;
        const discountedPrice = Math.round(
            originalPrice - (originalPrice * discountPercent) / 100
        );

        html += `
        <a href="./html/detail-book.html?${book.id}" class="book-card">
          <img src="${book.image}" alt="${book.name}">
          <div class="book-content">
            <div>
              <span class="book-author line-clamp-1">${book.author}</span>
              <h1 class="book-title line-clamp-2">${book.name}</h1>
              <div class="book-price">
                <span class="price-now">${formatCurrency(discountedPrice)}₫</span>
                ${
                    discountPercent > 0
                        ? `<span class="discount-tag">-${discountPercent}%</span>
                           <span class="price-old">${formatCurrency(originalPrice)}₫</span>`
                        : ""
                }
                <span class="category-tag">${book.category}</span>
              </div>
            </div>
          </div>
        </a>
        `;
    });

    bookContainer.innerHTML = html;
}


// ===== CLICK CATEGORY =====
categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
        console.log(item);
        const selectedCategory = this.textContent.trim();
        console.log(selectedCategory);
        const filteredBooks = books.filter(
            (book) => book.category == selectedCategory
        );

        renderBooks(filteredBooks);

        // optional: thêm active
        categoryItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
    });
});

function updateCartCount() {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    let totalQuantity = 0;

    giohang.forEach(item => {
        totalQuantity += item.quantity;
    });

    const countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.innerText = totalQuantity;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});



// ===== LOAD ALL BOOKS KHI VÀO TRANG =====
renderBooks(books);
