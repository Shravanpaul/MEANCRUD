const crypto = require('crypto')

const CustomError = require('../../../../class/customError');
const CategoryDAO = require('../../../dao/category/v1/category')
const ProductDAO = require('../../../dao/product/v1/product')
const uuid = require('uuid')

const getCategory = async () => {
    try {
        const filter = {
            isDeleted: false
        }
        const dbValue = await CategoryDAO.find(filter)
            if (dbValue && dbValue.value) {
                return {value: dbValue.value}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
    } catch (error) {
        return {error: new CustomError(error)}
    }
}

const getCategoryById = async (id) => {
    try {
        if(!id) {
            return {error: new CustomError('Category id missing')}
        }
        const filter = {
            isDeleted: false,
            categoryId: id
        }
        const dbValue = await CategoryDAO.findOne(filter)
            if (dbValue && dbValue.value) {
                return {value: dbValue.value}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
    } catch (error) {
        return {error: new CustomError(error)}
    }
}

const addAndUpdateCategory = async (categoryName, isDeleted, categoryId) => {
    try {
        const categoryObject = {
           categoryName,
           isDeleted,
           categoryId
        }
        if(!categoryName) {
            delete categoryObject.categoryName
        }
        const filter = {
            categoryId
        }
        if(isDeleted && categoryId) {
            const obj = {
                isDeleted
            }
            await ProductDAO.findAndUpdate(filter, obj)
        }
        const result = await CategoryDAO.findOne(filter)
        if(result && result.value) {
            const dbValue = await CategoryDAO.findAndUpdate(filter, categoryObject)
            if (dbValue && dbValue.value) {
                return {value: dbValue.value}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
        } else {
            const dbValue = await CategoryDAO.create(filter, categoryObject)
            if (dbValue && dbValue.value) {
                return {value: dbValue.value}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
        }
    } catch (error) {
        return {error: new CustomError(error)}
    }
}

module.exports = {
    getCategory,
    addAndUpdateCategory,
    getCategoryById,
}