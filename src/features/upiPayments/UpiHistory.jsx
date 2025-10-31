import React from 'react'
import { useSelector } from 'react-redux'

export default function UpiHistory(){
  const upiTransactions = useSelector(s=>s.upi.upiTransactions)
  return (
    <div>
      <h3 className="font-semibold mb-3">UPI Transaction History</h3>
      <ul className="space-y-2">
        {upiTransactions.map(u=>(
          <li key={u.id} className="p-2 border rounded flex justify-between">
            <div>
              <div className="text-sm">{u.to}</div>
              <div className="text-xs text-gray-500">{u.date}</div>
            </div>
            <div className="font-semibold">{u.status}</div>
          </li>
        ))}
      </ul>
