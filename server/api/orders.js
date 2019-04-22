const router = require('express').Router()
const {Order, LineItem} = require('../db/models')
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

// function adminGateway(req,res,next){
//   if(req.user.isAdmin){
//     next()
//   } else{
//     res.json({"no"})
//   }
// }

//Find all items
router.get('/allitems', adminGateway, async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

//Update Quantity of an item in cart
router.put('/cart', async (req, res, next) => {
  try {
    await LineItem.update(
      {quantity: +req.body.quantity},
      {
        where: {
          id: +req.body.id
        },
        returning: true
      }
    )
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.get('/mycart', (req, res, next) => {
  res.json(req.session.cart)
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{model: LineItem, order: [['createdAt', 'asc']]}]
    })
    if (!order) {
      res.sendStatus(404)
    } else {
      const user = await order.getUser();
      if (req.user && (req.user.isAdmin || user.id === req.user.id) ) {
        res.json(order)
      }
      else {
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

//Create cart on the session
router.put('/mycart', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {[req.body.productId]: 1}
  } else {
    req.session.cart[req.body.productId] = 1
  }
  console.log(req.session.cart)
  res.json(req.session.cart)
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

// ADD TO CART: adding a new line item to an order, for a USER
router.post('/:orderId', async (req, res, next) => {
  try {
    let test = await Order.findByPk(req.params.orderId)
    if (!test) {
      Order.create({id: req.params.orderId})
    }
    // await Order.findOrCreate({where: {id: req.params.orderId}})
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
    console.log(lineItem)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
