import 'dotenv/config';
import { prisma } from '../src/config/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  // 1. Create Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: 'admin@arabianstore.com' }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: 'admin@arabianstore.com',
        password: hashedPassword,
      },
    });
    console.log('Default admin created: admin@arabianstore.com / admin123');
  } else {
    console.log('Admin already exists.');
  }

  // 2. Create Products
  const products = [
    {
      title: '১ কেজি মিসরীয় মেডজুল খেজুর',
      slug: '1kg-medjool',
      description: 'প্রিমিয়াম কোয়ালিটি নরম শাঁস, প্রাকৃতিক মিষ্টতা।',
      image: '/products/1kg.jpg', // Placeholder
      price: 1650,
      weight: '1 KG',
      stock: 200,
      shippingFee: 130
    },
    {
      title: '২ কেজি মিসরীয় মেডজুল খেজুর',
      slug: '2kg-medjool',
      description: 'বিশেষ ডিসকাউন্ট অফার!',
      image: '/products/2kg.jpg',
      price: 3200,
      weight: '2 KG',
      stock: 150,
      shippingFee: 130
    },
    {
      title: '৩ কেজি মিসরীয় মেডজুল খেজুর',
      slug: '3kg-medjool',
      description: 'বিশেষ ডিসকাউন্ট অফার!',
      image: '/products/3kg.jpg',
      price: 4500,
      weight: '3 KG',
      stock: 100,
      shippingFee: 130
    },
    {
      title: '৫ কেজি মিসরীয় মেডজুল খেজুর',
      slug: '5kg-medjool',
      description: 'বেস্ট সেলার, বিশেষ ডিসকাউন্ট অফার!',
      image: '/products/5kg.jpg',
      price: 7500,
      weight: '5 KG',
      stock: 50,
      shippingFee: 130
    }
  ];

  console.log('Seeding products...');
  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log('Products seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
