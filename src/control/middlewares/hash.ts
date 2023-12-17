import bcrypt from 'bcrypt';

export const createHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const passwordCompare = async (requestPassword: string, databasePassword: string | null) => {
  if (!databasePassword) {
    return false;
  }
  const isValid = await bcrypt.compare(requestPassword, databasePassword);
  return isValid;
};
