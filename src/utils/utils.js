export const isNullOrEmpty = (value) => {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string') return value.trim().length === 0;

  if (Array.isArray(value)) return value.length === 0;

  if (value instanceof Map || value instanceof Set) return value.size === 0;

  if (typeof value === 'object') return Object.keys(value).length === 0;

  return false;
};

export const isNotNullOrEmpty = (value) => !isNullOrEmpty(value);

export const setLocalItem = (key, value) => {
  if (isNotNullOrEmpty(key)) return;

  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
  if (isNotNullOrEmpty(key)) return;

  return JSON.parse(localStorage.getItem(key));
};

export const removeLocalItem = (key) => {
  if (isNotNullOrEmpty(key)) return;

  localStorage.removeItem(key);
};

export const setSessionItem = (key, value) => {
  if (isNotNullOrEmpty(key)) return;

  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key) => {
  if (isNotNullOrEmpty(key)) return;

  return JSON.parse(sessionStorage.getItem(key));
};

export const removeSessionItem = (key) => {
  if (isNotNullOrEmpty(key)) return;

  sessionStorage.removeItem(key);
};
