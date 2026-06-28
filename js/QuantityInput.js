// Điều khiển nút + -
// không nhỏ hơn 1
export default class QuantityInput {

    constructor(container) {

        this.container = container;

        this.minusButton = container.querySelector(".minus");
        this.plusButton = container.querySelector(".plus");
        this.input = container.querySelector(".quantity");

        this.changeCallback = null;

        this.init();

    }

    /**
     * Khởi tạo sự kiện
     */
    init() {

        // Nút +
        this.plusButton.addEventListener("click", () => {

            this.setValue(this.getValue() + 1);

        });

        // Nút -
        this.minusButton.addEventListener("click", () => {

            if (this.getValue() > 1) {

                this.setValue(this.getValue() - 1);

            }

        });

        // Khi người dùng nhập trực tiếp
        this.input.addEventListener("input", () => {

            let value = parseInt(this.input.value);

            if (isNaN(value) || value < 1) {

                value = 1;

            }

            this.input.value = value;

            this.triggerChange();

        });

    }

    /**
     * Lấy số lượng
     */
    getValue() {

        return parseInt(this.input.value);

    }

    /**
     * Gán số lượng
     */
    setValue(value) {

        value = parseInt(value);

        if (isNaN(value) || value < 1) {

            value = 1;

        }

        this.input.value = value;

        this.triggerChange();

    }

    /**
     * Đăng ký sự kiện thay đổi
     */
    onChange(callback) {

        this.changeCallback = callback;

    }

    /**
     * Gọi callback khi số lượng thay đổi
     */
    triggerChange() {

        if (typeof this.changeCallback === "function") {

            this.changeCallback(this.getValue());

        }

    }

}