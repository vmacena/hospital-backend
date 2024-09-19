import { Router } from "express";
import { CreateAdminController } from "./controllers/admin/CreateAdminController";
import { LoginAdminController } from "./controllers/admin/LoginAdminController";
import { CreatePatientController } from "./controllers/patient/CreatePatientController";
import { LoginPatientController } from "./controllers/patient/LoginPatientController";
import { CreateDoctorController } from "./controllers/doctor/CreateDoctorController";
import { LoginDoctorController } from "./controllers/doctor/LoginDoctorController";
import { FindAllPatientsController } from "./controllers/doctor/FindAllPatientsController";
import { GetPatientDataController } from "./controllers/patient/GetPatientDataController";
import { ScheduleExamController } from "./controllers/exam/ScheduleExamController";
import { GetAllLogsController } from "./controllers/log/GetAllLogsController";
import { FindDoctorAppointmentsAndExamsController } from "./controllers/doctor/FindDoctorAppointmentsAndExamsController"; // Importe o controlador
import { PatientAppointmentController } from "./controllers/patient/PatientAppointmentController";
import { PatientExamController } from "./controllers/patient/PatientExamController";
import { authenticateToken } from "./middlewares/authenticateToken";
import { checkAdminAccess } from "./middlewares/checkAdminAccess"; // Importe o middleware

const router = Router();

const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();
const createPatientController = new CreatePatientController();
const loginPatientController = new LoginPatientController();
const getPatientDataController = new GetPatientDataController();
const createDoctorController = new CreateDoctorController();
const loginDoctorController = new LoginDoctorController();
const findAllPatientsController = new FindAllPatientsController();
const scheduleExamController = new ScheduleExamController();
const getAllLogsController = new GetAllLogsController();
const findDoctorAppointmentsAndExamsController = new FindDoctorAppointmentsAndExamsController(); // Instancie o controlador
const patientAppointmentController = new PatientAppointmentController();
const patientExamController = new PatientExamController();

router.post("/admin/register", createAdminController.handle);
router.post("/admin/login", loginAdminController.handle);

router.post("/doctor/register", createDoctorController.handle);
router.post("/doctor/login", loginDoctorController.handle);
router.get("/doctor/patients", authenticateToken, findAllPatientsController.handle);
router.get("/doctor/appointments-exams", authenticateToken, findDoctorAppointmentsAndExamsController.handle); // Adicione a nova rota

router.post("/patient/register", createPatientController.handle);
router.post("/patient/login", loginPatientController.handle);
router.get("/patient/:id", authenticateToken, getPatientDataController.handle);

router.post("/patient/appointments/", authenticateToken, patientAppointmentController.create);
router.get("/patient/appointments/", authenticateToken, patientAppointmentController.findAll);
router.put("/patient/appointments/update-date", authenticateToken, patientAppointmentController.updateDate);
router.delete("/patient/appointments/cancel", authenticateToken, patientAppointmentController.cancel);
router.put("/patient/appointments/finish", authenticateToken, patientAppointmentController.finish);

router.post("/patient/exams/", authenticateToken, patientExamController.create);
router.get("/patient/exams/", authenticateToken, patientExamController.findAll);
router.put("/patient/exams/update-date", authenticateToken, patientExamController.updateDate);
router.delete("/patient/exams/cancel", authenticateToken, patientExamController.cancel);
router.put("/patient/exams/give-result", authenticateToken, patientExamController.giveResult);

router.post("/exam/schedule", authenticateToken, scheduleExamController.handle); // sorry :(

router.get("/logs", authenticateToken, checkAdminAccess, getAllLogsController.handle); // Adicione o middleware aqui


export { router };