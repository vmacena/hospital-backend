import { Request, Response } from "express";
import { FindAllPatientsService } from "../../services/patient/FindAllPatientsService";

class FindAllPatientsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const findAllPatientsService = new FindAllPatientsService();

        try {
            const patients = await findAllPatientsService.execute();
            return res.status(200).json(patients);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export { FindAllPatientsController };