import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPayment } from "../../store/slices/utilitySlice";

export default function UtilityPayment() {
  const billers = useSelector((s) => s.utility.billers);
  const payments = useSelector((s) => s.utility.payments);
  const [biller, setBiller] = useState(billers[0]?.billerId || "");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const p = {
      id: "pay_" + Math.random().toString(36).slice(2, 9),
      biller: billers[0]?.name || "Unknown",
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      status: "SUCCESS",
    };
    dispatch(addPayment(p));
    setAmount("");
    alert("Bill payment (mock) successful");
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Pay Utility Bill</h3>
      <form onSubmit={submit} className="space-y-3">
        <select
          value={biller}
          onChange={(e) => setBiller(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {billers.map((b) => (
            <option key={b.id} value={b.billerId}>
              {b.name}
            </option>
          ))}
        </select>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="w-full p-2 border rounded"
        />
        <button className="bg-primary text-white px-4 py-2 rounded">
          Pay Bill
        </button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium">Payment History</h4>
        <ul className="mt-2 space-y-2">
          {payments.map((p) => (
            <li key={p.id} className="p-2 border rounded flex justify-between">
              <div>
                <div className="text-sm">{p.biller}</div>
                <div className="text-xs text-gray-500">{p.date}</div>
              </div>
              <div className="font-semibold text-green-600">₹{p.amount}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
