import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, } from './product.controller.js';
import { upload } from '../../utils/upload.js';
const router = Router();
router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.patch('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);
export const ProductRoutes = router;
//# sourceMappingURL=product.routes.js.map