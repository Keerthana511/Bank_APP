import React from 'react'
import { useSelector } from 'react-redux'

export default function TransactionHistory(){
  const transactions = useSelector(s=>s.banking.transactions)
  return (
    <div>
      <h3 className="font-semibold mb-3">Transaction History</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Date</th><th className="p-2 text-left">Desc</th><th className="p-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t=>(
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.desc}</td>
              <td className="p-2 text-right">₹{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
