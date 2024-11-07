import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminDoctorController {
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const doctors = await prisma.doctor.findMany({
                select: {
                    nameDoctor: true,
                    specialty: true,
                    address: true,
                    picture_url: true
                }
            });
            return res.status(200).json(doctors);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}