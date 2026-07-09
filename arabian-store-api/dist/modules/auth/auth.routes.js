import { Router } from 'express';
import { loginAdmin, getProfile, updateProfile, updatePassword } from './auth.controller.js';
import { upload } from '../../utils/upload.js';
const router = Router();
router.post('/login', loginAdmin);
router.get('/profile', getProfile);
router.put('/profile', upload.single('image'), updateProfile);
router.put('/password', updatePassword);
export const AuthRoutes = router;
//# sourceMappingURL=auth.routes.js.map