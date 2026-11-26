export const AUTH_ROUTES = {
  ADMIN_LOGIN: "/admin/login",
  CLIENT_LOGIN: "/client/login",
  ADMIN_DASJBOARD: "/admin",
  CLIENT_DASHBOARD: "/client",
} as const;

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  REQUIRED_CREDENTIALS: "Please enter your email and password.",
  GENERIC_ERROR: "Something went wrong, please try again.",
} as const;
