let orders = [];

exports.getOrders = (req, res) => {
    res.json(orders);
};

exports.createOrder = (req, res) => {
    const { product, quantity, price } = req.body;
    const newOrder = { id: orders.length + 1, product, quantity, price };
    orders.push(newOrder);
    res.status(201).json(newOrder);
};

exports.getOrderById = (req, res) => {
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
};

exports.updateOrder = (req, res) => {
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    Object.assign(order, req.body);
    res.json(order);
};

exports.deleteOrder = (req, res) => {
    orders = orders.filter(o => o.id != req.params.id);
    res.json({ message: "Order deleted" });
};
