import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminStatsController {
    async getStats(req: Request, res: Response): Promise<Response> {
        try {
            const totalAppointments = await prisma.appointment.count();
            const totalExams = await prisma.exam.count();
            const totalPatients = await prisma.patient.count();
            const totalDoctors = await prisma.doctor.count();

            return res.status(200).json({
                totalAppointments,
                totalExams,
                totalPatients,
                totalDoctors
            });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}