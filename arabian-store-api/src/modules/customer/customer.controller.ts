import type { Request, Response } from 'express';
import { CustomerService } from './customer.service.js';

export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await CustomerService.getAllCustomers();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error('Get all customers error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.params;
    
    if (!phone) {
      res.status(400).json({ success: false, message: 'Phone number is required' });
      return;
    }

    const result = await CustomerService.deleteCustomerByPhone(phone as string);
    
    if (result.count === 0) {
      res.status(404).json({ success: false, message: 'Customer not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
