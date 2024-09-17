import { Request, Response } from "express";
import { FindAllPatientsService } from "../../services/doctor/FindAllPatientsService";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
var secret = process.env.JWT_SECRET as string;

class FindAllPatientsController {
    private secret = process.env.JWT_SECRET as string;

    async handle(req: Request, res: Response){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        let crm;
        try {
            const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
            crm = decoded.crm;
        } catch (err) {
            return res.status(401).json({ err });
        }
        
        var findAllPatientsService = new FindAllPatientsService();
        const patients = await findAllPatientsService.execute(crm);

        return res.json(patients);
    }
}
export { FindAllPatientsController }