import bcrypt from 'bcryptjs';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries in reverse dependency order
  await knex('order_items').del();
  await knex('orders').del();
  await knex('products').del();
  await knex('categories').del();
  await knex('users').del();
  await knex('customers').del();
  await knex('custom_orders').del();
  await knex('messages').del();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  // Users
  await knex('users').insert([
    { email: 'admin@pochampally.com', password: hashedPassword, role: 'ADMIN' }
  ]);

  // Categories
  const insertedCategories = await knex('categories').insert([
    { name: 'Silk Ikkat' },
    { name: 'Cotton Ikkat' },
    { name: 'Dupattas' },
    { name: 'Lehengas' }
  ]).returning('*');

  // Products
  const getCatId = (name) => insertedCategories.find(c => c.name === name)?.id;

  if (insertedCategories.length > 0) {
    await knex('products').insert([
      {
        name: 'Crimson Silk Ikkat Saree',
        sku: 'IK-SLK-001',
        price: 14500,
        category_id: getCatId('Silk Ikkat'),
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
        availability: 'Only 1 Piece Available',
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800']
      },
      {
        name: 'Golden Beige Wedding Ikkat',
        sku: 'IK-SLK-002',
        price: 18000,
        category_id: getCatId('Silk Ikkat'),
        imageUrl: 'https://images.unsplash.com/photo-1583391733958-65e280807b55?auto=format&fit=crop&q=80&w=800',
        availability: 'Only 1 Piece Available',
        images: ['https://images.unsplash.com/photo-1583391733958-65e280807b55?auto=format&fit=crop&q=80&w=800']
      },
      {
        name: 'Navi Blue Cotton Ikkat',
        sku: 'IK-COT-001',
        price: 6500,
        category_id: getCatId('Cotton Ikkat'),
        imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800',
        availability: 'In Stock',
        images: ['https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800']
      }
    ]);
  }
};
