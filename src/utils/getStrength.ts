export const getStrength = (password: string) => {
  let strength = 0;
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  if (/[0-9]/.test(password)) {
    strength += 1;
  }
  if (/[\W_]/.test(password)) {
    strength += 1;
  }
  return strength;
};
