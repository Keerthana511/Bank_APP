// import React from "react";
// import { users, rms } from "../../utils/constants";

// const RMDashboard = ({ rmId }) => {
//   const rm = rms.find((r) => r.rmId === rmId);
//   const assignedUsers = users.filter((u) => u.rmId === rmId);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//            {" "}
//       <h1 className="text-2xl font-bold mb-4 text-green-700">
//                 Welcome, {rm.name} 👔      {" "}
//       </h1>
//            {" "}
//       <div className="bg-white shadow rounded-lg p-4 mb-6">
//                 <h2 className="font-semibold text-lg mb-2">RM Profile</h2>
//           <p>Email: {rm.email}</p>       {" "}
//         <p>Total Assigned Users: {assignedUsers.length}</p>     {" "}
//       </div>
//            {" "}
//       <div className="bg-white shadow rounded-lg p-4">
//                {" "}
//         <h2 className="font-semibold text-lg mb-2">Assigned Customers</h2>
//          {" "}
//         {assignedUsers.length > 0 ? (
//           <table className="w-full border-collapse">
//                        {" "}
//             <thead>
//                            {" "}
//               <tr className="bg-gray-100 text-left">
//                                 <th className="p-2 border">Customer Name</th>
//                             <th className="p-2 border">Account Balance</th>
//                        {" "}
//               </tr>
//                          {" "}
//             </thead>
//                        {" "}
//             <tbody>
//                            {" "}
//               {assignedUsers.map((u) => (
//                 <tr key={u.id}>
//                                     <td className="p-2 border">{u.name}</td>
//                                {" "}
//                   <td className="p-2 border">₹{u.balance.toLocaleString()}</td>
//                                {" "}
//                 </tr>
//               ))}
//                          {" "}
//             </tbody>
//                      {" "}
//           </table>
//         ) : (
//           <p className="text-gray-500">No users assigned.</p>
//         )}
//              {" "}
//       </div>
//          {" "}
//     </div>
//   );
// };

// export default RMDashboard;
