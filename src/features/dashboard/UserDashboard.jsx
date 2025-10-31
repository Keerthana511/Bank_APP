// import React from "react";
// import { users, rms, transactions } from "../../utils/constants";

// const UserDashboard = ({ userId }) => {
//   const user = users.find((u) => u.id === userId);
//   const rm = rms.find((r) => r.rmId === user.rmId);
//   const userTransactions = transactions.filter((t) => t.userId === userId);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//            {" "}
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">
//         Welcome, {user.name} 👋
//       </h1>
//            {" "}
//       <div className="bg-white shadow rounded-lg p-4 mb-6">
//                 <h2 className="font-semibold text-lg mb-2">Account Summary</h2>
//               <p>Account Balance: ₹{user.balance.toLocaleString()}</p>       {" "}
//         <p>
//           Assigned RM: <strong>{rm.name}</strong>
//         </p>
//                 <p>Contact: {rm.email}</p>     {" "}
//       </div>
//            {" "}
//       <div className="bg-white shadow rounded-lg p-4">
//                {" "}
//         <h2 className="font-semibold text-lg mb-2">Recent Transactions</h2>
//          {" "}
//         {userTransactions.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//                        {" "}
//             {userTransactions.map((t) => (
//               <li key={t.id} className="py-2 flex justify-between">
//                                 <span>{t.desc}</span>               {" "}
//                 <span
//                   className={
//                     t.type === "Debit" ? "text-red-600" : "text-green-600"
//                   }
//                 >
//                                     {t.type === "Debit" ? "-" : "+"} ₹{t.amount}
//                                  {" "}
//                 </span>
//                              {" "}
//               </li>
//             ))}
//                      {" "}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No transactions yet.</p>
//         )}
//              {" "}
//       </div>
//          {" "}
//     </div>
//   );
// };

// export default UserDashboard;
