import { Router } from "express";
import { CreateAdminController } from "./controllers/CreateAdminController";
import { LoginAdminController } from "./controllers/LoginAdminController";
import { CreatePatientController } from "./controllers/CreatePatientController";
import { LoginPatientController } from "./controllers/LoginPatientController";

const router = Router();

const createAdminController = new CreateAdminController();
const loginAdminController = new LoginAdminController();
const createPatientController = new CreatePatientController();
const loginPatientController = new LoginPatientController();

router.post("/register/admin", createAdminController.handle);
router.post("/login/admin", loginAdminController.handle);
router.post("/patient/register", createPatientController.handle);
router.post("/login", loginPatientController.handle);

export { router };