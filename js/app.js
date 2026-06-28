// Điểm khởi động chương trình
import ProductTable from "./ProductTable.js";
// import MisaClient from "./MisaClient.js";
// import WordExporter from "./WordExporter.js";

class App {

    constructor() {
        this.productTable = null;
        // this.misaClient = null;
        // this.wordExporter = null;
    }

    init() {

        // this.misaClient = new MisaClient();

        this.productTable = new ProductTable(
            "product-table-container"
        );

        // this.wordExporter = new WordExporter();

        this.productTable.render();

    }

}

new App().init();