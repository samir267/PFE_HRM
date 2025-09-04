import { Request, Response } from "express";
import { MemberService } from "../../service/GymChildCare/memberService.service";

const memberService = new MemberService();

class MemberController {
  async createMember(req: Request, res: Response) {
    try {
      const member = await memberService.createMember(req.body);
      res.status(201).json(member);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllMembers(req: Request, res: Response) {
    try {
      const members = await memberService.getAllMembers();
      res.json(members);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getMemberById(req: Request, res: Response) {
    try {
      const member = await memberService.getMemberById(req.params.id);
      if (!member) return res.status(404).json({ error: "Member not found" });
      res.json(member);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

//   async addMemberDetail(req: Request, res: Response) {
//     try {
//       const detail = await memberService.addMemberDetail(req.params.id, req.body);
//       res.status(201).json(detail);
//     } catch (err: any) {
//       res.status(400).json({ error: err.message });
//     }
//   }

  async archiveMember(req: Request, res: Response) {
    try {
      const result = await memberService.archiveMember(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async softDeleteMember(req: Request, res: Response) {
    try {
      const result = await memberService.softDeleteMember(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getDeletedMembers(req: Request, res: Response) {
    try {
      const members = await memberService.getDeletedMemebers();
      res.json(members);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getArchivedMembers(req: Request, res: Response) {
    try {
      const members = await memberService.getArchivedMembers();
      res.json(members);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async restoreMember(req: Request, res: Response) {
    try {
      const result = await memberService.restoreMember(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  async permanentlyDeleteMember(req: Request, res: Response) {
    try {
      const result = await memberService.permanentlyDeleteMember(req.params.id);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  
}

export default new MemberController();
