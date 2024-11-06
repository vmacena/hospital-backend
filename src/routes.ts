import { Router } from "express";
import { CreateAdminController } from "./controllers/admin/CreateAdminController";
import { LoginAdminController } from "./controllers/admin/LoginAdminController";
import { CreatePatientController } from "./controllers/patient/CreatePatientController";
import { LoginPatientController } from "./controllers/patient/LoginPatientController";
import { CreateDoctorController } from "./controllers/doctor/CreateDoctorController";
import { LoginDoctorController } from "./controllers/doctor/LoginDoctorController";
import { FindAllPatientsController } from "./controllers/patient/FindAllPatientsController"; 
import { GetPatientDataController } from "./controllers/patient/GetPatientDataController";
import { GetAllLogsController } from "./controllers/log/GetAllLogsController";
import { FindDoctorAppointmentsAndExamsController } from "./controllers/doctor/FindDoctorAppointmentsAndExamsController";
import { PatientAppointmentController } from "./controllers/patient/appointment/PatientAppointmentController";
import { PatientExamController } from "./controllers/patient/exam/PatientExamController";
import { AdminAppointmentController } from "./controllers/admin/appointment/AdminAppointmentController";
import { AdminExamController } from "./controllers/admin/exam/AdminExamController";
import { AdminStatsController } from "./controllers/admin/stats/AdminStatsController";
import { authenticateToken } from "./middlewares/authenticateToken";
import { checkAdminAccess } from "./middlewares/checkAdminAccess";
import { AdminDoctorController } from "./controllers/admin/doctor/AdminDoctorController"; 
import { EditAddressController } from "./controllers/address/EditAddressController";


const router = Router();

// Controllers
const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();
const createPatientController = new CreatePatientController();
const loginPatientController = new LoginPatientController();
const getPatientDataController = new GetPatientDataController();
const createDoctorController = new CreateDoctorController();
const loginDoctorController = new LoginDoctorController();
const findAllPatientsController = new FindAllPatientsController(); 
const getAllLogsController = new GetAllLogsController();
const findDoctorAppointmentsAndExamsController = new FindDoctorAppointmentsAndExamsController();
const patientAppointmentController = new PatientAppointmentController();
const patientExamController = new PatientExamController();
const adminAppointmentController = new AdminAppointmentController();
const adminExamController = new AdminExamController();
const adminStatsController = new AdminStatsController();
const adminDoctorController = new AdminDoctorController(); 
const editAddressController = new EditAddressController();

// address
router.put("/address/:id", authenticateToken, editAddressController.handle);

// admin
router.post("/admin/register", createAdminController.handle);
router.post("/admin/login", loginAdminController.handle);
router.get("/admin/stats", authenticateToken, checkAdminAccess, adminStatsController.getStats);

router.post("/admin/appointments", authenticateToken, checkAdminAccess, adminAppointmentController.create);
router.put("/admin/appointments/:id", authenticateToken, checkAdminAccess, adminAppointmentController.update);
router.delete("/admin/appointments/:id", authenticateToken, checkAdminAccess, adminAppointmentController.delete);
router.get("/admin/appointments", authenticateToken, checkAdminAccess, adminAppointmentController.findAll);

router.post("/admin/exams", authenticateToken, checkAdminAccess, adminExamController.create);
router.put("/admin/exams/:id", authenticateToken, checkAdminAccess, adminExamController.update);
router.delete("/admin/exams/:id", authenticateToken, checkAdminAccess, adminExamController.delete);
router.get("/admin/exams", authenticateToken, checkAdminAccess, adminExamController.findAll);

router.get("/admin/doctors", authenticateToken, checkAdminAccess, adminDoctorController.findAll);

router.get("/logs", authenticateToken, checkAdminAccess, getAllLogsController.handle);

// doctor 
router.post("/doctor/register", createDoctorController.handle);
router.post("/doctor/login", loginDoctorController.handle);
router.get("/doctor/patients", authenticateToken, findAllPatientsController.handle);
router.get("/doctor/appointments-exams", authenticateToken, findDoctorAppointmentsAndExamsController.handle);

// patient 
router.post("/patient/register", createPatientController.handle);
router.post("/patient/login", loginPatientController.handle);
router.get("/patients", authenticateToken, findAllPatientsController.handle);
router.get("/patient/", authenticateToken, getPatientDataController.handle);

router.post("/patient/appointments/", authenticateToken, patientAppointmentController.create);
router.get("/patient/appointments/", authenticateToken, patientAppointmentController.findAll);
router.put("/patient/appointments/update-date", authenticateToken, patientAppointmentController.updateDate);
router.delete("/patient/appointments/cancel", authenticateToken, patientAppointmentController.cancel);
router.put("/patient/appointments/finish", authenticateToken, patientAppointmentController.finish);

router.post("/patient/exams/", authenticateToken, patientExamController.create);
router.get("/patient/exams/", authenticateToken, patientExamController.findAll);
router.put("/patient/exams/update-date", authenticateToken, patientExamController.updateDate);
router.delete("/patient/exams/cancel", authenticateToken, patientExamController.cancel);

export { router };