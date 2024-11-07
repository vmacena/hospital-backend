import { Request, Response } from "express";
import { CreateAdminService } from "../../services/admin/CreateAdminService";

import { Address } from "../../services/address/Address"; 

interface CreateAdminRequestBody {
  record: string;
  address: Address;
  picture_url: string;
}

class CreateAdminController {
  async handle(req: Request<{}, {}, CreateAdminRequestBody>, res: Response) {
    const { record, address, picture_url } = req.body;
    const accessLevelId = 1; 

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute(record, accessLevelId, address, picture_url);

    return res.json(admin);
  }
}

export { CreateAdminController };