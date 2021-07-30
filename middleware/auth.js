import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).send("vous devez s'inscrire")
    } else {
        try {
            const decoded = jwt.verify(token, "Secret")
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401)
            throw new Error('fausse token');
        }
    }
}
export default auth;