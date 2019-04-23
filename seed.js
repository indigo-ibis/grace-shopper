const db = require('./server/db')

const Users = require('./server/db/models/user')
const Products = require('./server/db/models/products')
const LineItems = require('./server/db/models/lineItem')
const Orders = require('./server/db/models/orders')

const productsArr = [
  {
    name: 'John Snow Figurine',
    price: 34,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaiQj3VJobaGOSZY0VXZYDEK4kzTqtcxvnfU-QSOB2xKA2SPKX',
    house: 'Stark',
    productCategory: 'figurine'
  },
  {
    name: 'Needle Replica',
    price: 154,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51e9ZsVDiLL._SX425_.jpg',
    house: 'Stark',
    productCategory: 'replica'
  },
  {
    name: 'Podrick Figurine',
    price: 34,
    imageUrl: 'https://farm1.staticflickr.com/461/18499855211_3e1c3a8f34_b.jpg',
    house: 'Tyrell',
    productCategory: 'figurine'
  },
  {
    name: 'Danaerys Stormborn first of her name, plush pillow',
    price: 24,
    imageUrl:
      'https://i.pinimg.com/originals/70/df/c3/70dfc3885169a3700fc21702f1d934df.jpg',
    house: 'Targaryan',
    productCategory: 'memoribilia'
  },
  {
    name: 'Life Size Iron Throne Replica',
    price: 32990,
    imageUrl:
      'https://www.nydailynews.com/resizer/95Phg7t-CYpYCtvig_M9Ithy2Mg=/800x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/D3V5DH4ZRZDHLAZNQ66CNA5RFQ.JPG',
    house: 'Stark',
    productCategory: 'figurine'
  },
  {
    name: 'Tyrion Figurine',
    price: 2990,
    imageUrl:
      'https://shop.eaglemoss.com/images/shop_products/7e7c20dc-9f36-4cbd-a718-ad34d48cadaf.jpg',
    house: 'Lannister',
    productCategory: 'figurine'
  },
  {
    name: 'Custom King Robert Baratheon Bust',
    price: 2229,
    imageUrl:
      'https://www.sashacustoms.co.uk/uploads/images/sashaimages/thrones/1-1-robert-a.jpg',
    house: 'Baratheon',
    productCategory: 'bust'
  },
  {
    name: 'Paper Mache Theon Grayjoy',
    price: 2229,
    imageUrl:
      'https://www.picclickimg.com/d/l400/pict/333138251661_/Funko-Mystery-Minis-Game-of-Thrones-Theon-Greyjoy.jpg',
    house: 'Greyjoy',
    productCategory: 'bust'
  },
  {
    name: 'Oberin Figurine',
    price: 12229,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41lnmlmnklL._SY355_.jpg',
    house: 'Martell',
    productCategory: 'bust'
  }
]

const ordersArr = [
  {
    fullfillmentStatus: 'Unfullfilled',
    totalPrice: 300,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'Unfullfilled',
    totalPrice: 500,
    discountAmount: 1,
    userId: 2
  },
  {
    fullfillmentStatus: 'Delivered',
    totalPrice: 400,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'inCart',
    totalPrice: 300,
    discountAmount: 1,
    userId: 1
  },
  {
    fullfillmentStatus: 'inCart',
    totalPrice: 500,
    discountAmount: 1,
    userId: 2
  },
  {
    fullfillmentStatus: 'Delivered',
    totalPrice: 400,
    discountAmount: 1,
    userId: 1
  }
]

const usersArr = [
  {
    email: 'admin@email.com',
    firstName: 'ADMIN',
    lastName: 'thereisnospoon',
    password: '123',
    isAdmin: true,
    isBanned: false
  },
  {
    email: 'admin2@email.com',
    firstName: 'Jane',
    lastName: 'Janerson',
    password: '123',
    isAdmin: true,
    isBanned: false
  },
  {
    email: 'user@email.com',
    firstName: 'Fred',
    lastName: 'Frederick',
    password: '123',
    isAdmin: false,
    isBanned: false
  },
  {
    email: 'user1@email.com',
    firstName: 'Fred',
    lastName: 'Frederick',
    password: '123',
    isAdmin: false,
    isBanned: false
  },
  {
    email: 'user2@email.com',
    firstName: 'James',
    lastName: 'Frederickson',
    password: '123',
    isAdmin: false,
    isBanned: false
  }
]

const lineItemsArr = [
  {
    quantity: 2,
    discountAmount: 0,
    productId: 1,
    orderId: 1
  },
  {
    quantity: 2,
    discountAmount: 0,
    productId: 2,
    orderId: 4
  },
  {
    quantity: 1,
    discountAmount: 0,
    productId: 3,
    orderId: 4
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      usersArr.map(el => {
        return Users.create(el)
      })
    )

    await Promise.all(
      productsArr.map(el => {
        return Products.create(el)
      })
    )

    await Promise.all(
      ordersArr.map(el => {
        return Orders.create(el)
      })
    )
    await Promise.all(
      lineItemsArr.map(el => {
        return LineItems.create(el)
      })
    )

    console.log('Seeding success!')
    db.close()
  } catch (err) {
    console.error('Oh dear!!!!! Something went awry :/!')
    console.error(err)
    db.close()
  }
}

seed()
