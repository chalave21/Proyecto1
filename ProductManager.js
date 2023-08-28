class ProductManager{
    constructor(){
        this.producto = [];
        this.id = 0;
    }

    addProduct(title,description,price,thumbnail,code,stock){
        //Validacion de campos obligatorios.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error, todos los campos son obligatorios.");
            return;
        }

        this.id = this.id + 1; //Incremento del id;

        const agregaProducto = {
            title:title,
            description:description,
            price:price,
            thumnail:thumbnail,
            code:code,
            stock:stock,
            id:this.id,
        }
        //Verifico que no excista el mismo código.
        const existingProduct = this.producto.find(producto => producto.code === agregaProducto.code);
        if (existingProduct) {
            console.log("Error, el código ya existe.");
        } else {
            this.producto.push(agregaProducto);
        }
        
    }

    getProducts(){
        return this.producto;
    }

    getProductById(id){
        const product = this.producto.find(producto => producto.id === id);
        return product || "Not found";
    }
}

const producto1 = new ProductManager();
producto1.addProduct("producto","descripcion",100,"thumbnail",1234,100);
producto1.addProduct("producto","descripcion",100,"thumbnail",1235,100);
producto1.addProduct("producto","descripcion",100,"thumbnail",1236,100);
console.log(producto1.getProducts());
console.log(`\n`,"Producto:",`\n`,producto1.getProductById(3));
