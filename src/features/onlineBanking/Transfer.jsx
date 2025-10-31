import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../store/slices/bankingSlice";

export default function Transfer() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const transactions = useSelector((s) => s.banking.transactions);

  const submit = (e) => {
    e.preventDefault();
    const txn = {
      id: "txn_" + Math.random().toString(36).slice(2, 9),
      type: "debit",
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      desc: "Transfer to " + to,
    };
    dispatch(addTransaction(txn));
    setTo("");
    setAmount("");
    const pendingApprovals = JSON.parse(
      localStorage.getItem("pendingApprovals") || "[]"
    );
    const transferApprovals = JSON.parse(
      localStorage.getItem("transferApprovals") || "[]"
    );
    transferApprovals.push({
      id: Date.now(),
      userName: pendingApprovals.fullName,
      type: "Transfer",
      amount: txn.amount,
      status: "pending",
    });
    localStorage.setItem(
      "transferApprovals",
      JSON.stringify(transferApprovals)
    );
    alert("Your transaction is pending approval by Regional Manager.");
    alert("Transaction successful (mock)");
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Transfer Funds</h3>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Beneficiary account / UPI"
          className="w-full p-2 border rounded"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="w-full p-2 border rounded"
        />
        <button className="bg-primary text-white px-4 py-2 rounded">
          Send
        </button>
      </form>

      <div className="mt-6">
        <h4 className="font-medium">Recent Transactions</h4>
        <ul className="mt-2 space-y-2">
          {transactions.slice(0, 5).map((t) => (
            <li key={t.id} className="p-2 border rounded flex justify-between">
              <div>
                <div className="text-sm">{t.desc}</div>
                <div className="text-xs text-gray-500">{t.date}</div>
              </div>
              <div
                className={`font-semibold ${
                  t.type === "debit" ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{t.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
