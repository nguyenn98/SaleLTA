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
//         // KHÁCH HÀNG
//         // ==========================

//         const customerInput = document.getElementById("customerName");

//         // Danh sách mã khách hàng (dễ mở rộng)
//         const customerMap = {
//             "kl06": "Khách lẻ",
//             "ghn": "GHN",
//             "ha77": "HA77",
//             "msb": "MSB",
//         };

//         // Hàm xử lý chung
//         const resolveCustomer = () => {

//             const code = customerInput.value.trim().toLowerCase();

//             if (customerMap[code]) {
//                 customerInput.value = customerMap[code];
//             }

//         };

//         // Enter
//         customerInput.addEventListener("keydown", (e) => {
//             if (e.key !== "Enter") return;

//             e.preventDefault();
//             resolveCustomer();
//         });

//         // Blur (click ra ngoài)
//         customerInput.addEventListener("blur", () => {
//             resolveCustomer();
//         });

//     }

// }

// new App().init();


import ProductTable from "./ProductTable.js";

class App {

    constructor() {
        this.productTable = null;
        this.clockInterval = null;
    }

    init() {

        this.productTable = new ProductTable(
            "product-table-container"
        );

        this.productTable.render();

        // ==========================
        // KHÁCH HÀNG (giữ nguyên)
        // ==========================

        const customerInput = document.getElementById("customerName");

        const customerMap = {
            "kl06": "Khách lẻ",
            "ghn": "GHN",
            "ha77": "HA77",
            "msb": "MSB",
        };

        const resolveCustomer = () => {
            const code = customerInput.value.trim().toLowerCase();
            if (customerMap[code]) {
                customerInput.value = customerMap[code];
            }
        };

        customerInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            resolveCustomer();
        });

        customerInput.addEventListener("blur", () => {
            resolveCustomer();
        });

        // ==========================
        // ĐỒNG HỒ REALTIME
        // ==========================

        const clockEl = document.getElementById("clock");

        const updateClock = () => {

            const now = new Date();

            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const year = now.getFullYear();

            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            clockEl.innerHTML =
                `<span> ${day}/${month}/${year}</span>
     <span style="margin: 0 12px;">|</span>
     <span> ${hours}:${minutes}:${seconds}</span>`;
        };

        // chạy ngay lập tức
        updateClock();

        // cập nhật mỗi giây
        this.clockInterval = setInterval(updateClock, 1000);
    }
}

new App().init();