import jwt from "jsonwebtoken";

export async function getFromJwt(token: string, secret:string){
    let susNumber;
    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        susNumber = decoded.susNumber;
    } catch (err) {
        throw err;
    }
    return susNumber;
}