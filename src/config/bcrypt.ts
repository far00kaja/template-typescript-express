import bcrypt from "bcrypt" ;

const saltRounds = 10;

const hashPassword = (value: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(value, salt);

  return hash;
};

const matchPassword = (value: string, valueHash: string) => {
  return bcrypt.compareSync(value, valueHash);
};

// module.exports = { hashPassword, matchPassword };
export default {
  hashPassword, matchPassword
}