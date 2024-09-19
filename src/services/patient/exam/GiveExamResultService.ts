import { PrismaClient } from "@prisma/client";

export class GiveExamResultService{
    private prisma = new PrismaClient();

    async execute(examId: number, result: string){
        if(!this.prisma.exam.findUnique({where: {id: examId}})){
            throw new Error("Exam not found.");
        }
        
        const exam = await this.prisma.exam.update({
            where: {
                id: examId
            },
            data: {	
                result: result
            }
        });

        return exam;
    }
}