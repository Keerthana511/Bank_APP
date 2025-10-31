import React from "react";
import { useSelector } from "react-redux";

export default function PaymentHistory() {
  const payments = useSelector((s) => s.utility.payments);
  return (
    <div>
      <h3 className="font-semibold mb-3">Utility Payment History</h3>
      <ul className="space-y-2">
        {payments.map((p) => (
          <li key={p.id} className="p-2 border rounded flex justify-between">
            <div>
              <div className="text-sm">{p.biller}</div>
              <div className="text-xs text-gray-500">{p.date}</div>
            </div>
            <div className="font-semibold">₹{p.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
