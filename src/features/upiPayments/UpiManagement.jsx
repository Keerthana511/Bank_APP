import React from 'react'
import { useSelector } from 'react-redux'

export default function UpiManagement(){
  const upiIds = useSelector(s=>s.upi.upiIds)
  return (
    <div>
      <h3 className="font-semibold mb-3">Manage UPI IDs</h3>
      <ul className="space-y-2">
        {upiIds.map(u=>(
          <li key={u.id} className="p-2 border rounded">{u.vpa}</li>
        ))}
      </ul>
