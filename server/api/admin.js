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
        await order.update({fullfillmentStatus: req.params.newStatus})
        res.json('success')
      }
    } catch (err) {
      next(err)
    }
  }
)

//Delete a User
router.delete('/delete/:userId', adminGateway, async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.params.userId}})
    res.status(200).send('User Destroyed')
  } catch (err) {
    next(err)
  }
})

// clear an entire order/cart
router.delete('/:orderId/clear', adminGateway, async (req, res, next) => {
  try {
    await LineItem.destroy({
      where: {
        orderId: req.params.orderId
      }
    })
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// router.delete('/:userId', adminGateway, async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId)
//     if (!user) {
//       res.sendStatus(404)
//     } else {
//       await user
//         .update({
//           isBanned: true
//         })
//         .then(() => res.json(user))
//     }
//   } catch (err) {
//     next(err)
//   }
// })
