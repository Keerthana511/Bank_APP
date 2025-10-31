export const users = [
  {
    id: 1,
    role: "user",
    name: "Keerthana",
    email: "keerthana@abc.com",
    password: "user123",
    balance: 45000,
    rmId: 101,
  },
  {
    id: 2,
    role: "user",
    name: "Aaliya",
    email: "aaliya@abc.com",
    password: "user123",
    balance: 72000,
    rmId: 101,
  },
];

export const rms = [
  {
    rmId: 101,
    role: "rm",
    name: "Rahul Menon",
    email: "rahul.menon@abc.com",
    password: "rm123",
  },
  {
    rmId: 102,
    role: "rm",
    name: "Divya Pillai",
    email: "divya.pillai@abc.com",
    password: "rm123",
  },
];

export const transactions = [
  { id: 1, userId: 1, type: "Debit", amount: 1200, desc: "Electricity Bill" },
  { id: 2, userId: 1, type: "Credit", amount: 2000, desc: "UPI Transfer" },
  { id: 3, userId: 2, type: "Debit", amount: 500, desc: "Mobile Recharge" },
];
