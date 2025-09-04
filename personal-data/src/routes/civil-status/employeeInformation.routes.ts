// routes/employeeInformation.routes.ts
import { Router } from "express";
import { EmployeeInformationController } from "../../controllers/civil-status/employeeInformation.controller";

const router = Router();

router.post("/employeeInformation", EmployeeInformationController.create);
router.get("/employeeInformation", EmployeeInformationController.getAll);
router.get("/employeeInformation/:id", EmployeeInformationController.getById);
router.put("/employeeInformation/:id", EmployeeInformationController.update);
router.delete("/employeeInformation/:id", EmployeeInformationController.delete);

export default router;
