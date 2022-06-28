import jwt from 'jsonwebtoken';


export const createToken = (user, type) => {
    console.log({type});
    return jwt.sign({
        email: user.email,
        name: user.name,
        id: user.id,
        type,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}