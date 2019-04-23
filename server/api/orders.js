const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')
const {adminGateway} = require('./gateways')
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
router.get('/allitems', adminGateway, async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

//Create cart on the session
router.get('/mycart', async (req, res, next) => {
  if (req.user) {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        fullfillmentStatus: 'inCart'
      },
      include: [
        {
          model: LineItem,
          order: [['createdAt', 'asc']],
          include: [{model: Product}]
        }
      ]
    })
    if (order) {
      res.json(order)
      return
    }
  }

  if (req.session.cartId) {
    const order = await Order.findByPk(req.session.cartId, {
      include: [
        {
          model: LineItem,
          order: [['createdAt', 'asc']],
          include: [{model: Product}]
        }
      ]
    })
    if (req.user) {
      order.setUser(req.user)
    }
    res.json(order)
  } else {
    const newOrder = await Order.create(
      {
        // checks if there was a userId sent (meaning they're logged in), otherwise null
        userId: req.user ? req.user.id : null,
        fullfillmentStatus: 'inCart'
      },
      {
        include: [
          {
            model: LineItem,
            order: [['createdAt', 'asc']]
          }
        ]
      }
    )
    req.session.cartId = newOrder.id
    res.json(newOrder)
  }
})

router.put('/mycart', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.body.id, {
      include: [{model: Order, include: [{model: User}]}]
    })
    if (!lineItem.order.user || lineItem.order.user.id === req.user.id) {
      await lineItem
        .update({quantity: req.body.quantity})
        .then(() => res.sendStatus(201))
    } else {
      res.send('no')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: LineItem, order: [['createdAt', 'asc']]}]
    })
    if (!order) {
      res.sendStatus(404)
    } else {
      const user = await order.getUser()
      if (req.user && (req.user.isAdmin || user.id === req.user.id)) {
        res.json(order)
      } else {
        res.send('no')
      }
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
      userId: +req.session.passport.user || null,
      fullfillmentStatus: 'inCart'
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// Submit order(Change status of order to 'unfullfilled')
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

// editing an order's associated user
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    if (!order || order.userId !== null) {
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
    const order = await Order.findByPk(req.params.orderId)
    if (order.userId !== req.user.id) {
      res.send('no')
    } else {
      await LineItem.destroy({
        where: {
          orderId: req.params.orderId
        }
      }).then(() => res.sendStatus(200))
    }
  } catch (err) {
    next(err)
  }
})

// ADD TO CART: adding a new line item to an order, for a USER
router.post('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: LineItem}]
    })
    if (res.user && order.userId !== req.user.id && order.userId !== null) {
      res.send('no')
    } else {
      const relevantItem = order.lineItems.find(
        element => element.productId === req.body.productId
      )
      if (relevantItem) {
        await relevantItem
          .update({quantity: relevantItem.quantity + 1})
          .then(() => res.json(relevantItem))
      } else {
        const newLineItem = await LineItem.create({
          orderId: req.params.orderId,
          productId: req.body.productId,
          quantity: req.body.quantity
        })
        res.json(newLineItem)
      }
    }
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
