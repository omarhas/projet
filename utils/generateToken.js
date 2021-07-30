import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, "Secret", { expiresIn: 360000 })
}

export default generateToken;