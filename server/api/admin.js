const router = require('express').Router()
const {Order, LineItem, User} = require('../db/models')
const {adminGateway} = require('./gateways')

module.exports = router

router.get('/allOrders', adminGateway, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
    // console.log('HERE', orders)
  } catch (err) {
    next(err)
  }
})

router.get('/allUsers', adminGateway, async (req, res, next) => {
  try {
    const user = await User.findAll()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//Find all items
router.get('/allitems', adminGateway, async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    console.log(lineItems)
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

// creating a new order (collection of order items)
router.post('/', adminGateway, async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      // checks if there was a userId sent (meaning they're logged in), otherwise null
      userId: +req.session.passport.user || null,
      fullfillmentStatus: 'inCart'
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// editing an order's fullfillment Status
router.put(
  '/changeorderstatus/:orderId/:newStatus',
  adminGateway,
  async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.orderId)
      if (!order) {
        res.sendStatus(404)
      } else {
        await order
          .update({fullfillmentStatus: req.params.newStatus})
          .then(res.json('success'))
      }
    } catch (err) {
      next(err)
    }
  }
)

router.put('/checkout', async (req, res, next) => {
  try {
    await Order.update(
      {
        fullfillmentStatus: 'Unfullfilled'
      },
      {where: {userId: req.user.id}}
    )
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// clear an entire order/cart
router.get('/:orderId/clear', adminGateway, async (req, res, next) => {
  try {
    await LineItem.destroy({
      where: {
        orderId: req.params.orderId
      }
    }).then(() => res.sendStatus(200))
  } catch (err) {
    next(err)
  }
})
