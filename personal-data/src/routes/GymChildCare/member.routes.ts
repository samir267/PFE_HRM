import { Router } from "express";
import MemberController from "../../controllers/GymChildCare/member.controller";

const router = Router();

router.get("/Member/archived", MemberController.getArchivedMembers);

router.get("/Member/deleted", MemberController.getDeletedMembers);
router.post("/Member", MemberController.createMember);


router.get("/Member", MemberController.getAllMembers);


router.get("/Member/:id", MemberController.getMemberById);


// router.post("/Member/:id/details", MemberController.addMemberDetail);


router.post("/Member/:id/archive", MemberController.archiveMember);


router.delete("/Member/:id", MemberController.softDeleteMember);

router.post("/Member/:id/restore", MemberController.restoreMember);

router.delete("/Member/:id/delete", MemberController.permanentlyDeleteMember);

export default router;
