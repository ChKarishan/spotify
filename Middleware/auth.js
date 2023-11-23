import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try{
        // console.log(req.header);
        // let token = req.header;
        let token = req.header("Authorization");
        console.log(token);
        if(!token){
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")){
            console.log(token)
           token = token.slice(7, token.length).trimleft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err){
        res.status(500).json({error: err.message});
    }
}
