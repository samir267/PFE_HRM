import { IEmployeeInformation, EmployeeInformationModel } from "../../models/civilStatus/EmployeeInformation.model";


export class EmployeeInformationService {

    static async generateRegistrationNumber(): Promise<string> {
      const prefix = 'PD-';
      const lastEntry = await EmployeeInformationModel
        .findOne({ registrationNumber: { $regex: `^${prefix}\\d+$` } })
        .sort({ registrationNumber: -1 })
        .lean();
    
      let nextNumber = 1;
      if (lastEntry?.registrationNumber) {
        const lastNumber = parseInt(lastEntry.registrationNumber.replace(prefix, ''), 10);
        nextNumber = lastNumber + 1;
      }
    
      const registrationNumber = `${prefix}${String(nextNumber).padStart(4, '0')}`;
      const exists = await EmployeeInformationModel.findOne({ registrationNumber });
      if (exists) {
        throw new Error('Generated registration number already exists');
      }
    
      return registrationNumber;
    }
    
    
  /**
   * Créer un employé
   */
  static async createEmployee(data: IEmployeeInformation) {
      const registrationNumber = await this.generateRegistrationNumber(); 

  const employee = await EmployeeInformationModel.create({
    ...data,
    registrationNumber, 
  });
    return employee;
  }

  /**
   * Récupérer tous les employés
   */
  static async getAllEmployees() {
    return await EmployeeInformationModel.find();
  }

  /**
   * Récupérer un employé par ID
   */
  static async getEmployeeById(id: string) {
    return await EmployeeInformationModel.findById(id);
  }

  /**
   * Mettre à jour un employé
   */
  static async updateEmployee(id: string, data: Partial<IEmployeeInformation>) {
    return await EmployeeInformationModel.findByIdAndUpdate(id, data, {
      new: true, // retourne l'objet mis à jour
      runValidators: true,
    });
  }

  /**
   * Supprimer un employé
   */
  static async deleteEmployee(id: string) {
    return await EmployeeInformationModel.findByIdAndDelete(id);
  }
}
