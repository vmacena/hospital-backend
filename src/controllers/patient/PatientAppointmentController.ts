import { Request, Response } from "express";
import { CreateAppointmentService } from "../../services/patient/appointment/CreateAppointmentService";
import { FindAllAppointmentsService } from "../../services/patient/appointment/FindAllAppointmentsService";
import { UpdateAppointmentDateService } from "../../services/patient/appointment/UpdateAppointmentDateService";
import { CancelAppointmentService } from "../../services/patient/appointment/CancelAppointmentService";
import { FinishAppointmentService } from "../../services/patient/appointment/FinishAppointmentService";
import { getFromJwt } from "../utils/FindSusNumber";
import dotenv from "dotenv";

dotenv.config();

export class PatientAppointmentController {
  private secret = process.env.JWT_SECRET as string;

  async create(request: Request, response: Response) {
    const { crm, datetime } = request.body;
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try{
      const susNumber = await getFromJwt(token!, this.secret);
      const createAppointmentService = new CreateAppointmentService();
      
      const appointment = await createAppointmentService.execute(crm, susNumber, datetime);
      return response.json(appointment);
    } catch (err) {
      return response.status(401).json({ err });
    }
  }

  async findAll(request: Request, response: Response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try{
      const susNumber = await getFromJwt(token!, this.secret);
      const findAllAppointmentsService = new FindAllAppointmentsService();

      const appointments = await findAllAppointmentsService.execute(susNumber);
      return response.json(appointments);
    } catch (err) {
      return response.status(401).json({ err });
    }
  }

  async updateDate(request: Request, response: Response) {
    const { appointmentId, datetime } = request.body;

    const updateAppointmentDateService = new UpdateAppointmentDateService();

    const appointment = await updateAppointmentDateService.execute(Number(appointmentId), datetime);

    return response.json(appointment);
  }

  async cancel(request: Request, response: Response) {
    const { appointmentId } = request.body;

    const cancelAppointmentService = new CancelAppointmentService();

    const appointment = await cancelAppointmentService.execute(Number(appointmentId));

    return response.json(appointment);
  }

  async finish(request: Request, response: Response) {
    const { appointmentId } = request.body;

    const finishAppointmentService = new FinishAppointmentService();

    const appointment = await finishAppointmentService.execute(Number(appointmentId));

    return response.json(appointment);
  }
}