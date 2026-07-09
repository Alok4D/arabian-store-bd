import type { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';

export const getShipping = async (req: Request, res: Response): Promise<void> => {
  try {
    let setting = await prisma.shippingSetting.findFirst();
    if (!setting) {
      setting = await prisma.shippingSetting.create({
        data: {
          insideDhaka: 80,
          outsideDhaka: 130
        }
      });
    }
    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    console.error('Get shipping error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateShipping = async (req: Request, res: Response): Promise<void> => {
  try {
    const { insideDhaka, outsideDhaka } = req.body;

    let setting = await prisma.shippingSetting.findFirst();
    if (!setting) {
      setting = await prisma.shippingSetting.create({
        data: {
          insideDhaka: Number(insideDhaka) || 80,
          outsideDhaka: Number(outsideDhaka) || 130
        }
      });
    } else {
      setting = await prisma.shippingSetting.update({
        where: { id: setting.id },
        data: {
          insideDhaka: Number(insideDhaka),
          outsideDhaka: Number(outsideDhaka)
        }
      });
    }

    res.status(200).json({ success: true, message: 'Shipping settings updated successfully', data: setting });
  } catch (error) {
    console.error('Update shipping error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
