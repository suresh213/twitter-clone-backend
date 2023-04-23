export const validateEmail = (email: string) => {
  if (!email || email.trim().length === 0) return false;

  const reg = /^([A-Za-z0-9_-.])+@([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/;
  return reg?.test(email);
};
