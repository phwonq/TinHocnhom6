// ===== FORMAT TIỀN =====
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ===== RENDER GIỎ HÀNG =====
function renderCart() {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");

    if (!container || !totalElement) return;

    if (giohang.length === 0) {
        container.innerHTML = "<p>Giỏ hàng trống.</p>";
        totalElement.innerText = "Tổng: 0₫";
        return;
    }

    let html = "";
    let total = 0;

    giohang.forEach((item, index) => {
        total += item.price * item.quantity;

        html += `
        <div class="cart-item">
            <img src="${item.image}" width="70">

            <div>
                <h4>${item.name}</h4>
                <p>${formatCurrency(item.price)}₫</p>
            </div>

            <div class="quantity-box">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                X
            </button>
        </div>
        `;
    });

    container.innerHTML = html;
    totalElement.innerText = "Tổng: " + formatCurrency(total) + "₫";
}

// ===== TĂNG / GIẢM SỐ LƯỢNG =====
function changeQuantity(index, change) {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    giohang[index].quantity += change;

    if (giohang[index].quantity <= 0) {
        giohang.splice(index, 1);
    }

    localStorage.setItem("giohang", JSON.stringify(giohang));
    renderCart();
    updateCartCount();
}

// ===== XÓA SẢN PHẨM =====
function removeItem(index) {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    giohang.splice(index, 1);

    localStorage.setItem("giohang", JSON.stringify(giohang));
    renderCart();
    updateCartCount();
}

// ===== THANH TOÁN =====
function checkout() {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

    if (giohang.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    alert("Thanh toán thành công 🎉");

    localStorage.removeItem("giohang");
    renderCart();
    updateCartCount();
}

// ===== CẬP NHẬT SỐ LƯỢNG ICON HEADER =====
function updateCartCount() {
    let giohang = JSON.parse(localStorage.getItem("giohang")) || [];
    let total = 0;

    giohang.forEach(item => {
        total += item.quantity;
    });

    const countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerText = total;
    }
}

// ===== AUTO CHẠY =====
document.addEventListener("DOMContentLoaded", function () {
    renderCart();
    updateCartCount();
});
