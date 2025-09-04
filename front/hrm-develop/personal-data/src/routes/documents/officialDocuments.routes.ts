import { Router } from "express";
import { OfficialDocumentController } from "../../controllers/documents/officialDocuments.controller";

const router = Router();

router.post("/OfficialDocument", OfficialDocumentController.create);
router.get("/OfficialDocument/:id", OfficialDocumentController.getById);
router.get("/OfficialDocument/employee/:employeeId", OfficialDocumentController.getByEmployee);
router.put("/OfficialDocument/:id", OfficialDocumentController.update);
router.delete("/OfficialDocument/:id", OfficialDocumentController.delete);

export default router;
