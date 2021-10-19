const crypto = require('crypto')

const CustomError = require('../../../../class/customError');
const ProductDAO = require('../../../dao/product/v1/product')
const CategoryDAO = require('../../../dao/category/v1/category')

const getProduct = async (page) => {
    try {
        const filter = {
            isDeleted: false
        }
        page = Number(page)
        const dbValue = await ProductDAO.find(filter, page)
            if (dbValue && dbValue.value && dbValue.count) {
                const nextPage = getNextPage(page, dbValue.count)
                const formatObj = {
                    value: dbValue.value,
                    nextPage,
                    totalCount: dbValue.count
                }
                return {value: formatObj}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
    } catch (error) {
        return {error: new CustomError(error)}
    }
}

const getProductById = async (id) => {
    try {
        if(!id) {
            return {error: new CustomError('Product id missing')}
        }
        const filter = {
            isDeleted: false,
            productId: id
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

const addAndUpdateProduct = async (productName, isDeleted, productId, categoryId) => {
    try {
        let productObject = {
            productName,
            isDeleted,
            productId
        }
        if(!productName) {
            delete productObject.productName
        }
        const filter = {
            productId
        }

        const result = await ProductDAO.findOne(filter)
        if(result && result.value) {
            const dbValue = await ProductDAO.findAndUpdate(filter, productObject)
            if (dbValue && dbValue.value) {
                return {value: dbValue.value}
            } else {
                return {error: new CustomError(dbValue.error.message)}
            }
        } else {
            const filter = {
                categoryId,
                isDeleted: false
            }
            const result  = await CategoryDAO.findOne(filter)
            if(result && result.value) {
                productObject = {...productObject, categoryId: result.value._id}
                const dbValue = await ProductDAO.create(filter, productObject)
                if (dbValue && dbValue.value) {
                    return {value: dbValue.value}
                } else {
                    return {error: new CustomError(dbValue.error.message)}
                }
            } else {
                return {error: new CustomError('Please select categoryId')}
            }
        }
    } catch (error) {
        return {error: new CustomError(error)}
    }
}

const getNextPage = function (page, total_records) {
    let next_page = 1;
    const records_per_page = 10;
    const current_page = page && page > 0 ? page : 1;
    const total_pages = Math.ceil(total_records / records_per_page);
    next_page = current_page + 1;
    if (next_page > total_pages) next_page = -1;
    return next_page;
}

module.exports = {
    getProduct,
    addAndUpdateProduct,
    getProductById
}