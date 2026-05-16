export type Currency = "USD" | "EUR" | "GBP" | "CAD";

export const user = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  email: "alex.morgan@vaultpay.demo",
  avatar: "AM",
  plan: "VaultPay Plus",
};

export const balance = {
  total: 24_582.4,
  currency: "USD" as Currency,
  available: 24_182.4,
  pending: 400,
  monthChange: 4.2,
};

export const accounts = [
  { id: "1", name: "Main Account", last4: "4821", currency: "USD" as Currency, balance: 18_452.1 },
  { id: "2", name: "Savings", last4: "9134", currency: "USD" as Currency, balance: 6_130.3 },
  { id: "3", name: "Travel EUR", last4: "2207", currency: "EUR" as Currency, balance: 2_240.0 },
];

export type TxCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Income"
  | "Entertainment"
  | "Health"
  | "Transfer"
  | "Subscriptions";

export type Tx = {
  id: string;
  merchant: string;
  category: TxCategory;
  amount: number; // negative = outflow
  date: string;
  status: "completed" | "pending" | "failed";
  note?: string;
};

const merchants: Array<[string, TxCategory, number]> = [
  ["Whole Foods", "Food", -84.32],
  ["Uber", "Transport", -18.4],
  ["Apple Store", "Shopping", -1249.0],
  ["Spotify", "Subscriptions", -9.99],
  ["Salary — Acme Co.", "Income", 5_200],
  ["Netflix", "Subscriptions", -15.49],
  ["Shell", "Transport", -52.1],
  ["CVS Pharmacy", "Health", -23.18],
  ["Amazon", "Shopping", -132.4],
  ["Con Edison", "Bills", -98.22],
  ["Starbucks", "Food", -6.75],
  ["Lyft", "Transport", -22.6],
  ["Airbnb", "Entertainment", -340.0],
  ["Freelance — Studio K", "Income", 1_800],
  ["Trader Joe's", "Food", -68.94],
  ["Verizon", "Bills", -85.0],
  ["NY Times", "Subscriptions", -4.0],
  ["Equinox", "Health", -215.0],
  ["Delta Airlines", "Transport", -612.4],
  ["Best Buy", "Shopping", -279.0],
  ["Chipotle", "Food", -14.85],
  ["Refund — Zara", "Shopping", 49.9],
  ["Spotify Family", "Subscriptions", -16.99],
  ["Transfer to Maya R.", "Transfer", -120],
  ["Sweetgreen", "Food", -17.4],
  ["Hulu", "Subscriptions", -7.99],
  ["IKEA", "Shopping", -442.0],
  ["Pharmacy Plus", "Health", -41.2],
  ["MTA NYC", "Transport", -33.0],
  ["AMC Theatres", "Entertainment", -28.5],
  ["Side gig — Patreon", "Income", 320],
  ["Costco", "Food", -211.45],
  ["Geico", "Bills", -142.0],
  ["Headspace", "Subscriptions", -12.99],
  ["Uber Eats", "Food", -32.4],
  ["Notion", "Subscriptions", -10.0],
  ["Google Storage", "Subscriptions", -2.99],
  ["Refund — Apple", "Shopping", 79.0],
  ["Whole Foods", "Food", -55.12],
  ["Lyft", "Transport", -14.8],
];

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const transactions: Tx[] = merchants.map(([m, c, a], i) => ({
  id: `tx_${1000 + i}`,
  merchant: m,
  category: c,
  amount: a,
  date: daysAgo(Math.floor(i / 2)),
  status: i === 3 ? "pending" : i === 19 ? "failed" : "completed",
}));

export const beneficiaries = [
  { id: "b1", name: "Maya Rodriguez", handle: "@mayar", bank: "Chase", last4: "8821", avatar: "MR", color: "from-pink-500 to-rose-500" },
  { id: "b2", name: "James Chen", handle: "@jchen", bank: "Bank of America", last4: "3320", avatar: "JC", color: "from-blue-500 to-indigo-500" },
  { id: "b3", name: "Priya Patel", handle: "@priyap", bank: "Wells Fargo", last4: "0094", avatar: "PP", color: "from-amber-500 to-orange-500" },
  { id: "b4", name: "Daniel Kim", handle: "@dkim", bank: "Citi", last4: "7712", avatar: "DK", color: "from-emerald-500 to-teal-500" },
  { id: "b5", name: "Sofia Müller", handle: "@sofiam", bank: "N26", last4: "5538", avatar: "SM", color: "from-violet-500 to-fuchsia-500" },
  { id: "b6", name: "Liam O'Brien", handle: "@liamo", bank: "Revolut", last4: "1190", avatar: "LO", color: "from-cyan-500 to-sky-500" },
];

export const recentRecipients = beneficiaries.slice(0, 4);

export type Card = {
  id: string;
  name: string;
  number: string;
  last4: string;
  exp: string;
  cvv: string;
  network: "Visa" | "Mastercard";
  type: "Virtual" | "Physical";
  color: "midnight" | "teal" | "metal";
  frozen: boolean;
  monthSpend: number;
  monthLimit: number;
};

export const cards: Card[] = [
  {
    id: "c1",
    name: "Alex Morgan",
    number: "4821 9930 4412 7782",
    last4: "7782",
    exp: "09/28",
    cvv: "421",
    network: "Visa",
    type: "Virtual",
    color: "midnight",
    frozen: false,
    monthSpend: 1_240,
    monthLimit: 5_000,
  },
  {
    id: "c2",
    name: "Alex Morgan",
    number: "5412 2244 9087 3320",
    last4: "3320",
    exp: "02/27",
    cvv: "118",
    network: "Mastercard",
    type: "Physical",
    color: "teal",
    frozen: false,
    monthSpend: 412,
    monthLimit: 2_500,
  },
  {
    id: "c3",
    name: "Alex Morgan",
    number: "4812 0098 1145 2210",
    last4: "2210",
    exp: "11/29",
    cvv: "904",
    network: "Visa",
    type: "Virtual",
    color: "metal",
    frozen: true,
    monthSpend: 0,
    monthLimit: 1_000,
  },
];

export const spendingByCategory = [
  { name: "Food", value: 845, color: "var(--color-chart-1)" },
  { name: "Shopping", value: 1320, color: "var(--color-chart-2)" },
  { name: "Bills", value: 642, color: "var(--color-chart-3)" },
  { name: "Transport", value: 412, color: "var(--color-chart-4)" },
  { name: "Subscriptions", value: 188, color: "var(--color-chart-5)" },
];

export const monthlyFlow = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 200 + Math.sin(i / 3) * 80;
  return {
    day: `${day}`,
    income: Math.max(0, base + (i % 7 === 0 ? 1200 : 30) + Math.random() * 60),
    spending: Math.max(0, base + 90 + Math.random() * 200 - (i % 5 === 0 ? -150 : 0)),
  };
});

export const insights = [
  { id: 1, title: "You spent 23% less on dining", body: "Compared to last month. Keep it up.", tone: "success" as const },
  { id: 2, title: "Netflix renews in 3 days", body: "$15.49 will be charged on the 18th.", tone: "info" as const },
  { id: 3, title: "Unusual login from Berlin", body: "Review your recent device activity.", tone: "warning" as const },
];

export type Notif = {
  id: string;
  category: "Payments" | "Security" | "Account" | "Promotions";
  title: string;
  body: string;
  date: string;
  read: boolean;
};

export const notifications: Notif[] = [
  { id: "n1", category: "Payments", title: "You received $1,800 from Studio K", body: "Settled into your Main Account.", date: daysAgo(0), read: false },
  { id: "n2", category: "Security", title: "New sign-in from MacBook Pro", body: "New York, NY — review if this wasn't you.", date: daysAgo(0), read: false },
  { id: "n3", category: "Payments", title: "Transfer of $120 to Maya R. completed", body: "Reference VP-77821-MR.", date: daysAgo(1), read: true },
  { id: "n4", category: "Account", title: "Your statement is ready", body: "October 2025 statement available to download.", date: daysAgo(2), read: true },
  { id: "n5", category: "Promotions", title: "Earn 4.5% APY on Savings", body: "Limited time offer for VaultPay Plus members.", date: daysAgo(3), read: true },
  { id: "n6", category: "Security", title: "Two-factor authentication enabled", body: "Authenticator app linked successfully.", date: daysAgo(5), read: true },
  { id: "n7", category: "Payments", title: "Subscription charged — Spotify", body: "$9.99 on your Visa •• 7782.", date: daysAgo(6), read: true },
];

export const loginHistory = [
  { id: "l1", device: "MacBook Pro · Safari", location: "New York, NY", ip: "73.144.18.22", time: "2 hours ago", status: "current" as const },
  { id: "l2", device: "iPhone 15 · iOS App", location: "Brooklyn, NY", ip: "10.0.4.18", time: "Yesterday", status: "trusted" as const },
  { id: "l3", device: "Chrome · Windows", location: "Berlin, Germany", ip: "85.214.4.12", time: "3 days ago", status: "flagged" as const },
  { id: "l4", device: "iPad Air · iOS App", location: "Boston, MA", ip: "24.62.99.4", time: "Last week", status: "trusted" as const },
];

export const devices = [
  { id: "d1", name: "MacBook Pro 16\"", last: "Active now", trusted: true },
  { id: "d2", name: "iPhone 15 Pro", last: "Active 4h ago", trusted: true },
  { id: "d3", name: "iPad Air", last: "Active 6 days ago", trusted: true },
  { id: "d4", name: "Unknown · Chrome on Windows", last: "Berlin · 3 days ago", trusted: false },
];

export const faqs = [
  { q: "Is my money safe with VaultPay?", a: "Funds are held with our partner banks and protected up to $250,000 by deposit insurance. We use bank-grade encryption and continuous fraud monitoring." },
  { q: "Are there hidden fees?", a: "No. VaultPay Plus is a flat $4.99/month. Transfers between VaultPay users are free. International transfers show fees upfront before you confirm." },
  { q: "How fast are transfers?", a: "Internal transfers settle instantly. ACH transfers take 1–2 business days. International transfers typically arrive within 4 hours." },
  { q: "Can I freeze my card instantly?", a: "Yes — freeze and unfreeze any card from the app in one tap. No call center needed." },
  { q: "What if I lose my phone?", a: "Sign in from any trusted device and revoke access. Biometric and 2FA prevent unauthorized use." },
];

export const testimonials = [
  { name: "Jordan Lee", role: "Freelance Designer", quote: "VaultPay finally made my freelance finances feel calm. Invoices in, categorized, done.", avatar: "JL" },
  { name: "Aisha Khan", role: "Product Manager", quote: "The transfer flow is the cleanest I've used. Three taps and I'm done. No anxiety.", avatar: "AK" },
  { name: "Marco Silva", role: "Indie Developer", quote: "Virtual cards, instant freeze, and beautiful analytics. It's the bank I always wanted.", avatar: "MS" },
];
