'use server'

import clientPromise from '../../lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function addExpense(formData: FormData) {
  const title = formData.get('title');
  const amount = formData.get('amount');
  const category = formData.get('category');
  const date = formData.get('date');

  const client = await clientPromise;
  const db = client.db("CoinCount"); 

  await db.collection("expenses").insertOne({
    title,
    amount: Number(amount),
    category,
    date: new Date(date as string),
    createdAt: new Date(),
  });

  revalidatePath('/'); 
}