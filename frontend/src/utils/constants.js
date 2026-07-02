// ===============================
// API
// ===============================

export const BASE_URL = "http://localhost:9000";


// ===============================
// AUTH
// ===============================

export const TOKEN_KEY = "token";

export const USER_KEY = "user";


// ===============================
// CARD TYPES
// ===============================

export const CARD_TYPES = [
  "VISA",
  "MASTERCARD",
  "RUPAY",
];


// ===============================
// CARD VARIANTS
// ===============================

export const CARD_VARIANTS = [
  "CLASSIC",
  "GOLD",
  "PLATINUM",
];


// ===============================
// CURRENCIES
// ===============================

export const CURRENCIES = [
  "INR",
  "USD",
  "EUR",
];


// ===============================
// PAYMENT MODES
// ===============================

export const PAYMENT_MODES = [
  "ONLINE",
  "UPI",
  "POS",
  "CONTACTLESS",
];


// ===============================
// TRANSACTION STATUS
// ===============================

export const TRANSACTION_STATUS = [
  "SUCCESS",
  "FAILED",
  "PENDING",
];


// ===============================
// MERCHANT CATEGORIES
// ===============================

export const MERCHANT_CATEGORIES = [
  "SHOPPING",
  "FOOD",
  "TRAVEL",
  "FUEL",
  "MEDICAL",
  "ENTERTAINMENT",
  "GROCERY",
  "BILL PAYMENT",
];


// ===============================
// PAYMENT METHODS
// ===============================

export const PAYMENT_METHODS = [
  "UPI",
  "NET BANKING",
  "DEBIT CARD",
  "CREDIT CARD",
  "WALLET",
];


// ===============================
// ROUTES
// ===============================

export const ROUTES = {

  LOGIN: "/login",

  SIGNUP: "/signup",

  DASHBOARD: "/dashboard",

  PROFILE: "/profile",

  CARDS: "/cards",

  CREATE_CARD: "/cards/create",

  AVAILABLE_LIMIT: "/cards/available-limit",

  STATEMENT: "/cards/statement",

  REWARD: "/cards/reward-balance",

  BLOCK_CARD: "/cards/block",

  UNBLOCK_CARD: "/cards/unblock",

  TRANSACTIONS: "/transactions",

  ADD_TRANSACTION: "/transactions/add",

  SEARCH_TRANSACTION: "/transactions/search",

  BILLING: "/billing",

  PAYMENT: "/payment",

};


// ===============================
// SIDEBAR MENU
// ===============================

export const SIDEBAR_ITEMS = [

  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
  },

  {
    title: "Cards",
    path: ROUTES.CARDS,
  },

  {
    title: "Create Card",
    path: ROUTES.CREATE_CARD,
  },

  {
    title: "Transactions",
    path: ROUTES.TRANSACTIONS,
  },

  {
    title: "Add Transaction",
    path: ROUTES.ADD_TRANSACTION,
  },

  {
    title: "Billing",
    path: ROUTES.BILLING,
  },

  {
    title: "Payment",
    path: ROUTES.PAYMENT,
  },

  {
    title: "Rewards",
    path: ROUTES.REWARD,
  },

  {
    title: "Profile",
    path: ROUTES.PROFILE,
  },

];


// ===============================
// COLORS
// ===============================

export const COLORS = {

  PRIMARY: "#2563EB",

  SUCCESS: "#16A34A",

  WARNING: "#EAB308",

  DANGER: "#DC2626",

  INFO: "#0EA5E9",

};


// ===============================
// PAGINATION
// ===============================

export const PAGE_SIZE = 10;


// ===============================
// DATE FORMAT
// ===============================

export const DATE_FORMAT = "DD-MM-YYYY";


// ===============================
// CURRENCY FORMAT
// ===============================

export const LOCALE = "en-IN";

export const DEFAULT_CURRENCY = "INR";