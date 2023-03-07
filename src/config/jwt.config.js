import jwt from "jsonwebtoken";

const generateToken = (user) => {
  console.log(user)
  const token = jwt.sign(
    { _id: user._id, user: user.email },
    process.env.JWT_KEY,
    {
      expiresIn: 60 * 60,
    }
  );
  return token;
};

export default generateToken;
