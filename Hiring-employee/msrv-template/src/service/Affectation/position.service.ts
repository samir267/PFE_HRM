// import PositionModel from "../../models/Affectation/position.model";
// import { IPosition } from "../../types/Affectation/position.type";
// import { positionSchema } from "../../validator/Affectation/affectation.validator";
// import { Types } from "mongoose";

import { IStaffingRequest, StaffingRequest } from "../../models/Affectation/position.model";

// class PositionService {
//   // Créer un poste
//   async createPosition(data: Omit<IPosition, "createdAt" | "updatedAt">): Promise<IPosition> {
//   // Validation des données via Joi
//   const { error, value } = positionSchema.validate(data, { abortEarly: false });
//   if (error) {
//     throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
//   }

//   // Validation métier (en plus de Joi si nécessaire)
//   this.validateSalaryRange(value.minSalaryGrade, value.maxSalaryGrade);

//   const position = await PositionModel.create(value);
//   return position;
// }

//   // Obtenir tous les postes (avec filtre optionnel sur `isActive`)
//   async getAllPositions(isActive?: boolean): Promise<IPosition[]> {
//     const query = isActive !== undefined ? { isActive } : {};
//     return await PositionModel.find(query).exec();
//   }

//   // Obtenir un poste par ID
//   async getPositionById(id: string): Promise<IPosition | null> {
//     if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
//     return await PositionModel.findById(id).exec();
//   }

//   // Mettre à jour un poste
//   async updatePosition(id: string, data: Partial<IPosition>): Promise<IPosition | null> {
//     if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");

//       const { error, value } = positionSchema.validate(data, { abortEarly: false });

//   if (error) {
//     throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
//   }
//     if (data.minSalaryGrade !== undefined && data.maxSalaryGrade !== undefined) {
//       this.validateSalaryRange(data.minSalaryGrade, data.maxSalaryGrade);
//     }
//     const updated = await PositionModel.findByIdAndUpdate(id, data, { new: true });
//     if (!updated) throw new Error("Position not found");

//     return updated;
//   }

//   // Supprimer un poste
//   async deletePosition(id: string): Promise<void> {
//     if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
//     await PositionModel.findByIdAndDelete(id);

//   }

//   // Valider la cohérence de la plage salariale
//   private validateSalaryRange(min: number, max: number): void {
//     if (min > max) {
//       throw new Error("minSalaryGrade must be less than or equal to maxSalaryGrade");
//     }
//   }

//   // Vérifie si la position respecte la limite d'effectif
//   // async isHeadcountAvailable(positionId: string): Promise<boolean> {
//   //   const position = await PositionModel.findById(positionId);
//   //   if (!position) throw new Error("Position not found");

//   //   // Cette logique suppose qu’il existe une collection d’assignations
//   //   const activeAssignments = await PositionModel.db
//   //     .collection("assignments")
//   //     .countDocuments({ positionId: new Types.ObjectId(positionId), isActive: true });

//   //   return activeAssignments < position.headcountLimit;
//   // }
// }

// export default new PositionService();

export class StaffingRequestService {
  // Créer une nouvelle demande
  async create(data: Partial<IStaffingRequest>): Promise<IStaffingRequest> {
    const request = new StaffingRequest(data);
    return await request.save();
  }

  async updateStatus(
    id: string,
    status: string
  ): Promise<IStaffingRequest | null> {
    return await StaffingRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true } // retourne l'objet mis à jour
    );
  }

  // Récupérer toutes les demandes
  async findAll(): Promise<IStaffingRequest[]> {
    return await StaffingRequest.find().sort({ createdAt: -1 }).exec();
  }

  // Récupérer une demande par ID MongoDB (_id)
  async findById(id: string): Promise<IStaffingRequest | null> {
    return await StaffingRequest.findById(id).exec();
  }

  // Récupérer une demande par identifiant métier (ex: REQ-1234567890)
  async findByBusinessId(reqId: string): Promise<IStaffingRequest | null> {
    return await StaffingRequest.findOne({ id: reqId }).exec();
  }

  // Mettre à jour une demande
  async update(id: string, data: Partial<IStaffingRequest>): Promise<IStaffingRequest | null> {
    return await StaffingRequest.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Supprimer une demande
  async delete(id: string): Promise<IStaffingRequest | null> {
    return await StaffingRequest.findByIdAndDelete(id).exec();
  }
}
