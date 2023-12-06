export class ProductModel {
}
//to map the json received from backend
export class Product {
    constructor(
        public _id: string,
        public _product_name: string,
        public _category: string,
        public _rating: number,
        public _description: string,
        public _quantity: number,
        public _sold_item: number){}
}
