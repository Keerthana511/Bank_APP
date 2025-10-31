import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBeneficiary } from '../../store/slices/bankingSlice'

export default function BeneficiaryManagement(){
  const bens = useSelector(s=>s.banking.beneficiaries)
  const dispatch = useDispatch()
  return (
    <div>
      <h3 className="font-semibold mb-3">Beneficiaries</h3>
      <ul className="space-y-2">
        {bens.map(b=>(
          <li key={b.id} className="p-2 border rounded flex justify-between">
            <div>
              <div className="font-medium">{b.name}</div>
              <div className="text-xs text-gray-500">{b.account} | {b.ifsc}</div>
            </div>
            <button onClick={()=>dispatch(removeBeneficiary(b.id))} className="text-sm text-red-600">Remove</button>
          </li>
        ))}
      </ul>
