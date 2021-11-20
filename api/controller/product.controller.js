const express = require('express')

const router = express.Router()
const mongoose = require('mongoose');

const Product = require('../model/product.model')
const Option = require('../model/option.model')

// GET Product all
router.get('/', async(req, res) => {

    const product = await Product.find({})

    res.json(product)

})

// Get detail product by ID 
router.get('/:id', async(req, res) => {

    const id = req.params.id

    const product = await Product.findOne({ _id: id }).populate('shopId')

    res.json(product)

})

// Get detail product by shopId
router.get('/listProduct/:shopId', async(req, res) => {

    const { shopId } = req.params

    const product = await Product.find({ shopId });

    res.json(product)

})

// Get detail product by ID 
router.get('/category/:id', async(req, res) => {

    const page = req.query.page || 1

    const pageSize = req.query.pageSize || 8

    const id = req.params.id || "all"

    const place = req.query.place ? req.query.place.split(",") : []

    const category = req.query.category ? req.query.category.split(",") : []

    const search = req.query.keyWord || ""

    const type = req.query.type || ""

    const minPrice = Number(req.query.minPrice) || -999999999999999

    const maxPrice = Number(req.query.maxPrice) || 999999999999999


    let start = (page - 1) * pageSize;
    let end = page * pageSize;

    let query = {}

    query.id = id !== "all" && id !== "search" ? { categoryId: id } : {}

    query.place = place.length > 0 ? { "shopId.name": { $in: place } } : {}
    query.category = category.length > 0 ? { "categoryId.name": { $in: category } } : {}

    switch (type) {
        case '1':
            query.type = { numberSell: -1 };
            break;
        case '2':
            query.type = { _id: -1 };
            break;
        case '3':
            query.type = { priceDiscount: -1 };
            break;
        case '4':
            query.type = { priceDiscount: 1 };
            break;
        default:
            query.type = { _id: 1 };
    }

    const product = await Product.aggregate([

        {
            $match: query.id
        },

        { $match: { name: { $regex: search, $options: 'i' } } },

        {
            $addFields: {
                shopId: { $toObjectId: "$shopId" },
                _id: { $toString: "$_id" },
                categoryId: { $toObjectId: "$categoryId" },
                priceDiscount: {
                    $subtract: [
                        "$price",
                        {
                            $divide: [{
                                $multiply: [
                                    "$price",
                                    "$discount"
                                ]

                            }, 100]
                        }
                    ]
                }
            }
        },

        {
            $lookup: {
                from: 'category',
                localField: "categoryId",
                foreignField: "_id",
                as: 'categoryId'
            }
        },
        {
            $lookup: {
                from: 'shop',
                localField: "shopId",
                foreignField: "_id",
                as: 'shopId'
            }
        },

        {
            $unwind: {
                path: "$shopId",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $unwind: {
                path: "$categoryId",
                preserveNullAndEmptyArrays: true
            }
        },



        { $match: { "price": { $gte: minPrice, $lte: maxPrice } } },

        {
            $match: query.place
        },

        {
            $match: query.category
        },

        {
            $lookup: {
                from: 'detail',
                localField: "_id",
                foreignField: "productId",
                as: 'numberSell'
            },
        },

        {
            $addFields: {
                numberSell: { $size: "$numberSell" },
            }
        },

        {
            $sort: query.type
        }

    ])

    res.json({ product: product.slice(start, end), total: product.length })


})

// GET List product out of stock
router.get('/list/outsale', async(req, res) => {

    // Lấy tất cả count of product = 1
    const productOutSale = await Product.find({ count: { $eq: 0 } });

    res.json(productOutSale)

})

// GET List product on-sale
router.get('/list/onsale', async(req, res) => {

    // Lấy tất cả count of product lớn hơn 1
    const productOnSale = await Product.find({ count: { $gte: 1 } });

    res.json(productOnSale)
})

// GET List product sale 
router.get('/list/sale', async(req, res) => {

    // Lấy tất cả discount of product lớn hơn 1
    const productSale = await Product.find({ discount: { $gte: 1 } });

    res.json(productSale)
})

// POST Product
router.post('/', checkProduct, upLoadImage, addProduct, addOptions)


// Update Product
router.patch('/:id', checkProduct, upLoadImage, updateOption, updateProduct)

// Update Product like
router.get('/like/:id', async(req, res) => {

    const id = req.params.id;

    let product = await Product.findOne({ _id: id })

    product.like = Number(product.like) + 1;

    product.save()

    res.json("Thanh Cong")
})

// Update Product dislike
router.get('/dislike/:id', async(req, res) => {

    const id = req.params.id;

    let product = await Product.findOne({ _id: id })

    product.like = Number(product.like) - 1;

    product.save()

    res.json("Thanh Cong")
})

// Update Product count comment
router.get('/comment/:id', async(req, res) => {

    const _id = req.params.id

    const product = await Product.findOne({ _id })

    product.comment = Number(product.comment) + 1

    product.save()

    res.json("Thanh Cong")

})

// DELETE Product
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const product = await Product.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        product
    })

})

// GET Product Discount ExpireTime
router.get('/sale/discount', async(req, res) => {

    // Lấy tất cả discount of product lớn hơn 1
    const productSale = await Product.find({ discount: { $gte: 1 } });

    res.json(productSale)

})

//GET All Shop Product Pagination
router.get('/shop/pagination', async(req, res) => {

    const { page, shopId } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({ shopId: shopId }).skip((page - 1) * 4).limit(4)

    res.json(products)

})

//GET All Home Product Pagination
router.get('/home/pagination', async(req, res) => {

    const { page } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({}).skip((page - 1) * 8).limit(8)

    res.json(products)

})

//GET All Newfeed Product Pagination
router.get('/newfeed/pagination', async(req, res) => {

    const { page } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({}).skip((page - 1) * 3).limit(3).populate('shopId')

    res.json(products)

})

// Search All Product by Name
router.get('/search/word', async(req, res) => {

    const { word } = req.query

    // Sử dụng regex để search
    const products = await Product.find({
        "name": {
            $regex: '.*' + word + '.*'
        }
    })

    res.json(products)

})

// PATCH Update Image Product
router.patch('/update/image', async(req, res) => {

    const product = await Product.findOne({ _id: req.body._id })

    if (product.image.length < 4) {
        var fileImage = req.files.file;

        var fileName = fileImage.name

        // create path to client get image
        // var fileProduct = "https://server-lover.herokuapp.com/" + fileName
        var fileProduct = "http://localhost:4000/" + fileName

        const image = {
            id: Math.random().toString(),
            url: fileProduct
        }

        product.image.push(image)

        // move file name in folder public
        fileImage.mv('./public/' + fileName)

        product.save()

        res.json({ msg: "Success" })
    } else {
        res.json({ msg: "Fail" })
    }

})

async function checkProduct(req, res, next) {
    const id = req.params.id

    const product = await Product.findOne({
        name: req.body.name.toUpperCase(),
        shopId: req.body.shopId
    });

    if ((id && product && product._id != id) || (!id && product)) {
        return res.json({ msg: 'Sản phẩm đã tồn tại' })
    }
    next()

}

function upLoadImage(req, res, next) {
    if (!req.files) {
        next()
    } else {
        req.files.file.forEach((item) => {
            const fileName = item.name

            item.mv('./public/image/product/' + fileName)

        });

        next()
    }
}

async function addProduct(req, res, next) {
    req.body.image = req.body.fileName ? req.body.fileName.map(item => ("http://localhost:4000/image/product/" + item)) : []
    req.body.name = req.body.name.toUpperCase()
    const product = await Product.create(req.body)
    req.productId = product._id
    next()
}

function addOptions(req, res) {
    let option = JSON.parse(req.body.option).map(e => {
        return {
            ...e,
            productId: req.productId
        }
    })

    Option.insertMany(option, (error, result) => {
        if (error) {
            return res.json({ msg: error });
        }
        return res.json({ msg: 'Bạn đã thêm thành công' })

    });
}

async function updateOption(req, res, next) {
    const option = JSON.parse(req.body.option) || []

    const optionId = option.filter(data => {
            if (data._id)
                return data;
        })
        .map(e => {
            return mongoose.Types.ObjectId(e._id)
        })
    await Option.deleteMany({ _id: { $nin: optionId } })

    await option.map(async e => {
        if (e._id) {
            await Option.updateOne({ _id: e._id }, e)
        } else if (!e._id) {
            await Option.create(e)
        }
    })
    next()
}

async function updateProduct(req, res) {
    const filename = req.body.fileName || []

    req.body.image = filename.map((item) => {
        if (!item.startsWith("http://localhost:4000/image/product")) {
            return "http://localhost:4000/image/product/" + item
        }
        return item
    })
    await Product.updateOne({ _id: req.params.id }, req.body)

    return res.json({ msg: 'Bạn đã thêm thành công' })
}



module.exports = router