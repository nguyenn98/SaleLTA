// Tìm kiếm sản phẩm (MISA sau này)
// Nhập sản phẩm
export default class ProductSearch {

    constructor(inputElement) {

        this.input = inputElement;

        this.products = [];

        this.changeCallback = null;

        this.init();

    }

    /**
     * Khởi tạo sự kiện
     */
    init() {

        this.input.addEventListener("input", (e) => {

            const keyword = e.target.value.trim();

            const result = this.search(keyword);

            if (this.changeCallback) {

                this.changeCallback(result, keyword);

            }

        });

    }

    /**
     * Nạp danh sách sản phẩm
     */
    setProducts(products) {

        this.products = products;

    }

    /**
     * Tìm kiếm
     */
    search(keyword) {

        if (!keyword) {

            return [];

        }

        keyword = keyword.toLowerCase();

        return this.products.filter(product =>

            product.name.toLowerCase().includes(keyword)

        );

    }

    /**
     * Đăng ký callback
     */
    onSearch(callback) {

        this.changeCallback = callback;

    }

}