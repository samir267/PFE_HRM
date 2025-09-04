import { Router } from "express";
import { StatusController } from "../../controllers/Affectation/statuses.controller";

const router = Router();

router.get("/statuses", StatusController.getAll);
router.post("/statuses", StatusController.create);
router.put("/statuses/:id", StatusController.update);

export default router;
