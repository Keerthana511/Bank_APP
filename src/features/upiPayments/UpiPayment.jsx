import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpiTransaction } from "../../store/slices/upiSlice";

export default function UpiPayment() {
  const [vpa, setVpa] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const upiTransactions = useSelector((s) => s.upi.upiTransactions);

  const submit = (e) => {
    e.preventDefault();
    const txn = {
      id: "upi_" + Math.random().toString(36).slice(2, 9),
      to: vpa,
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      status: "SUCCESS",
    };
    dispatch(addUpiTransaction(txn));
    setVpa("");
    setAmount("");
    alert("UPI payment (mock) successful");
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Make UPI Payment</h3>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={vpa}
          onChange={(e) => setVpa(e.target.value)}
          placeholder="VPA / UPI ID"
          className="w-full p-2 border rounded"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="w-full p-2 border rounded"
        />
        <button className="bg-primary text-white px-4 py-2 rounded">Pay</button>
      </form>

      <div className="mt-4">
        <h4 className="font-medium">Recent UPI</h4>
        <ul className="mt-2 space-y-2">
          {upiTransactions.map((u) => (
            <li key={u.id} className="p-2 border rounded flex justify-between">
              <div>
                <div className="text-sm">{u.to}</div>
                <div className="text-xs text-gray-500">{u.date}</div>
              </div>
              <div className="font-semibold text-green-600">₹{u.amount}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
