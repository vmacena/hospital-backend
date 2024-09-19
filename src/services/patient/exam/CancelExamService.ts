import { PrismaClient } from "@prisma/client";

export class CancelExamService{
    private prisma = new PrismaClient();

    async execute(examId: number){
        if(!this.prisma.exam.findUnique({where: {id: examId}})){
            throw new Error("Exam not found.");
        }

        const exam = await this.prisma.exam.delete({
            where: {
                id: examId
            },
        });

        return exam;
    }
}