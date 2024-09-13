import { Router, Request, Response } from "express";
import { CreateAdminController } from "./controllers/CreateAdminController";
import { LoginAdminController } from "./controllers/LoginAdminController";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "approved" });
});

router.post("/register/admin", new CreateAdminController().handle);
router.post("/login/admin", new LoginAdminController().handle);

export default router;