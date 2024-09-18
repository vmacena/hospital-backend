import { PrismaClient } from "@prisma/client";1

export class UpdateExamDateService{
    private prisma = new PrismaClient();

    async execute(examId: number, newDate: string){
        if(!this.prisma.exam.findUnique({where: {id: examId}})){
            throw new Error("Exam not found.");
        }
        const exam = await this.prisma.exam.update({
            where: {
                id: examId
            },
            data: {
                date: newDate
            }
        });

        return exam;
    }
}