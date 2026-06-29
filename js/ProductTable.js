import ProductRow from "./ProductRow.js";

export default class ProductTable {

    constructor(containerId = "product-table-container") {

        this.container = document.getElementById(containerId);

        this.table = null;

        this.tbody = null;

        this.rows = [];

        this.totalEl = null;
    }

    /**
     * Khởi tạo giao diện bảng
     */
    render() {

        this.container.innerHTML = "";

        // wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "product-table-wrapper";

        // table
        this.table = document.createElement("table");
        this.table.id = "productTable";

        this.table.innerHTML = `
            <thead>
                <tr>
                    <th style="width:30px!">STT</th>
                    <th style="width:460px; margin-right: 15px">Sản phẩm</th>
                    <th style="width:100px; margin-right: 15px">Đơn giá</th>
                    <th style="width:109px">Số lượng</th>
                    <th style="width:200px; margin-left: 20px">Thành tiền</th>
                    <th style="width:60px">Xóa</th>

                </tr>
            </thead>
        `;

        // body
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.tbody);

        wrapper.appendChild(this.table);

        // footer
        const footer = document.createElement("div");
        footer.className = "table-footer";

        footer.innerHTML = `
        <div class="summary-box">

            <div class="summary-row">
                <span>Tổng tiền:</span>
                <span id="grandTotal">0 đ</span>
            </div>

            <div class="summary-row">
                <span>Khách đưa:</span>
                <input
                    type="text"
                    id="customerPaid"
                    placeholder="Nhập số tiền khách đưa"
                    >
            </div>

            <div class="summary-row">
                <span>Tiền trả lại:</span>
                <span id="changeMoney">0 đ</span>
            </div>

        </div>
        `;

        this.totalEl = footer.querySelector("#grandTotal");

        this.customerPaidEl = footer.querySelector("#customerPaid");
        this.changeMoneyEl = footer.querySelector("#changeMoney");
        this.customerPaidEl.addEventListener("input", (e) => {

            // Chỉ giữ lại số
            let value = e.target.value.replace(/\D/g, "");

            // Định dạng 200000 -> 200.000
            if (value !== "") {
                e.target.value = Number(value).toLocaleString("vi-VN");
            } else {
                e.target.value = "";
            }

            this.updateGrandTotal();
        });

        wrapper.appendChild(footer);

        this.container.appendChild(wrapper);

        // dòng đầu tiên
        this.addRow();

        const addBtn = document.createElement("button");
        addBtn.textContent = "+ Thêm dòng";
        addBtn.className = "add-row-btn";

        addBtn.addEventListener("click", () => {
            this.addRow();
        });

        wrapper.appendChild(addBtn);


    }

    /* =========================
            ADD ROW
    ========================== */
    addRow() {

        const row = new ProductRow(this.rows.length + 1);

        row.setOnChange(() => {
            this.updateGrandTotal();
        });

        // 🔥 xử lý xoá
        row.setOnDelete((targetRow) => {

            const index = this.rows.indexOf(targetRow);

            if (index !== -1) {
                this.rows.splice(index, 1);
            }

            targetRow.getElement().remove();

            this.updateSTT();
            this.updateGrandTotal();
        });

        this.rows.push(row);

        this.tbody.appendChild(row.render());

        this.updateGrandTotal();
    }
    /* =========================
        REMOVE ROW
    ========================== */
    removeRow(index) {

        if (index < 0 || index >= this.rows.length) return;

        const row = this.rows[index];

        row.getElement().remove();

        this.rows.splice(index, 1);

        this.updateSTT();

        this.updateGrandTotal();
    }


    /* =========================
        UPDATE STT
    ========================== */
    updateSTT() {

        this.rows.forEach((row, index) => {
            row.setIndex(index + 1);
        });
    }

    /* =========================
        TOTAL CALC
    ========================== */
    updateGrandTotal() {

        let total = 0;

        this.rows.forEach(row => {

            const el = row.getElement().querySelector(".line-total");

            const value = Number(el?.dataset?.raw || 0);

            total += value;
        });

        // Tổng tiền
        this.totalEl.textContent =
            total.toLocaleString("vi-VN") + " đ";

        // Tiền khách đưa
        const paid = Number(
            this.customerPaidEl.value.replace(/\./g, "")
        ) || 0;
        const change = paid - total;

        if (change >= 0) {

            this.changeMoneyEl.textContent =
                change.toLocaleString("vi-VN") + " đ";

        } else {

            this.changeMoneyEl.textContent =
                "Thiếu " +
                Math.abs(change).toLocaleString("vi-VN") +
                " đ";
        }
    }


    /* =========================
        GETTERS
    ========================== */
    getRows() {
        return this.rows;
    }

    getRow(index) {
        return this.rows[index];
    }
}