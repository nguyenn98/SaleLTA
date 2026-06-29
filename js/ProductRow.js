import QuantityInput from "./QuantityInput.js";
import ProductSearch from "./ProductSearch.js";

export default class ProductRow {

    constructor(index = 1) {

        this.index = index;

        this.element = null;

        this.quantityInput = null;
        this.productSearch = null;

        this.onChangeCallback = null;

        this.onDelete = null;
    }

    render() {

        this.element = document.createElement("tr");

        this.element.innerHTML = `
            <td class="stt">${this.index}</td>

            <td>
                <input
                    type="text"
                    class="product-name"
                    placeholder="Nhập sản phẩm"/>
            </td>

            <td>
                <input
                    type="text"
                    class="price"
                    placeholder="0"
                    inputmode="numeric">
            </td>

            <td>
                <div class="quantity-box">

                    <button type="button" class="minus">-</button>

                    <input
                        type="number"
                        class="quantity"
                        value="1"
                        min="1"
                        >

                    <button type="button" class="plus">+ </button>

                </div>
            </td>

            <td class="line-total">0</td>

            <!-- 🔥 CỘT XÓA -->
            <td>
                <button class="delete-row">🗑</button>
            </td>
        `;

        // Quantity input
        this.quantityInput = new QuantityInput(
            this.element.querySelector(".quantity-box")
        );

        // Product search
        this.productSearch = new ProductSearch(
            this.element.querySelector(".product-name")
        );

        this.bindEvents();

        // 🔥 kiểm tra lần đầu (rất quan trọng)
        this.checkProductName();

        this.updateLineTotal();

        return this.element;
    }

    /* =====================
        🔥 NEW: CHECK PRODUCT NAME
    ====================== */

    checkProductName() {

        const name = this.getProductName().trim();

        const qtyInput = this.element.querySelector(".quantity");
        const minusBtn = this.element.querySelector(".minus");
        const plusBtn = this.element.querySelector(".plus");

        const priceInput = this.element.querySelector(".price");

        if (!name) {

            qtyInput.disabled = true;
            minusBtn.disabled = true;
            plusBtn.disabled = true;

            // Xóa đơn giá
            this.setPrice(0);

            priceInput.disabled = true;

            // Nếu muốn giữ số lượng thì bỏ dòng dưới
            // this.setQuantity(1);

            // Cập nhật lại thành tiền
            this.updateLineTotal();

        } else {

            qtyInput.disabled = false;
            minusBtn.disabled = false;
            plusBtn.disabled = false;
            priceInput.disabled = false;
        }
    }

    /* =====================
        AUTO CALC
    ====================== */

    updateLineTotal() {

        const price = this.getPrice();
        const quantity = this.getQuantity();

        const total = price * quantity;

        this.setTotal(total);

        if (this.onChangeCallback) {
            this.onChangeCallback();
        }
    }

    bindEvents() {

        this.onPriceChange(() => {
            this.updateLineTotal();
        });

        this.onQuantityChange(() => {
            this.updateLineTotal();
        });

        this.onProductChange(() => {

            this.checkProductName(); // 🔥 quan trọng

            if (this.onChangeCallback) {
                this.onChangeCallback();
            }
        });

        this.element
            .querySelector(".delete-row")
            .addEventListener("click", () => {
                if (this.onDelete) {
                    this.onDelete(this);
                }
            });
    }

    /* =====================
        STT
    ====================== */

    setIndex(index) {
        this.index = index;
        this.element.querySelector(".stt").textContent = index;
    }

    getIndex() {
        return this.index;
    }

    /* =====================
        Product
    ====================== */

    getProductName() {
        return this.element.querySelector(".product-name").value;
    }

    setProductName(name) {
        this.element.querySelector(".product-name").value = name;
        this.checkProductName(); // 🔥 update trạng thái ngay
    }

    /* =====================
        Price
    ====================== */

    // getPrice() {
    //     return Number(this.element.querySelector(".price").value) || 0;
    // }
    getPrice() {
        const value = this.element
            .querySelector(".price")
            .value
            .replace(/\./g, "");

        return Number(value) || 0;
    }


    setPrice(price) {

        const input = this.element.querySelector(".price");

        if (!price) {
            input.value = "";
        } else {
            input.value = Number(price).toLocaleString("vi-VN");
        }
    }

    /* =====================
        Quantity
    ====================== */

    getQuantity() {
        return Number(this.quantityInput.getValue()) || 0;
    }

    setQuantity(quantity) {
        this.quantityInput.setValue(quantity);
    }

    setOnDelete(callback) {
        this.onDelete = callback;
    }


    /* =====================
        Total
    ====================== */

    getTotal() {
        return Number(
            this.element.querySelector(".line-total").dataset.raw || 0
        );
    }

    setTotal(total) {

        this.element.querySelector(".line-total").dataset.raw = total;

        this.element.querySelector(".line-total").textContent =
            Number(total).toLocaleString("vi-VN");
    }

    /* =====================
        Events
    ====================== */

    onQuantityChange(callback) {
        this.quantityInput.onChange(callback);
    }

    onPriceChange(callback) {

        const input = this.element.querySelector(".price");

        input.addEventListener("input", (e) => {

            // Chỉ giữ lại các chữ số
            let value = e.target.value.replace(/\D/g, "");

            // Không hiển thị gì nếu rỗng
            if (value === "") {
                e.target.value = "";
            } else {
                // Hiển thị 1.000.000
                e.target.value = Number(value).toLocaleString("vi-VN");
            }

            callback();
        });
    }

    onProductChange(callback) {
        this.element
            .querySelector(".product-name")
            .addEventListener("input", callback);
    }

    setOnChange(callback) {
        this.onChangeCallback = callback;
    }

    /* =====================
        DOM
    ====================== */

    getElement() {
        return this.element;
    }
}