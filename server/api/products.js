const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.house) {
      filters.house = req.query.house
    }
    if (req.query.productCategory) {
      filters.productCategory = req.query.productCategory
    }

    const products = await Product.findAll({
      where : filters
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) {
      res.sendStatus(404)
    }
    else {
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      name : req.body.name,
      price : req.body.price,
      imageUrl : req.body.imageUrl,
      house : req.body.house,
      productCategory : req.body.productCategory
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})
