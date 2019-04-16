const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
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
    });
    if (!order) {
      res.sendStatus(404)
    }
    else {
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
