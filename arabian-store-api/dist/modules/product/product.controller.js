import {} from 'express';
import { ProductService } from './product.service.js';
export const createProduct = async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = req.file.path;
        }
        // FormData sends values as strings, parse them to numbers
        if (productData.price)
            productData.price = Number(productData.price);
        if (productData.stock)
            productData.stock = Number(productData.stock);
        if (productData.shippingFee)
            productData.shippingFee = Number(productData.shippingFee);
        const product = await ProductService.createProduct(productData);
        res.status(201).json({ success: true, data: product });
    }
    catch (error) {
        console.error('Create product error:', error);
        if (error.code === 'P2002') {
            res.status(400).json({ success: false, message: 'Slug must be unique' });
            return;
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const productData = { ...req.body };
        if (req.file) {
            productData.image = req.file.path;
        }
        if (productData.price)
            productData.price = Number(productData.price);
        if (productData.stock)
            productData.stock = Number(productData.stock);
        if (productData.shippingFee)
            productData.shippingFee = Number(productData.shippingFee);
        const product = await ProductService.updateProduct(req.params.id, productData);
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//# sourceMappingURL=product.controller.js.map