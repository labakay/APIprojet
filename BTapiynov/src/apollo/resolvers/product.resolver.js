const Product = require('../../models/product.model')

module.exports = {
    
    Query: {
        
        products: () => {
            return Product.find();
        },
        product: (parent, args) => {
            console.log(args.id)
            return Product.findById(args.id)
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
      	const newProduct = new Product({
        	title: args.title,
       		price: args.price,
        	description: args.description,
            image: args.image
      	});
      	return newProduct.save();
    	},
        updateProduct: (parent, args) => {
            return Product.findOneAndUpdate({id:args.id, title: args.title})
        },
        deleteProduct: (parent, args) => {
            return Product.findById({id:args.id})
        }
    }
}