import { NationalityModel } from '../../models/civilStatus/nationality.model';
import { CountryReferenceModel } from '../../models/civilStatus/countryReference.model';
import { nationalitySchema } from '../../validator/personalDataValidator';
import { DataHistoryService } from './data-history.service';

export class NationalityService {

 
 static async populateNationalities() {
    try {
      // Récupérer tous les pays de la collection CountryReference
      const countries = await CountryReferenceModel.find();

      if (!countries.length) {
        throw new Error('Aucun pays trouvé dans la collection CountryReference');
      }

      // Créer un document Nationality pour chaque pays
      for (const country of countries) {
        const existingNationality = await NationalityModel.findOne({ nationalityCountryCode: country._id });
        if (!existingNationality) {
          await NationalityModel.create({ nationalityCountryCode: country._id });
          console.log(`Nationalité créée pour ${country.countryName} (${country.countryCode})`);
        } else {
          console.log(`Nationalité pour ${country.countryName} (${country.countryCode}) existe déjà`);
        }
      }

      return { message: 'Collection Nationality remplie avec succès', count: countries.length };
    } catch (error) {
      throw new Error(`Erreur lors du remplissage de Nationality: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
  // Create Nationalities
  // static async createNationalities(nationalities: any[], personalIdentityId: string, modifiedBy: string) {
  //   for (const nat of nationalities) {
  //     const validation = nationalitySchema.validate(nat, { abortEarly: false });
  //     if (validation.error) {
  //       const errors = validation.error.details.map((detail) => detail.message);
  //       throw new Error(`Validation failed for nationality: ${errors.join(', ')}`);
  //     }

  //     const country = await CountryReferenceModel.findOne({ countryCode: nat.nationalityCountryCode });
  //     if (!country) {
  //       throw new Error(`Invalid nationalityCountryCode: ${nat.nationalityCountryCode}`);
  //     }
  //   }

  //   const nationalityData = nationalities.map((nat: any) => ({
  //     ...nat,
  //     personalIdentityId,
  //   }));
  //   const createdNationalities = await NationalityModel.insertMany(nationalityData);

  //   for (const nat of createdNationalities) {
  //     await DataHistoryService.logHistory({
  //       entityId: nat._id.toString(),
  //       entityType: 'Nationality',
  //       previousState: {},
  //       currentState: nat.toObject(),
  //       modifiedBy,
  //       modificationType: 'CREATE',
  //     });
  //   }

  //   return createdNationalities;
  // }

  // // Update Nationalities
  // static async updateNationalities(personalIdentityId: string, nationalities: any[], modifiedBy: string) {
  //   const existingNationalities = await NationalityModel.find({ personalIdentityId });
  //   const incomingIds = nationalities.filter(n => n._id).map(n => n._id.toString());
  //   const updatedNationalities = [];

  //   // Delete nationalities not in the incoming list
  //   for (const existing of existingNationalities) {
  //     if (!incomingIds.includes(existing._id.toString())) {
  //       await NationalityModel.deleteOne({ _id: existing._id });
  //     }
  //   }

  //   for (const nat of nationalities) {
  //     const validation = nationalitySchema.validate(nat, { abortEarly: false });
  //     if (validation.error) {
  //       throw new Error(`Validation failed for nationality: ${validation.error.details.map(d => d.message).join(', ')}`);
  //     }

  //     const country = await CountryReferenceModel.findOne({ countryCode: nat.nationalityCountryCode });
  //     if (!country) {
  //       throw new Error(`Invalid nationalityCountryCode: ${nat.nationalityCountryCode}`);
  //     }

  //     if (nat._id) {
  //       const existing = await NationalityModel.findById(nat._id);
  //       if (!existing) {
  //         throw new Error(`Nationality with ID ${nat._id} not found`);
  //       }

  //       const previousState = existing.toObject();
  //       existing.set({
  //         nationalityCountryCode: nat.nationalityCountryCode,
  //         isResident: nat.isResident,
  //         updatedAt: new Date(),
  //       });
  //       const updated = await existing.save();

  //       await DataHistoryService.logHistory({
  //         entityId: updated._id.toString(),
  //         entityType: 'Nationality',
  //         previousState,
  //         currentState: updated.toObject(),
  //         modifiedBy,
  //         modificationType: 'PARTIAL_UPDATE',
  //       });

  //       updatedNationalities.push(updated);
  //     } else {
  //       const newNat = await NationalityModel.create({
  //         nationalityCountryCode: nat.nationalityCountryCode,
  //         isResident: nat.isResident,
  //         personalIdentityId,
  //       });

  //       await DataHistoryService.logHistory({
  //         entityId: newNat._id.toString(),
  //         entityType: 'Nationality',
  //         previousState: {},
  //         currentState: newNat.toObject(),
  //         modifiedBy,
  //         modificationType: 'CREATE',
  //       });

  //       updatedNationalities.push(newNat);
  //     }
  //   }

  //   return updatedNationalities;
  // }

  // // Read Nationalities
  // static async readNationalities(personalIdentityId: string) {
  //   const nationalities = await NationalityModel.find({ personalIdentityId });
  //   return nationalities;
  // }
}