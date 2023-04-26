export const validateEmail = (email: string) => {
  if (!email || email.trim().length === 0) return false;

  const reg = /^([A-Za-z0-9_-.])+@([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/;
  return reg?.test(email);
};

export const generateUsername = (name: string): string => {
  const username = name?.trim()?.toLowerCase().replace(/\s+/g, '');

  const randomNumber = Math.floor(Math.random() * 1000);
  const uniqueUsername = username + randomNumber;

  return uniqueUsername;
};
