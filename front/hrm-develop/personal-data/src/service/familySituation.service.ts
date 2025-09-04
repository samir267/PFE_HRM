import Joi from 'joi';
import { maritalStatusSchema, dependantSchema, emergencyContactSchema } from '../validator/family-situation.validator';
import { MaritalStatusModel } from '../models/familySituation/marital-status.model';
import { DependantModel } from '../models/familySituation/dependant.model';
// import { EmergencyContactModel } from '../models/familySituation/emergency-contact.model';
import { PersonalIdentityModel } from '../models/civilStatus/personalIdentity.model';
import { DataHistoryModel } from '../models/civilStatus/dataHistory.model';
import { IMaritalStatus } from '../types/familySituation/IMaritalStatus.type';
import { IDependant } from '../types/familySituation/IDependant.type';
// import { IEmergencyContact } from '../types/familySituation/IEmergencyContact.type';
import mongoose from 'mongoose';

export class FamilySituationService {
  /**
   * Ajoute un contact d'urgence pour une identité personnelle donnée.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @param data - Données du contact d'urgence.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns Le contact d'urgence créé.
   */
  // static async addEmergencyContact(personalIdentityId: string, data: Partial<IEmergencyContact>, modifiedBy: string): Promise<IEmergencyContact> {
  //   // Valider les données d'entrée avec Joi
  //   const validation = emergencyContactSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
  //   if (validation.error) {
  //     const errors = validation.error.details.map((detail) => detail.message);
  //     throw new Error(`Validation failed for emergencyContact: ${errors.join(', ')}`);
  //   }

  //   // Vérifier l'existence de l'employé
  //   const personalIdentity = await PersonalIdentityModel.findOne({
  //     _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
  //   });
  //   if (!personalIdentity) {
  //     console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
  //     throw new Error('Employee not found');
  //   }

    // Si isPrimaryContact est true, désactiver les autres contacts primaires
    // if (data.isPrimaryContact) {
    //   const previousPrimaryContacts = await EmergencyContactModel.find({
    //     personalIdentityId: personalIdentity._id,
    //     isPrimaryContact: true,
    //   });

      // Mettre à jour tous les contacts primaires en une seule requête
      // await EmergencyContactModel.updateMany(
      //   { personalIdentityId: personalIdentity._id, isPrimaryContact: true },
      //   { $set: { isPrimaryContact: false } }
      // );

      // Historiser chaque contact mis à jour
    //   for (const contact of previousPrimaryContacts) {
    //     await DataHistoryModel.create({
    //       entityId: contact._id.toString(),
    //       entityType: 'EmergencyContact',
    //       previousState: { ...contact.toObject(), isPrimaryContact: true },
    //       currentState: { ...contact.toObject(), isPrimaryContact: false },
    //       modifiedBy,
    //       modificationType: 'UPDATE',
    //     });
    //   }
    // }

    // Créer le contact d'urgence
  //   const emergencyContact = await EmergencyContactModel.create({
  //     personalIdentityId: personalIdentity._id,
  //     lastName: data.lastName,
  //     firstName: data.firstName,
  //     relationship: data.relationship,
  //     phoneNumber: data.phoneNumber,
  //     alternativePhone: data.alternativePhone,
  //     email: data.email,
  //     isPrimaryContact: data.isPrimaryContact,
  //   });

  //   // Historiser la création
  //   await DataHistoryModel.create({
  //     entityId: emergencyContact._id.toString(),
  //     entityType: 'EmergencyContact',
  //     previousState: {},
  //     currentState: emergencyContact.toObject(),
  //     modifiedBy,
  //     modificationType: 'CREATE',
  //   });

  //   return emergencyContact;
  // }

  /**
   * Récupère un contact d'urgence par son identifiant.
   * @param emergencyContactId - Identifiant du contact d'urgence.
   * @returns Le contact d'urgence trouvé.
   */
  // static async getEmergencyContact(emergencyContactId: string): Promise<IEmergencyContact> {
  //   const emergencyContact = await EmergencyContactModel.findOne({
  //     _id: new mongoose.Types.ObjectId(emergencyContactId),
  //   });
  //   if (!emergencyContact) {
  //     throw new Error('Emergency contact not found');
  //   }
  //   return emergencyContact;
  // }

  // /**
  //  * Récupère tous les contacts d'urgence pour une identité personnelle.
  //  * @param personalIdentityId - Identifiant de l'identité personnelle.
  //  * @returns Liste des contacts d'urgence.
  //  */
  // static async getEmergencyContactsByPersonalIdentity(personalIdentityId: string): Promise<IEmergencyContact[]> {
  //   const personalIdentity = await PersonalIdentityModel.findOne({
  //     _id: new mongoose.Types.ObjectId(personalIdentityId),
  //   });
  //   if (!personalIdentity) {
  //     throw new Error('Employee not found');
  //   }
  //   return EmergencyContactModel.find({ personalIdentityId: personalIdentity._id });
  // }

  /**
   * Met à jour un contact d'urgence existant.
   * @param emergencyContactId - Identifiant du contact d'urgence.
   * @param data - Données à mettre à jour.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns Le contact d'urgence mis à jour.
   */
  // static async updateEmergencyContact(emergencyContactId: string, data: Partial<IEmergencyContact>, modifiedBy: string): Promise<IEmergencyContact> {
  //   // Valider les données
  //   const validation = emergencyContactSchema.validate(data, { abortEarly: false });
  //   if (validation.error) {
  //     const errors = validation.error.details.map((detail) => detail.message);
  //     throw new Error(`Validation failed for emergencyContact: ${errors.join(', ')}`);
  //   }

  //   // Vérifier l'existence du contact
  //   const emergencyContact = await EmergencyContactModel.findOne({
  //     _id: new mongoose.Types.ObjectId(emergencyContactId),
  //   });
  //   if (!emergencyContact) {
  //     throw new Error('Emergency contact not found');
  //   }

  //   // Vérifier l'existence de l'employé
  //   const personalIdentity = await PersonalIdentityModel.findOne({
  //     _id: emergencyContact.personalIdentityId,
  //   });
  //   if (!personalIdentity) {
  //     throw new Error('Employee not found');
  //   }

  //   // Si isPrimaryContact est true, désactiver les autres contacts primaires
  //   if (data.isPrimaryContact) {
  //     const previousPrimaryContacts = await EmergencyContactModel.find({
  //       personalIdentityId: personalIdentity._id,
  //       isPrimaryContact: true,
  //       _id: { $ne: emergencyContact._id },
  //     });

  //     await EmergencyContactModel.updateMany(
  //       { personalIdentityId: personalIdentity._id, isPrimaryContact: true, _id: { $ne: emergencyContact._id } },
  //       { $set: { isPrimaryContact: false } }
  //     );

  //     for (const contact of previousPrimaryContacts) {
  //       await DataHistoryModel.create({
  //         entityId: contact._id.toString(),
  //         entityType: 'EmergencyContact',
  //         previousState: { ...contact.toObject(), isPrimaryContact: true },
  //         currentState: { ...contact.toObject(), isPrimaryContact: false },
  //         modifiedBy,
  //         modificationType: 'UPDATE',
  //       });
  //     }
  //   }

    // Sauvegarder l'état précédent pour l'historisation
    // const previousState = emergencyContact.toObject();

    // Mettre à jour les champs
  //   Object.assign(emergencyContact, {
  //     lastName: data.lastName ?? emergencyContact.lastName,
  //     firstName: data.firstName ?? emergencyContact.firstName,
  //     relationship: data.relationship ?? emergencyContact.relationship,
  //     phoneNumber: data.phoneNumber ?? emergencyContact.phoneNumber,
  //     alternativePhone: data.alternativePhone ?? emergencyContact.alternativePhone,
  //     email: data.email ?? emergencyContact.email,
  //     isPrimaryContact: data.isPrimaryContact ?? emergencyContact.isPrimaryContact,
  //   });

  //   await emergencyContact.save();

  //   // Historiser la mise à jour
  //   await DataHistoryModel.create({
  //     entityId: emergencyContact._id.toString(),
  //     entityType: 'EmergencyContact',
  //     previousState,
  //     currentState: emergencyContact.toObject(),
  //     modifiedBy,
  //     modificationType: 'UPDATE',
  //   });

  //   return emergencyContact;
  // }

  /**
   * Supprime un contact d'urgence.
   * @param emergencyContactId - Identifiant du contact d'urgence.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   */
  // static async deleteEmergencyContact(emergencyContactId: string, modifiedBy: string): Promise<void> {
  //   const emergencyContact = await EmergencyContactModel.findOne({
  //     _id: new mongoose.Types.ObjectId(emergencyContactId),
  //   });
  //   if (!emergencyContact) {
  //     throw new Error('Emergency contact not found');
  //   }

  //   // Historiser la suppression
  //   await DataHistoryModel.create({
  //     entityId: emergencyContact._id.toString(),
  //     entityType: 'EmergencyContact',
  //     previousState: emergencyContact.toObject(),
  //     currentState: {},
  //     modifiedBy,
  //     modificationType: 'DELETE',
  //   });

  //   await emergencyContact.deleteOne();
  // }

  /**
   * Enregistre un statut matrimonial pour une identité personnelle donnée.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @param data - Données du statut matrimonial.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns Le statut matrimonial créé.
   */
  static async registerMaritalStatus(personalIdentityId: string, data: Partial<IMaritalStatus>, modifiedBy: string): Promise<IMaritalStatus> {
    // Valider les données
    const validation = maritalStatusSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for maritalStatus: ${errors.join(', ')}`);
    }

    // Vérifier l'existence de l'employé
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
    });
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    // Vérifier qu'il n'y a qu'un seul statut actif
    const previousStatus = await MaritalStatusModel.findOne({
      personalIdentityId: personalIdentity._id,
      endDate: null,
    });
    if (previousStatus && data.effectiveDate) {
      previousStatus.endDate = new Date(data.effectiveDate);
      await previousStatus.save();

      // Historiser la mise à jour
      await DataHistoryModel.create({
        entityId: previousStatus._id.toString(),
        entityType: 'MaritalStatus',
        previousState: { ...previousStatus.toObject(), endDate: null },
        currentState: previousStatus.toObject(),
        modifiedBy,
        modificationType: 'UPDATE',
      });
    }

    // Créer le nouveau statut matrimonial
    const maritalStatus = await MaritalStatusModel.create({
      personalIdentityId: personalIdentity._id,
      statusType: data.statusType,
      effectiveDate: new Date(data.effectiveDate!),
      documentReference: data.documentReference,
    });

    // Historiser la création
    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState: {},
      currentState: maritalStatus.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });

    return maritalStatus;
  }

  /**
   * Récupère un statut matrimonial par son identifiant.
   * @param maritalStatusId - Identifiant du statut matrimonial.
   * @returns Le statut matrimonial trouvé.
   */
  static async getMaritalStatus(maritalStatusId: string): Promise<IMaritalStatus> {
    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }
    return maritalStatus;
  }

  /**
   * Récupère tous les statuts matrimoniaux pour une identité personnelle.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @returns Liste des statuts matrimoniaux.
   */
  static async getMaritalStatusesByPersonalIdentity(personalIdentityId: string): Promise<IMaritalStatus[]> {
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }
    return MaritalStatusModel.find({ personalIdentityId: personalIdentity._id });
  }

  /**
   * Met à jour un statut matrimonial existant.
   * @param maritalStatusId - Identifiant du statut matrimonial.
   * @param data - Données à mettre à jour.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns Le statut matrimonial mis à jour.
   */
  static async updateMaritalStatus(maritalStatusId: string, data: Partial<IMaritalStatus>, modifiedBy: string): Promise<IMaritalStatus> {
    // Valider les données
    const validation = maritalStatusSchema.validate(data, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for maritalStatus: ${errors.join(', ')}`);
    }

    // Vérifier l'existence du statut
    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }

    // Vérifier l'existence de l'employé
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: maritalStatus.personalIdentityId,
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }

    // Sauvegarder l'état précédent
    const previousState = maritalStatus.toObject();

    // Mettre à jour les champs
    Object.assign(maritalStatus, {
      statusType: data.statusType ?? maritalStatus.statusType,
      effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : maritalStatus.effectiveDate,
      documentReference: data.documentReference ?? maritalStatus.documentReference,
      endDate: data.endDate ? new Date(data.endDate) : maritalStatus.endDate,
    });

    await maritalStatus.save();

    // Historiser la mise à jour
    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState,
      currentState: maritalStatus.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    return maritalStatus;
  }

  /**
   * Supprime un statut matrimonial.
   * @param maritalStatusId - Identifiant du statut matrimonial.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   */
  static async deleteMaritalStatus(maritalStatusId: string, modifiedBy: string): Promise<void> {
    const maritalStatus = await MaritalStatusModel.findOne({
      _id: new mongoose.Types.ObjectId(maritalStatusId),
    });
    if (!maritalStatus) {
      throw new Error('Marital status not found');
    }

    // Historiser la suppression
    await DataHistoryModel.create({
      entityId: maritalStatus._id.toString(),
      entityType: 'MaritalStatus',
      previousState: maritalStatus.toObject(),
      currentState: {},
      modifiedBy,
      modificationType: 'DELETE',
    });

    await maritalStatus.deleteOne();
  }

  /**
   * Ajoute une personne à charge pour une identité personnelle donnée.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @param data - Données de la personne à charge.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns La personne à charge créée.
   */
  static async addDependant(personalIdentityId: string, data: Partial<IDependant>, modifiedBy: string): Promise<IDependant> {
    // Valider les données
    const validation = dependantSchema.validate({ personalIdentityId, ...data }, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for dependant: ${errors.join(', ')}`);
    }

    // Vérifier l'existence de l'employé
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(validation.value.personalIdentityId),
    });
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    // Vérifier la cohérence de dateOfBirth selon relationshipType
    const dateOfBirth = new Date(data.dateOfBirth!);
    // if (data.relationshipType === 'CHILD') {
    //   const age = (new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    //   if (age < 0 || age > 25) {
    //     throw new Error('Child must be between 0 and 25 years old');
    //   }
    // }

const date_marital_status = await MaritalStatusModel.findOne({
  personalIdentityId: personalIdentity._id,
});
if (date_marital_status) {
  const effectiveDate = new Date(date_marital_status.effectiveDate);
  const diffInMs = dateOfBirth.getTime() - effectiveDate.getTime();
  const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30.42); // Approximation d'un mois (30.42 jours)

  // Vérification pour 7 mois
  if (diffInMonths < 7) {
    throw new Error('Child date of birth must be more than 7 months after effective date');
  }
  // Alternative pour 9 mois (décommentez si nécessaire)
  // if (diffInMonths <= 9) {
  //   throw new Error('Child date of birth must be more than 9 months after effective date');
  // }
}

if (data.relationshipType === 'CHILD') {
  const age = (new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age < 0 || age > 25) {
    throw new Error('Child must be between 0 and 25 years old');
  }
}

    // Créer la personne à charge
    const dependant = await DependantModel.create({
      personalIdentityId: personalIdentity._id,
      relationshipType: data.relationshipType,
      lastName: data.lastName,
      firstName: data.firstName,
      dateOfBirth,
      isFiscallyDependent: data.isFiscallyDependent,
      isPrimaryBeneficiary: data.isPrimaryBeneficiary,
      startDate: new Date(data.startDate!),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });

    // Historiser la création
    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState: {},
      currentState: dependant.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });

    return dependant;
  }

  /**
   * Récupère une personne à charge par son identifiant.
   * @param dependantId - Identifiant de la personne à charge.
   * @returns La personne à charge trouvée.
   */
  static async getDependant(dependantId: string): Promise<IDependant> {
    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }
    return dependant;
  }

  /**
   * Récupère toutes les personnes à charge pour une identité personnelle.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @returns Liste des personnes à charge.
   */
  static async getDependantsByPersonalIdentity(personalIdentityId: string): Promise<IDependant[]> {
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }
    return DependantModel.find({ personalIdentityId: personalIdentity._id });
  }

  /**
   * Met à jour une personne à charge existante.
   * @param dependantId - Identifiant de la personne à charge.
   * @param data - Données à mettre à jour.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   * @returns La personne à charge mise à jour.
   */
  static async updateDependant(dependantId: string, data: Partial<IDependant>, modifiedBy: string): Promise<IDependant> {
    // Valider les données
    const validation = dependantSchema.validate(data, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for dependant: ${errors.join(', ')}`);
    }

    // Vérifier l'existence de la personne à charge
    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }

    // Vérifier l'existence de l'employé
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: dependant.personalIdentityId,
    });
    if (!personalIdentity) {
      throw new Error('Employee not found');
    }

    // Vérifier la cohérence de dateOfBirth si modifié
    if (data.dateOfBirth && data.relationshipType === 'CHILD') {
      const dateOfBirth = new Date(data.dateOfBirth);
      const age = (new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 0 || age > 25) {
        throw new Error('Child must be between 0 and 25 years old');
      }
    }

    // Sauvegarder l'état précédent
    const previousState = dependant.toObject();

    // Mettre à jour les champs
    Object.assign(dependant, {
      relationshipType: data.relationshipType ?? dependant.relationshipType,
      lastName: data.lastName ?? dependant.lastName,
      firstName: data.firstName ?? dependant.firstName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : dependant.dateOfBirth,
      isFiscallyDependent: data.isFiscallyDependent ?? dependant.isFiscallyDependent,
      isPrimaryBeneficiary: data.isPrimaryBeneficiary ?? dependant.isPrimaryBeneficiary,
      startDate: data.startDate ? new Date(data.startDate) : dependant.startDate,
      endDate: data.endDate ? new Date(data.endDate) : dependant.endDate,
    });

    await dependant.save();

    // Historiser la mise à jour
    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState,
      currentState: dependant.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    return dependant;
  }

  /**
   * Supprime une personne à charge.
   * @param dependantId - Identifiant de la personne à charge.
   * @param modifiedBy - Identifiant de l'utilisateur effectuant la modification.
   */
  static async deleteDependant(dependantId: string, modifiedBy: string): Promise<void> {
    const dependant = await DependantModel.findOne({
      _id: new mongoose.Types.ObjectId(dependantId),
    });
    if (!dependant) {
      throw new Error('Dependant not found');
    }

    // Historiser la suppression
    await DataHistoryModel.create({
      entityId: dependant._id.toString(),
      entityType: 'Dependant',
      previousState: dependant.toObject(),
      currentState: {},
      modifiedBy,
      modificationType: 'DELETE',
    });

    await dependant.deleteOne();
  }

  /**
   * Valide la situation familiale d'une identité personnelle.
   * @param personalIdentityId - Identifiant de l'identité personnelle.
   * @returns Résultat de la validation avec conformité, problèmes détectés, et données associées.
   */
  static async validateFamilySituation(personalIdentityId: string): Promise<{
    isCompliant: boolean;
    issues: string[];
    maritalStatuses: any[];
    dependants: any[];
    // emergencyContacts: any[];
  }> {
    console.log('Attempting to find PersonalIdentity with _id:', personalIdentityId);
    const personalIdentity = await PersonalIdentityModel.findOne({
      _id: new mongoose.Types.ObjectId(personalIdentityId),
    });
    console.log('PersonalIdentity found:', personalIdentity ? personalIdentity : 'None');
    if (!personalIdentity) {
      console.error(`No PersonalIdentity found for _id: ${personalIdentityId}`);
      throw new Error('Employee not found');
    }

    const issues: string[] = [];

    // Vérifier les statuts matrimoniaux
    console.log('Fetching MaritalStatuses for personalIdentityId:', personalIdentity._id);
    const maritalStatuses = await MaritalStatusModel.find({ personalIdentityId: personalIdentity._id });
    console.log('MaritalStatuses found:', maritalStatuses.length, 'documents');
    if (maritalStatuses.length > 0) {
      console.log('MaritalStatuses details:', maritalStatuses);
    } else {
      console.log('No MaritalStatuses found for this personalIdentityId');
    }
    const activeMaritalStatuses = maritalStatuses.filter(s => !s.endDate || s.endDate > new Date());
    if (activeMaritalStatuses.length > 1) {
      issues.push('Multiple active marital statuses detected');
    }

    // Vérifier les personnes à charge
    console.log('Fetching Dependants for personalIdentityId:', personalIdentity._id);
    const dependants = await DependantModel.find({ personalIdentityId: personalIdentity._id });
    console.log('Dependants found:', dependants.length, 'documents');
    if (dependants.length > 0) {
      console.log('Dependants details:', dependants);
    } else {
      console.log('No Dependants found for this personalIdentityId');
    }
    dependants.forEach(d => {
      if (d.dateOfBirth > new Date()) {
        issues.push(`Invalid date of birth for dependant ${d.firstName} ${d.lastName}`);
      }
      if (d.endDate && d.endDate < d.startDate) {
        issues.push(`Invalid endDate for dependant ${d.firstName} ${d.lastName}`);
      }
    });

    // Vérifier les contacts d'urgence
    console.log('Fetching EmergencyContacts for personalIdentityId:', personalIdentity._id);
    // const emergencyContacts = await EmergencyContactModel.find({ personalIdentityId: personalIdentity._id });
    // console.log('EmergencyContacts found:', emergencyContacts.length, 'documents');
    // if (emergencyContacts.length > 0) {
    //   console.log('EmergencyContacts details:', emergencyContacts.map(c => ({
    //     _id: c._id,
    //     isPrimaryContact: c.isPrimaryContact,
    //   })));
    // } else {
    //   console.log('No EmergencyContacts found for this personalIdentityId');
    // }
    // if (!emergencyContacts.some(c => c.isPrimaryContact)) {
    //   issues.push('No primary emergency contact defined');
    // }

    console.log('Validation result:', {
      isCompliant: issues.length === 0,
      issues,
      maritalStatuses,
      dependants,
      // emergencyContacts,
    });

    return {
      isCompliant: issues.length === 0,
      issues,
      maritalStatuses,
      dependants,
      // emergencyContacts,
    };
  }
}