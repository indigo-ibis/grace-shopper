const router = require('express').Router()
const {User, Order, LineItem, Product} = require('../db/models')
const {userGateway, userOrAdminGateway} = require('./gateways')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findAll({
        where: {
          userId: req.user.id,
          fullfillmentStatus: 'inCart'
        },
        include: [
          {
            model: LineItem,
            include: [{model: Product}]
          }
        ]
      })
      if (!order) {
        res.sendStatus(404)
      } else {
        res.json(order)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', userGateway, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: LineItem}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
      res.sendStatus(404)
    } else {
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    if (req.session.cartId) {
      const cart = await Order.findOne({
        where: {
          id: req.session.cartId
        }
      })
      cart.userId = newUser.id
    }
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

//CART FUNCTIONALITY
//********************************* */

//ORDER HISTORY
//GET ALL ORDERS
router.get('/orderhistory', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: +req.session.passport.user
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
