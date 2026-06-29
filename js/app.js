// // Điểm khởi động chương trình
// import ProductTable from "./ProductTable.js";
// // import MisaClient from "./MisaClient.js";
// // import WordExporter from "./WordExporter.js";

// class App {

//     constructor() {
//         this.productTable = null;
//         // this.misaClient = null;
//         // this.wordExporter = null;
//     }

//     init() {

//         // this.misaClient = new MisaClient();

//         this.productTable = new ProductTable(
//             "product-table-container"
//         );

//         // this.wordExporter = new WordExporter();

//         this.productTable.render();

//     }

// }

// new App().init();

// Điểm khởi động chương trình
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
        // Phím tắt khách hàng
        // ==========================

        const customerInput = document.getElementById("customerName");

        const customerMap = {
            "kl06": "Khách lẻ",
            "ghn": "GHN",
            "ha77": "HA77",
            "msb": "MSB",
        };

        customerInput.addEventListener("keydown", (e) => {

            if (e.key !== "Enter") return;

            e.preventDefault();

            const code = customerInput.value.trim().toLowerCase();

            if (customerMap[code]) {
                customerInput.value = customerMap[code];
            }

        });

    }

}

new App().init();