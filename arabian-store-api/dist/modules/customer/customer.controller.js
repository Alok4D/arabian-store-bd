import { CustomerService } from './customer.service.js';
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json({ success: true, data: customers });
    }
    catch (error) {
        console.error('Get all customers error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//# sourceMappingURL=customer.controller.js.map