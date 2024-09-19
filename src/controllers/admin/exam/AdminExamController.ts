import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminExamController {
    async create(req: Request, res: Response): Promise<Response> {
        const { patientId, doctorId, type, date, result } = req.body;

        try {
            const exam = await prisma.exam.create({
                data: {
                    patientId,
                    doctorId,
                    type,
                    date,
                    result
                }
            });
            return res.status(201).json(exam);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { type, date, result } = req.body;

        try {
            const exam = await prisma.exam.update({
                where: { id: Number(id) },
                data: { type, date, result }
            });
            return res.status(200).json(exam);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            await prisma.exam.delete({
                where: { id: Number(id) }
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const exams = await prisma.exam.findMany();
            return res.status(200).json(exams);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}