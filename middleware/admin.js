import User from '../models/User.js';

const Admin = async (req, res, next) => {
    console.log(req)
    const findUser = await User.findOne({ _id: req.body.id })
    if (!findUser.isAdmin) {
        res.status(403).send("vous n'étes pas un admin");
    } else {
        next();
    }
}
export default Admin