const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.id = 0;
    this.loadProducts();
  }

  loadProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.productos = JSON.parse(data);
        this.id = this.productos.reduce((maxId, producto) => Math.max(maxId, producto.id), 0);
      } else {
        this.productos = [];
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.productos, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar productos:', error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validación de campos obligatorios.
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Error, todos los campos son obligatorios.');
      return;
    }

    this.id += 1; // Incremento del id;

    const agregaProducto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: this.id,
    };

    // Verifico que no exista el mismo código.
    if (fs.existsSync(this.path)) {
      let existingProducts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      const existingProduct = existingProducts.find((producto) => producto.code === agregaProducto.code);
      if (existingProduct) {
        console.log('Error, el código ya existe.');
        return;
      }

      existingProducts.push(agregaProducto);

      // Guardar los productos actualizados en el archivo
      fs.writeFileSync(this.path, JSON.stringify(existingProducts, null, 2), 'utf-8');
    } else {
      // Si el archivo no existe, crearlo y guardar el nuevo producto
      fs.writeFileSync(this.path, JSON.stringify([agregaProducto], null, 2), 'utf-8');
    }
  }

  getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }
  }

  getProductById(id) {
    const productos = this.getProducts();
    const product = productos.find((producto) => producto.id === id);
    return product || "Not found";
  }
}

// Uso del codigo
const pathToFile = 'productos.json'; // Nombre del archivo donde se guardaran los productos
const productoManager = new ProductManager(pathToFile);


productoManager.addProduct('producto1', 'descripcion1', 100, 'thumbnail1', 1234, 100);
console.log(productoManager.getProducts());
console.log('\nProducto:\n', productoManager.getProductById(1));
