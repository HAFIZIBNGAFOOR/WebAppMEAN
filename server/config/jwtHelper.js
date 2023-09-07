const jwt=require('jsonwebtoken');


module.exports.verifyJwtToken = async (req, res, next) => {
  let token; // Token sent from the client-side application is stored here
  if ('authorization' in req.headers) {
    token = req.headers['authorization'].split(' ')[1];

    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req._id = decoded._id;
        next();
      } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
          return res.status(401).send({auth:false,message:'token expired  '})
        }else{
          return res.status(500).send({ auth: false, message: 'Token authentication failed' });
        }
       
      }
    }
  }
};

// for admin

module.exports.verifyAdminJwtToken = async (req, res, next) => {
  let token; // Token sent from the client-side application is stored here
  if ('authorisation' in req.headers) {
    token = req.headers['authorisation'].split(' ')[1];
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
      try {
        const decoded = await jwt.verify(token,"SECRETISTHISSTRING");
        req._id = decoded.adminId;
        next();
      } catch (err) {
        return res.status(500).send({ auth: false, message: 'Token authentication failed' });
      }
    }
  }
};

