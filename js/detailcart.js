document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn-add-cart");

    if (!btn) return;

    btn.addEventListener("click", function () {
        const name = document.getElementById("book-name").innerText;
        const priceText = document.getElementById("book-discount").innerText;
        const image = document.getElementById("book-image").src;

        // chuyển "76.000 ₫" -> 76000
        const price = parseInt(priceText.replace(/\D/g, ""));

        let giohang = JSON.parse(localStorage.getItem("giohang")) || [];

        // kiểm tra trùng sản phẩm
        const existing = giohang.find(item => item.name === name);

        if (existing) {
            existing.quantity += 1;
        } else {
            giohang.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("giohang", JSON.stringify(giohang));

         swal.fire({
            title: "Đã thêm vào giỏ hàng thành công!",
            icon: "success",
        });
    });
});
