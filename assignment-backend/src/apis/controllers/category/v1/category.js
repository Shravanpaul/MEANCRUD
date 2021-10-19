
const { notFound, badRequest } = require('../../../../utilities/error-response');
const { OK } = require('../../../../utilities/success-response');
const {CategoryService} = require('../../../services/category/v1')

const getCategory = async (req, res) => {
	try {
        const responseData = await CategoryService.getCategory()
        if(responseData && responseData.value) {
            return OK(res, null, responseData.value)
        } else {
            return badRequest(res, null, responseData.error.message)
        }
	} catch (error) {
		return badRequest(res, null, error)
	}
}

const addAndUpdateCategory = async (req, res) => {
	try {
        const {categoryName} = req.body
        let isDeleted = false
        let categoryId
        if(req.body.isDeleted) {
            isDeleted = req.body.isDeleted
        }
        if(req.body.categoryId) {
            categoryId = req.body.categoryId
        }
        const responseData = await CategoryService.addAndUpdateCategory(categoryName, isDeleted, categoryId)
        if(responseData && responseData.value) {
            return OK(res, null, responseData.value)
        } else {
            return badRequest(res, null, responseData.error.message)
        }
	} catch (error) {
		return badRequest(res, null, error)
	}
}

const getCategoryById = async (req, res) => {
	try {
        const {id} = req.params
        const responseData = await CategoryService.getCategoryById(id)
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
    getCategory,
    addAndUpdateCategory,
    getCategoryById
}