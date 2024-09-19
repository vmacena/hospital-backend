import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminAppointmentController {
    async create(req: Request, res: Response): Promise<Response> {
        const { patientId, doctorId, date, status } = req.body;

        try {
            const appointment = await prisma.appointment.create({
                data: {
                    patientId,
                    doctorId,
                    date,
                    status
                }
            });
            return res.status(201).json(appointment);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { date, status } = req.body;

        try {
            const appointment = await prisma.appointment.update({
                where: { id: Number(id) },
                data: { date, status }
            });
            return res.status(200).json(appointment);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            await prisma.appointment.delete({
                where: { id: Number(id) }
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const appointments = await prisma.appointment.findMany();
            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}