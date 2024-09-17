import { Request, Response } from "express";
import { FindAllPatientsService } from "../../services/doctor/FindAllPatientsService";

class FindAllPatientsController {
    async handle(req: Request, res: Response){
        const { crm } = req.body;
        
        var findAllPatientsService = new FindAllPatientsService();
        const patients = findAllPatientsService.execute(crm);

        return res.json(patients);
    }
}
export { FindAllPatientsController }