const products = [];
 
 class ProductosApi {   
   constructor() {
     this.list = products;
   }
 
   listarTodos() {
     return this.list;
   }
 
   guardar(product) {
     const { title, price, thumbnail } = product;
     if ( !title || !price || !thumbnail) {
       return null;
     }
     ProductosApi.lastProductId++;
     const newProduct = {
       id: ProductosApi.lastProductId,
       title,
       price,
       thumbnail
     };
     this.list.push(newProduct);
     return newProduct;
   };
 }
 
 module.exports = ProductosApi;
 
 
 