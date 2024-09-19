import { Request, Response } from "express";
import { CreateExamService } from "../../services/patient/exam/CreateExamService";
import { FindAllExamsService } from "../../services/patient/exam/FindAllExamsService";
import { UpdateExamDateService } from "../../services/patient/exam/UpdateExamDateService";
import { CancelExamService } from "../../services/patient/exam/CancelExamService";
import { GiveExamResultService } from "../../services/patient/exam/GiveExamResultService";

export class PatientExamController {
  async create(request: Request, response: Response) {
    const { crm, susNumber, datetime, type } = request.body;

    const createExamService = new CreateExamService();

    const exam = await createExamService.execute(crm, susNumber, datetime, type);

    return response.json(exam);
  }

  async findAll(request: Request, response: Response) {
    const { susNumber } = request.params;

    const findAllExamsService = new FindAllExamsService();

    const exams = await findAllExamsService.execute(BigInt(susNumber));

    return response.json(exams);
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

    async giveResult(request: Request, response: Response) {
        const { examId, result } = request.body;
    
        const giveExamResultService = new GiveExamResultService();
    
        const exam = await giveExamResultService.execute(Number(examId), result);
    
        return response.json(exam);
    }

}