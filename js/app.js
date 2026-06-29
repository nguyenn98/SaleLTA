// // Điểm khởi động chương trình
// import ProductTable from "./ProductTable.js";

// class App {

//     constructor() {
//         this.productTable = null;
//     }

//     init() {

//         this.productTable = new ProductTable(
//             "product-table-container"
//         );

//         this.productTable.render();

//         // ==========================
//         // Phím tắt khách hàng
//         // ==========================

//         const customerInput = document.getElementById("customerName");

//         const customerMap = {
//             "kl06": "Khách lẻ",
//             "ghn": "GHN",
//             "ha77": "HA77",
//             "msb": "MSB",
//         };

//         customerInput.addEventListener("keydown", (e) => {

//             if (e.key !== "Enter") return;

//             e.preventDefault();

//             const code = customerInput.value.trim().toLowerCase();

//             if (customerMap[code]) {
//                 customerInput.value = customerMap[code];
//             }

//         });

//     }

// }

// new App().init();

import ProductTable from "./ProductTable.js";

class App {

    constructor() {
        this.productTable = null;
    }

    init() {

        this.productTable = new ProductTable(
            "product-table-container"
        );

        this.productTable.render();

        // ==========================
        // KHÁCH HÀNG
        // ==========================

        const customerInput = document.getElementById("customerName");

        // Danh sách mã khách hàng (dễ mở rộng)
        const customerMap = {
            "kl06": "Khách lẻ",
            "ghn": "GHN",
            "ha77": "HA77",
            "msb": "MSB",
        };

        // Hàm xử lý chung
        const resolveCustomer = () => {

            const code = customerInput.value.trim().toLowerCase();

            if (customerMap[code]) {
                customerInput.value = customerMap[code];
            }

        };

        // Enter
        customerInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;

            e.preventDefault();
            resolveCustomer();
        });

        // Blur (click ra ngoài)
        customerInput.addEventListener("blur", () => {
            resolveCustomer();
        });

    }

}

new App().init();