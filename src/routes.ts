import { Router, Request, Response } from "express";
import { CreateAdminController } from "./controllers/CreateAdminController";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "approved" });
});

router.post("/register/admin", new CreateAdminController().handle);

export default router;