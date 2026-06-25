

import clientPromise from '../lib/mongodb'
import { addExpense } from './actions/expenseActions';


async function getExpenses() {
  const client = await clientPromise;
  const db = client.db("CoinCount");
  const expenses = await db.collection("expenses").find({}).sort({ date: -1 }).toArray();
  return JSON.parse(JSON.stringify(expenses));
}

export default async function Home() {
  const expenses = await getExpenses();
  const total = expenses.reduce((acc: number, curr: any) => acc + curr.amount, 0);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">CoinCount Tracker</h1>
      
     
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-8 text-center">
        <h3 className="text-lg">Total Expenses</h3>
        <p className="text-4xl font-bold">${total.toFixed(2)}</p>
      </div>

    
      <form action={addExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-sm mb-10">
        <input name="title" placeholder="Expense Title" className="border p-3 rounded" required />
        <input name="amount" type="number" placeholder="Amount" className="border p-3 rounded" required />
        <select name="category" className="border p-3 rounded">
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <input name="date" type="date" className="border p-3 rounded" required />
        <button type="submit" className="bg-green-600 text-white p-3 rounded md:col-span-2 hover:bg-green-700">Add Expense</button>
      </form>

      
      <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
      <div className="space-y-3">
        {expenses.map((exp: any) => (
          <div key={exp._id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <p className="font-semibold">{exp.title}</p>
              <p className="text-sm text-gray-500">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
            </div>
            <p className="font-bold text-lg">${exp.amount}</p>
          </div>
        ))}
      </div>
    </main>
  );
}