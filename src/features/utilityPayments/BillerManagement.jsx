import React from "react";
import { useSelector } from "react-redux";

export default function BillerManagement() {
  const billers = useSelector((s) => s.utility.billers);
  return (
    <div>
      <h3 className="font-semibold mb-3">Biller Management</h3>
      <ul className="space-y-2">
        {billers.map((b) => (
          <li key={b.id} className="p-2 border rounded">
            {b.name} ({b.billerId})
          </li>
        ))}
      </ul>
    </div>
  );
}
