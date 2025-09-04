import { ArchivedMember } from "../../models/gymchildcare/ArchivedMember.model";
import { DeletedMember } from "../../models/gymchildcare/DeletedMember.model";
import { Member } from "../../models/gymchildcare/Member.model";
// import { MemberDetail } from "../../models/gymchildcare/MemberDetail.model";

export class MemberService {
  async createMember(data: any) {
    const member = new Member(data);
    return await member.save();
  }

  async getAllMembers() {
    return await Member.find();
  }

  async getMemberById(id: string) {
    return await Member.findById(id);
  }

//   async addMemberDetail(memberId: string, data: any) {
//     const detail = new MemberDetail({
//       ...data,
//       member_id: memberId,
//     });
//     return await detail.save();
//   }

  async archiveMember(id: string) {
    const member = await Member.findById(id);
    if (!member) throw new Error("Member not found");

    await ArchivedMember.create(member.toObject());
    await Member.findByIdAndDelete(id);
    return { message: "Member archived" };
  }

  async softDeleteMember(id: string) {
    const member = await Member.findById(id);
    if (!member) throw new Error("Member not found");

    await DeletedMember.create(member.toObject());
    await Member.findByIdAndDelete(id);
    return { message: "Member soft-deleted" };
  }

  async getDeletedMemebers() {
    return await DeletedMember.find();
  }

  async getArchivedMembers() {
    return await ArchivedMember.find();
  }

    async restoreMember(id: string) {
    const deletedMember = await DeletedMember.findById(id);
    if(!deletedMember) {
      const archivedMember = await ArchivedMember.findById(id);
      if(!archivedMember) throw new Error("Member not found");
      const restoredMember = new Member(archivedMember.toObject());
      await restoredMember.save();
      await ArchivedMember.findByIdAndDelete(id);
      return { message: "Member restored", member: archivedMember };
    }
    const restoredMember = new Member(deletedMember.toObject());
      await restoredMember.save();
      await ArchivedMember.findByIdAndDelete(id);
      return { message: "Member restored", member: deletedMember };

  }

  async permanentlyDeleteMember(id: string) {
    const deletedMember = await DeletedMember.findById(id);
    if (!deletedMember) throw new Error("Deleted member not found");
    await DeletedMember.findByIdAndDelete(id);
    return { message: "Member permanently deleted" };
  }
}
