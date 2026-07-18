import 'dotenv/config';
import { prisma } from './src/config/prisma.js';

async function test() {
  try {
    const notifs = await prisma.notification.findMany();
    console.log("Notifs:", notifs);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
