
const router = require('express').Router();
const {CategoryController} = require('../apis/controllers/category/v1');

router.get('/getCategory', CategoryController.getCategory)

router.post('/addAndUpdateCategory', CategoryController.addAndUpdateCategory)

router.post('/deleteCategory',  CategoryController.addAndUpdateCategory)

router.get('/getCategoryById/:id', CategoryController.getCategoryById)


module.exports = {
	url: '/category',
	routes: router
};