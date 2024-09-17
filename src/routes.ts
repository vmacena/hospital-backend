import { Router } from "express";
import { CreateAdminController } from "./controllers/admin/CreateAdminController";
import { LoginAdminController } from "./controllers/admin/LoginAdminController";
import { CreatePatientController } from "./controllers/patient/CreatePatientController";
import { LoginPatientController } from "./controllers/patient/LoginPatientController";
import { CreateDoctorController } from "./controllers/doctor/CreateDoctorController";
import { LoginDoctorController } from "./controllers/doctor/LoginDoctorController";
import { FindAllPatientsController } from "./controllers/doctor/FindAllPatientsController";

const router = Router();

const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();
const createPatientController = new CreatePatientController();
const loginPatientController = new LoginPatientController();
const createDoctorController = new CreateDoctorController();
const loginDoctorController = new LoginDoctorController();
const findAllPatientsController = new FindAllPatientsController();

router.post("/admin/register", createAdminController.handle);
router.post("/admin/login", loginAdminController.handle);

router.post("/patient/register", createPatientController.handle);
router.post("/patient/login", loginPatientController.handle);

router.post("/doctor/register", createDoctorController.handle);
router.post("/doctor/register", loginDoctorController.handle);
router.get("/doctor/patients", findAllPatientsController.handle);


export { router };