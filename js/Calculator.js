// Tính tiền
// Chỉ làm toán.
export default class Calculator {

    /**
     * Tính thành tiền của một dòng
     * @param {ProductRow} row
     * @returns {number}
     */
    static calculateRow(row) {

        const price = row.getPrice();
        const quantity = row.getQuantity();

        return price * quantity;

    }

    /**
     * Cập nhật thành tiền cho một dòng
     * @param {ProductRow} row
     */
    static updateRow(row) {

        const total = this.calculateRow(row);

        row.setTotal(total);

    }

    /**
     * Tính tổng tất cả các dòng
     * @param {ProductRow[]} rows
     * @returns {number}
     */
    static calculateGrandTotal(rows) {

        let grandTotal = 0;

        rows.forEach(row => {

            grandTotal += this.calculateRow(row);

        });

        return grandTotal;

    }

    /**
     * Hiển thị tổng tiền
     * @param {ProductRow[]} rows
     * @param {HTMLElement} element
     */
    static updateGrandTotal(rows, element) {

        const total = this.calculateGrandTotal(rows);

        element.textContent = total.toLocaleString("vi-VN") + " đ";

    }

}