
const router = require('express').Router();
const {ProductController} = require('../apis/controllers/product/v1')

router.get('/getProducts', ProductController.getProduct)

router.post('/addAndUpdateProduct', ProductController.addAndUpdateProduct)

router.post('/deleteProduct',  ProductController.addAndUpdateProduct)

router.get('/getProductById/:id', ProductController.getProductById)


module.exports = {
	url: '/product',
	routes: router
};