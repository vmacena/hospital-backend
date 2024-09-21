import { Request, Response } from "express";
import { CreateExamService } from "../../../services/patient/exam/CreateExamService";
import { FindAllExamsService } from "../../../services/patient/exam/FindAllExamsService";
import { UpdateExamDateService } from "../../../services/patient/exam/UpdateExamDateService";
import { CancelExamService } from "../../../services/patient/exam/CancelExamService";
import { GiveExamResultService } from "../../../services/patient/exam/GiveExamResultService";
import { getFromJwt } from "../../utils/FindSusNumber";
import dotenv from "dotenv";

dotenv.config();
var secret = process.env.JWT_SECRET as string;

export class PatientExamController {

    async create(request: Request, response: Response) {
        const { crm, datetime, type } = request.body;
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return response.status(401).json({ error: "Token não fornecido" });
        }

        try {
            const susNumber = await getFromJwt(token, secret);
            const createExamService = new CreateExamService();

            const exam = await createExamService.execute(crm, susNumber, datetime, type);
            return response.json(exam);
        } catch (err) {
            return response.status(401).json({ error: (err as Error).message });
        }
    }

    async findAll(request: Request, response: Response) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        try {
            const susNumber = await getFromJwt(token!, secret);
            const findAllExamsService = new FindAllExamsService();

            const exams = await findAllExamsService.execute(susNumber);
            return response.json(exams);
        } catch (err) {
            return response.status(401).json({ err });
        }
    }

    async updateDate(request: Request, response: Response) {
        const { examId, datetime } = request.body;

        const updateExamDateService = new UpdateExamDateService();

        const exam = await updateExamDateService.execute(Number(examId), datetime);

        return response.json(exam);
    }

    async cancel(request: Request, response: Response) {
        const { examId } = request.body;

        const cancelExamService = new CancelExamService();

        const exam = await cancelExamService.execute(Number(examId));

        return response.json(exam);
    }

}