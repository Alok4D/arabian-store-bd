import * as orderService from '../services/order.service.js';
export const createOrder = async (req, res, next) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            order: newOrder,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrders();
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=order.controller.js.map