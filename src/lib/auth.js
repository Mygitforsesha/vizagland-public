import { APP_URLS } from '@/config/appConfig';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';
const TOKEN_TYPE_KEY = 'token_type';

export function saveAuthSession({ token, tokenType, user }) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TYPE_KEY, tokenType);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getCurrentUserRole() {
  return getCurrentUser()?.user_role ?? null;
}

export function isLoggedIn() {
  return Boolean(getToken() && getCurrentUser());
}

export function getAuthenticatedRedirectUrl() {
  if (!isLoggedIn()) return null;

  const token = getToken();
  const user = getCurrentUser();
  const tokenType = localStorage.getItem(TOKEN_TYPE_KEY);

  return getPostLoginRoute(user.user_role, { token, tokenType, user });
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(TOKEN_TYPE_KEY);
  window.location.replace(APP_URLS.PUBLIC);
}

function appendDevAuthBridge(url, { token, tokenType, user }) {
  const devUser = encodeURIComponent(JSON.stringify(user));
  const encodedTokenType = encodeURIComponent(tokenType ?? '');

  return `${url}?dev_token=${token}&dev_user=${devUser}&token_type=${encodedTokenType}`;
}

/**
 * Returns the full post-login URL for a supported role, or null for unknown roles.
 */
export function getPostLoginRoute(userRole, session) {
  switch (userRole) {
    case 'admin': {
      const url = `${APP_URLS.ADMIN}/dashboard`;
      if (import.meta.env.DEV && session) {
        return appendDevAuthBridge(url, session);
      }
      return url;
    }
    case 'employee':
    case 'agent': {
      const url = APP_URLS.AUTH_USER;
      if (import.meta.env.DEV && session) {
        return appendDevAuthBridge(url, session);
      }
      return url;
    }
    default:
      return null;
  }
}
