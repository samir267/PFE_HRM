import { Router } from "express";
import { AttachedDocumentController } from "../../controllers/documents/attachedDocuments.controller";

const router = Router();

// router.post("/AttachedDocument", AttachedDocumentController.create);
router.post("/AttachedDocument", AttachedDocumentController.createAttachedDocument);
router.get("/AttachedDocument/:id", AttachedDocumentController.getById);
router.get("/AttachedDocument/employee/:employeeId", AttachedDocumentController.getByEmployee);
router.put("/AttachedDocument/:id", AttachedDocumentController.update);
router.delete("/AttachedDocument/:id", AttachedDocumentController.delete);

export default router;
