//Importo el modulo de fs.
const fs = require("fs");

//Creo la clase
class ProductManager {
  constructor(path) {
    this.path = path;
    this.producto = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    //Validacion de campos obligatorios.
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error, todos los campos son obligatorios.");
      return;
    }
    const archivo = await this.getProduct();
    let id;
    if (!archivo.length) {
      id = 1;
    } else {
      id = archivo[archivo.length - 1].id + 1;
    }

    const agregaProducto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      id: id,
    };
    //Verifico que no excista el mismo código.
    const existingProduct = this.producto.find(
      (producto) => producto.code === agregaProducto.code
    );
    if (existingProduct) {
      console.log("Error, el código ya existe.");
    } else {
      this.producto.push(agregaProducto);
    }

    try {
      const archivo = await this.getProduct(); // Obtener productos actuales del archivo
      archivo.push(agregaProducto); // Agregar el nuevo producto al array
      await fs.promises.writeFile(this.path, JSON.stringify(archivo)); // Guardar el array actualizado en el archivo JSON
      console.log("Producto agregado al archivo JSON.");
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const read = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(read);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProduct) {
    try {
      const products = await this.getProduct();
      const product = products.find((u) => u.id === idProduct);
      if (product) {
        return product;
      } else {
        return "No Se encontro el producto";
      }
    } catch (error) {
      return error;
    }
  }

  async createProduct(obj) {
    try {
      const archivo = await this.getProduct();
      let id;
      if (!archivo.length) {
        id = 1;
      } else {
        id = archivo[archivo.length - 1].id + 1;
      }
      archivo.push({ id, ...obj });
      const create = await fs.promises.writeFile(
        this.path,
        JSON.stringify(archivo.flat(Infinity))
      );
      //Opcion 2: Agregando al parametro ...obj
      //const create = await fs.promises.writeFile(this.path,JSON.stringify(archivo.flat(Infinity)));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProduct();
      const newArrayProducts = products.filter((u) => u.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const archivo = await this.getProduct();

      // Buscar el índice del producto en la lista por su ID
      const index = archivo.findIndex((product) => product.id === id);

      if (index !== -1) {
        // Actualizar el producto con el nuevo contenido
        archivo[index] = { ...archivo[index], ...updatedProduct };

        // Guardar la lista actualizada en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(archivo));

        console.log("Producto actualizado con éxito.");
      } else {
        console.log("No se encontró un producto con el ID proporcionado.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
//Bloque principal

async function test() {
  const producto1 = new ProductManager("archivo1.json");
  //const read = await producto1.getProduct();
  //console.log(read);
  const obj1 = { name: "Pepito", price: 200 };
  //await producto1.createProduct(obj1);
  //const productoId = await producto1.getProductById(1)
  //console.log(productoId);
  //await producto1.deleteProduct(1);
  //await producto1.updateProduct(1,{name:"Franco",price:111});
  await producto1.addProduct("Titulo2", "asdsd", 12000, "#", 124342343, 200);
}

test();
module.exports = ProductManager;