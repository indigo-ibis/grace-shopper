const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/allitems', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: OrderItem}]
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
      fullfillmentStatus : 'Unfullfilled'
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// adding a new ORDER ITEM to an order
router.post('/:orderId', async (req, res, next) => {
  try {
    const newOrderItem = await OrderItem.create({
      orderId: req.params.orderId,
      productId: req.body.productId,
      quantity: req.body.quantity
    })
    res.json(newOrderItem)
  } catch (err) {
    next(err)
  }
})
