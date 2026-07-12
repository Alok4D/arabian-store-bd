import { Router } from 'express';
import { getAllCustomers, deleteCustomer } from './customer.controller.js';

const router = Router();

router.get('/', getAllCustomers);
router.delete('/:phone', deleteCustomer);

export const CustomerRoutes = router;
