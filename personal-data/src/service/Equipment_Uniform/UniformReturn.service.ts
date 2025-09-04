import { UniformReturnModel } from '../../models/Equipment_Uniform/UniformReturn.model';
import { UniformAssignmentModel } from '../../models/Equipment_Uniform/UniformAssignment.model';
import { UniformInventoryModel } from '../../models/Equipment_Uniform/UniformInventory.model';
import { uniformReturnValidator } from '../../validator/Equipment_Uniform/EquipmentUniform.validator';

export class UniformReturnService {
  async create(data: any) {
    const { error } = uniformReturnValidator.validate(data);
    if (error) throw new Error(error.message);

    const assignment = await UniformAssignmentModel.findById(data.assignmentId);
    if (!assignment) throw new Error('Affectation introuvable');

    for (const item of data.returnedItems) {
      const inventory = await UniformInventoryModel.findById(item.inventoryId);
      if (!inventory) throw new Error(`UniformInventory introuvable pour l’ID : ${item.inventoryId}`);

      if (item.condition === 'GOOD') {
        inventory.quantityInStock += item.quantity;
        await inventory.save();
      }

    }

    // Mettre à jour le statut de l'affectation si tous les articles sont retournés
    assignment.currentStatus = 'RETURNED';
    assignment.statusHistory.push({
      status: 'RETURNED',
      date: new Date(),
      changedBy: data.returnedBy,
      reason: 'Retour d’uniforme',
    });
    await assignment.save();

    return await UniformReturnModel.create(data);
  }

  async update(id: string, data: any) {
    const { error } = uniformReturnValidator.validate(data);
    if (error) throw new Error(error.message);
    return await UniformReturnModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await UniformReturnModel.findByIdAndDelete(id);
  }

  async getAll() {
    return await UniformReturnModel.find()
      .populate('assignmentId')
      .populate('returnedItems.inventoryId');
  }

  async getById(id: string) {
    const retour = await UniformReturnModel.findById(id)
      .populate('assignmentId')
      .populate('returnedItems.inventoryId');
    if (!retour) throw new Error('Retour introuvable');
    return retour;
  }
}
