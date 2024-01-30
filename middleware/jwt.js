import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async(req,res,next) => {
    let token = req.cookies.jwtToken;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader &&authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log('JWT verification error:', err);
                res.status(401).send("Unauthorized");
                return;
            }
            req.user = decoded.user;
            next();
        });
    }
    if(!token) {
        console.log('Token not found in cookies');
        res.status(401).send("User is not authorized or token is missing");
        return;
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).send("Unauthorized");
                return;
            }
            console.log('JWT verified:', decoded);
            req.user = decoded.user;
            next();
        });
    }
});

export default validateToken;