import Order from "../models/order.model";

exports.createOrder = (req, res) => {


    const order = new Order({
        amountTotal: req.body.amountTotal,
        user: req.body.user,
        products: req.body.products
    })

    order.save()
    .then(data => {
        res.status(200).send({
            created:true,
            message:"Create success",
            data:data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}

exports.getOrders = (req, res) => {
    Order.find()
    .populate('products')
    .populate('user')
    .then((data) => res.send(data))
    .catch(err => console.log(err))
}


exports.getOrder = (req, res) => {
    Order.findById(req.params.id)
    .populate('products')
    .then((order) => {
        if(!order) {
            return res.status(404).send({
                message: `order not found with id ${req.params.id}`
            })
        }

        res.send(order)

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured"
        })
    })
}