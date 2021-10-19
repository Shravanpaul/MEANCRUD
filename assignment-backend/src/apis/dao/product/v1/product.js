
const ProductModel = require('../../../../models/product.model')


const findAndUpdate = async function (filter, productObject) {
    try {
        const dbResult = await ProductModel.findOneAndUpdate(
            filter,
            productObject,
            { new: true, upsert: true}
        ).lean()
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const create = async function (filter, productObject) {
    try {
        const dbResult = await ProductModel.create(
            productObject
        )
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const findOne = async function (filter) {
    try {
        const dbResult = await ProductModel.findOne(filter).lean()
        return { value: dbResult }
    } catch (error) {
        return { error: new CustomError(error) }
    }
}

const find = async function (filter, page) {
    try {
        page = page ?? 1;
        let limit = 10;
        const count = await ProductModel.count(filter)
        const dbResult = await ProductModel.find(filter).populate("categoryId", "categoryName").skip((page * limit) - limit).limit(limit).lean()
        return { value: dbResult, count}
    } catch (error) {
        return { error: new CustomError(error) }
    }
}



module.exports = {
    findAndUpdate,
    findOne,
    find,
    create
}