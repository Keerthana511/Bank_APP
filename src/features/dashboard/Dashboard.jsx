import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Transfer from "../onlineBanking/Transfer";
import UtilityPayment from "../utilityPayments/UtilityPayment";
import UpiPayment from "../upiPayments/UpiPayment";

export default function Dashboard({ userRole: roleFromProps }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(roleFromProps || "user"); // default user

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("pendingUser"));

    if (!loggedUser) {
      navigate("/login"); // redirect to login if not found
    } else {
      setUser(loggedUser); // get role from localStorage if exists
      setUserRole(loggedUser.role || roleFromProps || "user");
    }
  }, [navigate, roleFromProps]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }; // 🔹 Decide which view to render based on role

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Welcome, {user?.fullName || "User"} 👋
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      {userRole === "rm" ? (
        <RMDashboardView />
      ) : (
        <UserDashboardView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          renderTab={() => renderTab(activeTab)}
        />
      )}
    </div>
  ); // 🔹 Tabs for normal user

  function renderTab(activeTab) {
    switch (activeTab) {
      case "summary":
        return <AccountSummary />;
      case "transfer":
        return <Transfer />;
      case "utility":
        return <UtilityPayment />;
      case "upi":
        return <UpiPayment />;
      default:
        return <AccountSummary />;
    }
  }
}

/* ------------------------------------------------------------------
   🧭 USER DASHBOARD VIEW
-------------------------------------------------------------------*/
function UserDashboardView({ activeTab, setActiveTab, renderTab }) {
  const tabs = [
    { key: "summary", label: "Account Summary" },
    { key: "transfer", label: "Fund Transfer" },
    { key: "utility", label: "Utility Payments" },
    { key: "upi", label: "UPI Payments" },
  ];

  return (
    <>
      <nav className="flex justify-center bg-white shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-medium ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main className="p-6 flex-1">{renderTab()}</main>
    </>
  );
}

/* ------------------------------------------------------------------
   🧭 RM DASHBOARD VIEW
-------------------------------------------------------------------*/
function RMDashboardView() {
  // const [clients, setClients] = useState([
  //   { id: 101, name: "Arjun Mehta", balance: 120000 },
  //   { id: 102, name: "Keerthi Nair", balance: 88000 },
  //   { id: 103, name: "Rahul Das", balance: 56000 },
  // ]);

  // return (
  //   <div className="p-6">
  //     <h2 className="text-xl font-semibold mb-4">Regional Manager Dashboard</h2>
  //     <p className="text-gray-600 mb-4">
  //       Overview of your managed clients and their current balances.
  //     </p>
  //     <table className="w-full text-sm text-left border">
  //       <thead>
  //         <tr className="bg-blue-50 text-blue-700">
  //           <th className="p-2 border">Client ID</th>
  //           <th className="p-2 border">Client Name</th>
  //           <th className="p-2 border">Account Balance</th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {clients.map((c) => (
  //           <tr key={c.id} className="border hover:bg-gray-50">
  //             <td className="p-2">{c.id}</td>
  //             <td className="p-2">{c.name}</td>
  //             <td className="p-2 text-green-600 font-medium">₹{c.balance}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  const [users, setUsers] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [regionStats, setRegionStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stored users and approvals from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedApprovals =
      JSON.parse(localStorage.getItem("transferApprovals")) || []; // Simulated summary stats

    const stats = {
      totalUsers: storedUsers.length,
      totalDeposits: storedUsers.reduce((acc, u) => acc + (u.balance || 0), 0),
      pendingApprovals: storedApprovals.length,
    };

    setUsers(storedUsers);
    setApprovals(storedApprovals);
    setRegionStats(stats);
  }, []);

  const handleApprove = (id) => {
    const updated = approvals.filter((a) => a.id !== id);
    localStorage.setItem("pendingApprovals", JSON.stringify(updated));
    setApprovals(updated);
    alert("✅ Transaction approved successfully");
  };

  const handleReject = (id) => {
    const updated = approvals.filter((a) => a.id !== id);
    localStorage.setItem("pendingApprovals", JSON.stringify(updated));
    setApprovals(updated);
    alert("❌ Transaction rejected");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };
  console.log("approvals", approvals.length);
  console.log("approvals find", approvals);
  return (
    <div className="p-6 min-h-screen bg-gray-100">
            {/* Header */}     {" "}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Regional Manager Dashboard
      </h1>
           {" "}
      <p className="text-gray-600 mb-6">
                Welcome, Regional Manager! Here’s your region overview.      {" "}
      </p>
            {/* Overview Stats */}     {" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
               {" "}
        <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm">Total Users</p>       
           {" "}
          <p className="text-2xl font-semibold text-blue-700">
            {regionStats.totalUsers}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm">Total Deposits</p>     
             {" "}
          <p className="text-2xl font-semibold text-green-600">
            ₹{regionStats.totalDeposits}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p className="text-gray-500 text-sm">Pending Approvals</p> 
                 {" "}
          <p className="text-2xl font-semibold text-orange-500">
            {regionStats.pendingApprovals}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
            {/* Users Table */}     {" "}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
               {" "}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          👥 Users in Your Region
        </h2>
               {" "}
        <table className="min-w-full text-sm">
                   {" "}
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                       {" "}
            <tr>
                            <th className="py-2 px-3 text-left">Name</th>       
                    <th className="py-2 px-3 text-left">Email</th>             {" "}
              <th className="py-2 px-3 text-left">Account No.</th>             {" "}
              <th className="py-2 px-3 text-left">Balance (₹)</th>           {" "}
            </tr>
                     {" "}
          </thead>
                   {" "}
          <tbody>
                       {" "}
            {users.length > 0 ? (
              users.map((u, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-3">{u.fullName}</td> 
                                  <td className="py-2 px-3">{u.email}</td>     
                             {" "}
                  <td className="py-2 px-3">{u.accountNo || "N/A"}</td>         
                          <td className="py-2 px-3">{u.balance || 0}</td>       
                         {" "}
                </tr>
              ))
            ) : (
              <tr>
                               {" "}
                <td className="py-3 text-center text-gray-500" colSpan={4}>
                                    No users found.                {" "}
                </td>
                             {" "}
              </tr>
            )}
                     {" "}
          </tbody>
                 {" "}
        </table>
             {" "}
      </div>
            {/* Pending Approvals */}     {" "}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
               {" "}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📝 Pending Approvals
        </h2>
               {" "}
        <table className="min-w-full text-sm">
                   {" "}
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                     
            <tr>
                            <th className="py-2 px-3 text-left">Request ID</th> 
                          <th className="py-2 px-3 text-left">User</th>         
                  <th className="py-2 px-3 text-left">Type</th>           
              <th className="py-2 px-3 text-left">Amount (₹)</th>           
              <th className="py-2 px-3 text-left">Actions</th>         
            </tr>{" "}
             
          </thead>{" "}
                 
          <tbody>
            {approvals.length > 0 ? (
              approvals.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-3">{a.id}</td>       
                            <td className="py-2 px-3">{a.userName}</td>         
                          <td className="py-2 px-3">{a.type}</td>               
                    <td className="py-2 px-3">{a.amount}</td>               
                  <td className="py-2 px-3 space-x-2">
                                     
                    <button
                      onClick={() => handleApprove(a.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                                            Approve                  
                    </button>
                                 
                    <button
                      onClick={() => handleReject(a.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                                            Reject                  
                    </button>
                                   
                  </td>
                               
                </tr>
              ))
            ) : (
              <tr>
                             
                <td className="py-3 text-center text-gray-500" colSpan={5}>
                                    No pending approvals.            
                </td>
                           
              </tr>
            )}
                     
          </tbody>
               
        </table>
           
      </div>
       
    </div>
  );
}

/* ------------------------------------------------------------------
   💰 ACCOUNT SUMMARY COMPONENT (for user)
-------------------------------------------------------------------*/
function AccountSummary() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-10-01", type: "Credit", amount: 1500, desc: "Salary" },
    {
      id: 2,
      date: "2025-10-03",
      type: "Debit",
      amount: 200,
      desc: "Electricity Bill",
    },
    {
      id: 3,
      date: "2025-10-06",
      type: "Debit",
      amount: 500,
      desc: "UPI Payment",
    },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2> 
      <table className="w-full text-sm text-left border">
        <thead>
          <tr className="bg-blue-50 text-blue-700">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border hover:bg-gray-50">
              <td className="p-2">{txn.date}</td>
              <td className="p-2">{txn.desc}</td>
              <td
                className={`p-2 ${
                  txn.type === "Credit" ? "text-green-600" : "text-red-500"
                }`}
              >
                {txn.type}
              </td>
              <td className="p-2">₹{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
