const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:userId/orders', async (req, res, next) => {
    try {
      const orders = Order.findAll({
          where : {
            userId : req.params.userId
          }
      })
      res.json(orders)
    } catch (err) {
      next(err)
    }
  })
