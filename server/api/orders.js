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

router.put('/cart', async (req, res, next) => {
  console.log(req.body)
  try {
    const lineItem = await LineItem.update(
      {quantity: +req.body.quantity},
      {
        where: {
          id: +req.body.id
        },
        returning: true
      }
    )
    res.json(lineItem[1])
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

// creating a new order (collection of order items)
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

// editing an order's associated user
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if (!order) {
      res.sendStatus(404)
    } else {
      await order.update({userId: req.body.userId}).then(res.json(order))
    }
  } catch (err) {
    next(err)
  }
})

// clear an entire order/cart
router.get('/:orderId/clear', async (req, res, next) => {
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

// adding a new line item to an order
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

// removing a single line item (if the amount has been changed to 0)
router.delete('/lineItem/:lineItemId', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.lineItemId)
    await lineItem.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
