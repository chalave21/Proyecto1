const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager
const productoManager = new ProductManager("archivo1.json");


app.use(express.json());


app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); 
    const products = await productoManager.getProduct();
    
    if (!isNaN(limit) && limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products); 
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos." });
  }
});


app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productoManager.getProductById(productId);

    if (product !== "No Se encontro el producto") {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});