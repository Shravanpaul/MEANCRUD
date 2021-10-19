
const { notFound, badRequest } = require('../../../../utilities/error-response');
const { OK } = require('../../../../utilities/success-response');
const {ProductService} = require('../../../services/product/v1')

const getProduct = async (req, res) => {
	try {
        let page
        if(req.query.page) {
            page = req.query.page
        }
        const responseData = await ProductService.getProduct(page)
        if(responseData && responseData.value) {
            return OK(res, null, responseData.value)
        } else {
            return badRequest(res, null, responseData.error.message)
        }
	} catch (error) {
		return badRequest(res, null, error)
	}
}

const addAndUpdateProduct = async (req, res) => {
	try {
        const {productName} = req.body
        let isDeleted = false
        let productId, categoryId
        if(req.body.productId) {
            productId = req.body.productId
        }
        if(req.body.isDeleted) {
            isDeleted = req.body.isDeleted
        }
        if(req.body.categoryId) {
            categoryId = req.body.categoryId
        }
        const responseData = await ProductService.addAndUpdateProduct(productName, isDeleted, productId, categoryId)
        if(responseData && responseData.value) {
            return OK(res, null, responseData.value)
        } else {
            return badRequest(res, null, responseData.error.message)
        }
	} catch (error) {
		return badRequest(res, null, error)
	}
}

const getProductById = async (req, res) => {
	try {
        const {id} = req.params
        const responseData = await CategoryService.getProductById(id)
        if(responseData && responseData.value) {
            return OK(res, null, responseData.value)
        } else {
            return badRequest(res, null, responseData.error.message)
        }
	} catch (error) {
		return badRequest(res, null, error)
	}
}

module.exports = {
    getProduct,
    addAndUpdateProduct,
    getProductById
}