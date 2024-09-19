import { Request, Response } from "express";
import { CreateAppointmentService } from "../../services/patient/appointment/CreateAppointmentService";
import { FindAllAppointmentsService } from "../../services/patient/appointment/FindAllAppointmentsService";
import { UpdateAppointmentDateService } from "../../services/patient/appointment/UpdateAppointmentDateService";
import { CancelAppointmentService } from "../../services/patient/appointment/CancelAppointmentService";
import { FinishAppointmentService } from "../../services/patient/appointment/FinishAppointmentService";

export class PatientAppointmentController {
  async create(request: Request, response: Response) {
    const { crm, susNumber, datetime } = request.body;

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute(crm, susNumber, datetime);

    return response.json(appointment);
  }

  async findAll(request: Request, response: Response) {
    const { susNumber } = request.params;

    const findAllAppointmentsService = new FindAllAppointmentsService();

    const appointments = await findAllAppointmentsService.execute(BigInt(susNumber));

    return response.json(appointments);
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