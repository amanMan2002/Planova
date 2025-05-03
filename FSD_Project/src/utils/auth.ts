export const checkAuth = (email: string, password: string): boolean => {
  return email === 'as96@gmail.com' && password === '123456789';
};

export const setAuthToken = (email: string) => {
  localStorage.setItem('user', JSON.stringify({ email, isLoggedIn: true }));
};

export const getAuthToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeAuthToken = () => {
  localStorage.removeItem('user');
};