const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//Find all items
router.get('/allitems', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: LineItem}]
    })
    if (!order) {
      res.sendStatus(404)
    } else {
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

// creating a new ORDER (collection of order items)
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      // checks if there was a userId sent (meaning they're logged in), otherwise null
      userId: req.body.userId || null,
      fullfillmentStatus: 'Unfullfilled'
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
//CART FUNCTIONALITY
// ---------------------------------------------------------------
// adding a new ORDER ITEM to an order

router.post('/:orderId', async (req, res, next) => {
  try {
    const newLineItem = await LineItem.create({
      orderId: req.params.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity
    })
    res.json(newLineItem)
  } catch (err) {
    next(err)
  }
})

router.get('cart/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        fullfillmentStatus: 'Delivered'
      },
      include: [{model: LineItem}]
    })
    if (!order) {
      res.sendStatus(404)
    } else {
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

//GET ALL ORDERS
router.get('/history/:userId/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: LineItem}]
    })
    if (!order) {
      res.sendStatus(404)
    } else {
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
