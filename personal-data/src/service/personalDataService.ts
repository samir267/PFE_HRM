import { PersonalIdentityModel } from '../models/civilStatus/personalIdentity.model';
import { NationalityModel } from '../models/civilStatus/nationality.model';
import { BirthInformationModel } from '../models/civilStatus/birthInformation.model';
import { CountryReferenceModel } from '../models/civilStatus/countryReference.model';
import { DataHistoryModel } from '../models/civilStatus/dataHistory.model';
import { personalIdentitySchema, birthInformationSchema, nationalitySchema, partialPersonalIdentitySchema } from '../validator/personalDataValidator';
import mongoose from 'mongoose';

export class PersonalDataService {
  // Create: POST /employees
//   static async createEmployee(data: any, modifiedBy: string) {
//     const { personalIdentity, birthInformation, nationalities } = data;
  
//     // Validate input data
//     const personalIdentityValidation = personalIdentitySchema.validate(personalIdentity, { abortEarly: false });
//     if (personalIdentityValidation.error) {
//       const errors = personalIdentityValidation.error.details.map((detail) => detail.message);
//       throw new Error(`Validation failed for personalIdentity: ${errors.join(', ')}`);
//     }
  
//     const birthInformationValidation = birthInformationSchema.validate(birthInformation, { abortEarly: false });
//     if (birthInformationValidation.error) {
//       const errors = birthInformationValidation.error.details.map((detail) => detail.message);
//       throw new Error(`Validation failed for birthInformation: ${errors.join(', ')}`);
//     }
  
//     for (const nat of nationalities) {
//       const nationalityValidation = nationalitySchema.validate(nat, { abortEarly: false });
//       if (nationalityValidation.error) {
//         const errors = nationalityValidation.error.details.map((detail) => detail.message);
//         throw new Error(`Validation failed for nationality: ${errors.join(', ')}`);
//       }
//     }
  
//     // Verify country codes exist
//     const countryCodes = [
//       birthInformation.countryOfBirthCode,
//       ...nationalities.map((n: any) => n.nationalityCountryCode),
//     ];
//     const uniqueCountryCodes = [...new Set(countryCodes)];
//     const countries = await CountryReferenceModel.find({ countryCode: { $in: uniqueCountryCodes } });
//     if (countries.length !== uniqueCountryCodes.length) {
//       throw new Error('Invalid country code');
//     }



//     // Générer un registrationNumber unique par exemple : EMP-2025-XXXX
// const generateRegistrationNumber = async () => {
//   const prefix = "PD-";

//   // Récupérer le dernier enregistrement avec le registrationNumber le plus grand
//   const lastEntry = await PersonalIdentityModel
//     .findOne({ registrationNumber: { $regex: `^${prefix}\\d{4}$` } })
//     .sort({ registrationNumber: -1 })
//     .lean();

//   let nextNumber = 1;

//   if (lastEntry && lastEntry.registrationNumber) {
//     const lastNumber = parseInt(lastEntry.registrationNumber.replace(prefix, ''), 10);
//     nextNumber = lastNumber + 1;
//   }

//   // Formater avec 4 chiffres, en ajoutant des zéros devant
//   const formattedNumber = String(nextNumber).padStart(4, '0');
//   return `${prefix}${formattedNumber}`;
// };

// personalIdentity.registrationNumber = await generateRegistrationNumber();

  
//     // Create employee
//     const identity = await PersonalIdentityModel.create(personalIdentity);
//     const birthInfo = await BirthInformationModel.create({
//       ...birthInformation,
//       personalIdentityId: identity._id, // Use ObjectId directly
//     });
  
//     const nationalityData = nationalities.map((nat: any) => ({
//       ...nat,
//       personalIdentityId: identity._id, // Use ObjectId directly
//     }));
//     const createdNationalities = await NationalityModel.insertMany(nationalityData);
  
//     // Log history
//     await DataHistoryModel.create({
//       entityId: identity._id.toString(),
//       entityType: 'PersonalIdentity',
//       previousState: {},
//       currentState: identity.toObject(),
//       modifiedBy,
//       modificationType: 'CREATE',
//     });
  
//     await DataHistoryModel.create({
//       entityId: birthInfo._id.toString(),
//       entityType: 'BirthInformation',
//       previousState: {},
//       currentState: birthInfo.toObject(),
//       modifiedBy,
//       modificationType: 'CREATE',
//     });
  
//     for (const nat of createdNationalities) {
//       await DataHistoryModel.create({
//         entityId: nat._id.toString(),
//         entityType: 'Nationality',
//         previousState: {},
//         currentState: nat.toObject(),
//         modifiedBy,
//         modificationType: 'CREATE',
//       });
//     }
  
//     return { identity, birthInfo, nationalities: createdNationalities };
//   }

static async  createEmployee(data: any, modifiedBy: string) {
  const { personalIdentity, birthInformation, nationalities } = data;

  // Validate input data
  const personalIdentityValidation = personalIdentitySchema.validate(personalIdentity, { abortEarly: false });
  if (personalIdentityValidation.error) {
    const errors = personalIdentityValidation.error.details.map((detail) => detail.message);
    throw new Error(`Validation failed for personalIdentity: ${errors.join(', ')}`);
  }

  const birthInformationValidation = birthInformationSchema.validate(birthInformation, { abortEarly: false });
  if (birthInformationValidation.error) {
    const errors = birthInformationValidation.error.details.map((detail) => detail.message);
    throw new Error(`Validation failed for birthInformation: ${errors.join(', ')}`);
  }

  for (const nat of nationalities) {
    const nationalityValidation = nationalitySchema.validate(nat, { abortEarly: false });
    if (nationalityValidation.error) {
      const errors = nationalityValidation.error.details.map((detail) => detail.message);
      throw new Error(`Validation failed for nationality: ${errors.join(', ')}`);
    }
  }

  // Liste des pays et capitales (extrait partiel, à compléter avec les 249 pays)
  const cityToCountryMap: Record<string, string> = {
    tunis: 'TUN',
    paris: 'FRA',
    london: 'GBR',
    washington: 'USA', // Accepte "washington" pour simplifier
    ottawa: 'CAN',
    berlin: 'DEU',
    tokyo: 'JPN',
    canberra: 'AUS',
    brasilia: 'BRA',
    beijing: 'CHN',
    moscow: 'RUS',
    newdelhi: 'IND',
    cairo: 'EGY',
    pretoria: 'ZAF',
    rome: 'ITA',
    kaboul: 'AFG',
    tirana: 'ALB',
    alger: 'DZA',
    andorrelavieille: 'AND',
    harare: 'ZWE',
    // Compléter avec les 249 pays et leurs capitales
  };

  // Liste des codes de pays ISO 3166-1 alpha-3 valides (extrait partiel)
  const validCountryCodes = [
    'TUN', 'FRA', 'GBR', 'USA', 'CAN', 'DEU', 'JPN', 'AUS', 'BRA', 'CHN',
    'RUS', 'IND', 'EGY', 'ZAF', 'ITA', 'AFG', 'ALB', 'DZA', 'AND', 'ZWE',
    // Compléter avec tous les codes ISO 3166-1 alpha-3 (249 codes)
  ];

  // Verify country codes exist
  const countryCodes = [
    birthInformation.countryOfBirthCode,
    ...nationalities.map((n: { nationalityCountryCode: any; }) => n.nationalityCountryCode),
  ];
  const uniqueCountryCodes = [...new Set(countryCodes)];
  const countries = await CountryReferenceModel.find({ countryCode: { $in: uniqueCountryCodes } });
  if (countries.length !== uniqueCountryCodes.length) {
    throw new Error('Invalid country code');
  }

  // Validation de la cohérence géographique
  const { placeOfBirth, countryOfBirthCode } = birthInformation;
  const primaryNationality = nationalities.find((n: { isPrimary: boolean; }) => n.isPrimary === true);

  // Vérifier que countryOfBirthCode est un code de pays valide
  if (!validCountryCodes.includes(countryOfBirthCode)) {
    throw new Error(`Invalid countryOfBirthCode: ${countryOfBirthCode}`);
  }

  // Vérifier la cohérence entre placeOfBirth et countryOfBirthCode
  const normalizedPlaceOfBirth = placeOfBirth.toLowerCase().replace(/\s+/g, '');
  const expectedCountryCode = cityToCountryMap[normalizedPlaceOfBirth];

  if (expectedCountryCode && expectedCountryCode !== countryOfBirthCode) {
    throw new Error(
      `Inconsistent data: ${placeOfBirth} is in ${expectedCountryCode}, but countryOfBirthCode is ${countryOfBirthCode}`
    );
  } else if (!expectedCountryCode) {
    throw new Error(`Unknown placeOfBirth: ${placeOfBirth}`);
  }

  // Vérifier qu'il existe une nationalité primaire
  if (!primaryNationality) {
    throw new Error('No primary nationality specified');
  }

  // Vérifier que nationalityCountryCode est valide
  if (!validCountryCodes.includes(primaryNationality.nationalityCountryCode)) {
    throw new Error(`Invalid nationalityCountryCode: ${primaryNationality.nationalityCountryCode}`);
  }

  // Vérifier que la nationalité primaire correspond au pays de naissance
  if (primaryNationality.nationalityCountryCode !== countryOfBirthCode) {
    throw new Error(
      `Primary nationality (${primaryNationality.nationalityCountryCode}) must match country of birth (${countryOfBirthCode})`
    );
  }

  // Générer un registrationNumber unique
  const generateRegistrationNumber = async () => {
    const prefix = "PD-";
    const lastEntry = await PersonalIdentityModel.findOne({
      registrationNumber: { $regex: `^${prefix}\\d{4}$` },
    })
      .sort({ registrationNumber: -1 })
      .lean();

    let nextNumber = 1;
    if (lastEntry && lastEntry.registrationNumber) {
      const lastNumber = parseInt(lastEntry.registrationNumber.replace(prefix, ''), 10);
      nextNumber = lastNumber + 1;
    }

    const formattedNumber = String(nextNumber).padStart(4, '0');
    return `${prefix}${formattedNumber}`;
  };

  personalIdentity.registrationNumber = await generateRegistrationNumber();

  // Create employee
  const identity = await PersonalIdentityModel.create(personalIdentity);
  const birthInfo = await BirthInformationModel.create({
    ...birthInformation,
    personalIdentityId: identity._id,
  });

  const nationalityData = nationalities.map((nat: any) => ({
    ...nat,
    personalIdentityId: identity._id,
  }));
  const createdNationalities = await NationalityModel.insertMany(nationalityData);

  // Log history
  await DataHistoryModel.create({
    entityId: identity._id.toString(),
    entityType: 'PersonalIdentity',
    previousState: {},
    currentState: identity.toObject(),
    modifiedBy,
    modificationType: 'CREATE',
  });

  await DataHistoryModel.create({
    entityId: birthInfo._id.toString(),
    entityType: 'BirthInformation',
    previousState: {},
    currentState: birthInfo.toObject(),
    modifiedBy,
    modificationType: 'CREATE',
  });

  for (const nat of createdNationalities) {
    await DataHistoryModel.create({
      entityId: nat._id.toString(),
      entityType: 'Nationality',
      previousState: {},
      currentState: nat.toObject(),
      modifiedBy,
      modificationType: 'CREATE',
    });
  }

  return { identity, birthInfo, nationalities: createdNationalities };
}









  // Update: PATCH /personal-identity/:id
  static async updatePersonalIdentity(id: string, data: any, modifiedBy: string) {
    try {
      const { personalIdentity, birthInformation, nationalities } = data;
  
      // Validate and update PersonalIdentity if provided
      let updatedIdentity;
      if (personalIdentity) {
        const validation = partialPersonalIdentitySchema.validate(personalIdentity, { abortEarly: false });
        if (validation.error) {
          throw new Error(`Validation failed for personalIdentity: ${validation.error.details.map(d => d.message).join(', ')}`);
        }
  
        const previousState = await PersonalIdentityModel.findById(id);
        if (!previousState ) {
          throw new Error('PersonalIdentity not found or inactive');
        }
  
        updatedIdentity = await PersonalIdentityModel.findByIdAndUpdate(
          id,
          { $set: { ...personalIdentity, updatedAt: new Date() } },
          { new: true }
        );
  
        if (!updatedIdentity) {
          throw new Error('Failed to update PersonalIdentity');
        }
  
        await DataHistoryModel.create({
          entityId: id,
          entityType: 'PersonalIdentity',
          previousState: previousState.toObject(),
          currentState: updatedIdentity.toObject(),
          modifiedBy,
          modificationType: 'PARTIAL_UPDATE',
        });
      }
  
      // Validate and update BirthInformation if provided
      if (birthInformation) {
        const validation = birthInformationSchema.validate(birthInformation, { abortEarly: false });
        if (validation.error) {
          throw new Error(`Validation failed for birthInformation: ${validation.error.details.map(d => d.message).join(', ')}`);
        }
  
        // Verify country code
        const country = await CountryReferenceModel.findOne({ countryCode: birthInformation.countryOfBirthCode });
        if (!country) {
          throw new Error('Invalid countryOfBirthCode');
        }
  
        const previousState = await BirthInformationModel.findOne({ personalIdentityId: id});
        if (!previousState) {
          throw new Error('BirthInformation not found');
        }
  
        const updatedBirthInfo = await BirthInformationModel.findOneAndUpdate(
          { personalIdentityId: id },
          { $set: { ...birthInformation, updatedAt: new Date() } },
          { new: true }
        );
  
        if (!updatedBirthInfo) {
          throw new Error('Failed to update BirthInformation');
        }
  
        await DataHistoryModel.create({
          entityId: updatedBirthInfo._id.toString(),
          entityType: 'BirthInformation',
          previousState: previousState.toObject(),
          currentState: updatedBirthInfo.toObject(),
          modifiedBy,
          modificationType: 'PARTIAL_UPDATE',
        });
      }

      if (nationalities) {
        const existingNationalities = await NationalityModel.find({
          personalIdentityId: id,
        });
      
        const incomingIds = nationalities
          .filter((n: { _id: any; }) => n._id)
          .map((n: { _id: { toString: () => any; }; }) => n._id.toString());
      
        const updatedNationalities = [];
      
        // Supprimer les nationalités existantes non présentes dans la requête
        for (const existing of existingNationalities) {
          if (!incomingIds.includes(existing._id.toString())) {
            await NationalityModel.deleteOne({ _id: existing._id });
          }
        }
      
        for (const nat of nationalities) {
          const { error } = nationalitySchema.validate(nat, { abortEarly: false });
          if (error) {
            throw new Error(
              `Validation failed for nationality: ${error.details
                .map(d => d.message)
                .join(', ')}`
            );
          }
      
          const country = await CountryReferenceModel.findOne({
            countryCode: nat.nationalityCountryCode,
          });
      
          if (!country) {
            throw new Error(
              `Invalid nationalityCountryCode: ${nat.nationalityCountryCode}`
            );
          }
      
          if (nat._id) {
            const existing = await NationalityModel.findById(nat._id);
            if (!existing) {
              throw new Error(`Nationality with ID ${nat._id} not found`);
            }
      
            const previousState = existing.toObject();
            existing.set({
              nationalityCountryCode: nat.nationalityCountryCode,
              isResident: nat.isResident,
              updatedAt: new Date(),
            });
            const updated = await existing.save();
      
            await DataHistoryModel.create({
              entityId: updated._id.toString(),
              entityType: 'Nationality',
              previousState,
              currentState: updated.toObject(),
              modifiedBy,
              modificationType: 'PARTIAL_UPDATE',
            });
      
            updatedNationalities.push(updated);
          } else {
            const newNat = await NationalityModel.create({
              nationalityCountryCode: nat.nationalityCountryCode,
              isResident: nat.isResident,
              personalIdentityId: id,
            });
      
            await DataHistoryModel.create({
              entityId: newNat._id.toString(),
              entityType: 'Nationality',
              previousState: {},
              currentState: newNat.toObject(),
              modifiedBy,
              modificationType: 'CREATE',
            });
      
            updatedNationalities.push(newNat);
          }
        }
      
        personalIdentity.nationalities = updatedNationalities;
      }
      
  
      // Validate and update Nationalities if provided
      // if (nationalities) {
      //   for (const nat of nationalities) {
      //     const validation = nationalitySchema.validate(nat, { abortEarly: false });
      //     if (validation.error) {
      //       throw new Error(`Validation failed for nationality: ${validation.error.details.map(d => d.message).join(', ')}`);
      //     }
  
      //     // Verify country code
      //     const country = await CountryReferenceModel.findOne({ countryCode: nat.nationalityCountryCode });
      //     if (!country) {
      //       throw new Error(`Invalid nationalityCountryCode: ${nat.nationalityCountryCode}`);
      //     }
      //   }
  
      //   // Soft delete existing nationalities
      //   await NationalityModel.updateMany(
      //     { personalIdentityId: id, },
      //     { isActive: false, deletedAt: new Date() }
      //   );
  
      //   // Create new nationalities
      //   const nationalityData = nationalities.map((nat: any) => ({
      //     ...nat,
      //     personalIdentityId: id,
      //   }));
      //   const createdNationalities = await NationalityModel.insertMany(nationalityData);
  
      //   for (const nat of createdNationalities) {
      //     await DataHistoryModel.create({
      //       entityId: nat._id.toString(),
      //       entityType: 'Nationality',
      //       previousState: {},
      //       currentState: nat.toObject(),
      //       modifiedBy,
      //       modificationType: 'CREATE',
      //     });
      //   }
      // }
  
      // Return the updated PersonalIdentity (or fetch it if only other fields were updated)
      return updatedIdentity || (await PersonalIdentityModel.findById(id));
    } catch (error) {
      throw error;
    }
  }
  // // Read: GET /personal-identity/:id
 static async readPersonalIdentity(id: string) {
  const objectId = new mongoose.Types.ObjectId(id); // Convert string id to ObjectId

  // Trouver l'identité active
  const identity = await PersonalIdentityModel.findById(objectId).where('isActive').equals(true);
  if (!identity) {
    throw new Error('PersonalIdentity not found or inactive');
  }

  const birthInfo = await BirthInformationModel.findOne({ personalIdentityId: objectId });
  const nationalities = await NationalityModel.find({ personalIdentityId: objectId });

  // Extraire le numéro d'enregistrement directement
  const registrationNumber = identity.registrationNumber;

  return {
    registrationNumber,
    identity,
    birthInfo,
    nationalities
  };
}


  // Read All: GET /personal-identities
  static async readAllPersonalIdentities(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const identities = await PersonalIdentityModel.find({ isActive: true })
      .skip(skip)
      .limit(limit);

    const total = await PersonalIdentityModel.countDocuments({ isActive: true });

    return { identities, pagination: { page, limit, total } };
  }


  static async readAllPersonalIdentitiesDeleted(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const identities = await PersonalIdentityModel.find({ isActive: false })
      .skip(skip)
      .limit(limit);

    const total = await PersonalIdentityModel.countDocuments({ isActive: false });

    return { identities, pagination: { page, limit, total } };
  }



  // Delete: DELETE /personal-identity/:id (soft delete)
  static async deletePersonalIdentity(id: string, modifiedBy: string) {
    const identity = await PersonalIdentityModel.findById(id);
    if (!identity || !identity.isActive) {
      throw new Error('PersonalIdentity not found or inactive');
    }

    // Soft delete: set isActive to false and add deletedAt
    identity.isActive = false;
    identity.deletedAt = new Date();
    const updatedIdentity = await identity.save();

    // Soft delete related records
    // await BirthInformationModel.updateMany(
    //   { personalIdentityId: id, isActive: true },
    //   {  deletedAt: new Date() }
    // );
    // await NationalityModel.updateMany(
    //   { personalIdentityId: id, isActive: true },
    //   { deletedAt: new Date() }
    // );

    // Log history
    await DataHistoryModel.create({
      entityId: id,
      entityType: 'PersonalIdentity',
      previousState: identity.toObject(),
      currentState: updatedIdentity.toObject(),
      modifiedBy,
      modificationType: 'UPDATE',
    });

    return updatedIdentity;
  }
}