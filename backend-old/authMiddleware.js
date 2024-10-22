const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;  // 从环境变量中获取密钥

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;  // 将用户信息保存到请求中
    next();
  });
};

module.exports = verifyToken;
