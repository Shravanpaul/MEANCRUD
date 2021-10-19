const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const uuid = require('uuid')

const { Schema } = mongoose

const ProductSchema = new Schema({
    productId: {
        type: String,
        default: function genUUID() {
            return uuid.v4().replace(/-/g, '')
        },
    },
    categoryId: {type: Schema.Types.ObjectId, ref: 'category'},
    productName: { type: String, required: false },
    isDeleted: {type: Boolean, default: false},
})

ProductSchema.plugin(timestamps)

ProductSchema.index({ productId: 1 }, { unique: true })

module.exports = mongoose.model('product', ProductSchema)