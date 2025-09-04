import { CountryReferenceModel } from '../../models/civilStatus/countryReference.model';

export class CountryReferenceService {
  static async validateCountryCodes(countryCodes: string[]) {
    const uniqueCountryCodes = [...new Set(countryCodes)];
    const countries = await CountryReferenceModel.find({ countryCode: { $in: uniqueCountryCodes } });
    if (countries.length !== uniqueCountryCodes.length) {
      throw new Error('Invalid country code');
    }
    return countries;
  }

  /**
   * Populates the CountryReference collection with predefined country data.
   * Skips insertion for countries that already exist based on countryCode.
   * @returns {Promise<{ insertedCount: number, skippedCount: number }>} Summary of inserted and skipped records.
   */
  static async populateCountries() {
    const countriesData = [
      { countryCode: 'TUN', countryName: 'Tunisia', continent: 'Africa' },
      { countryCode: 'FRA', countryName: 'France', continent: 'Europe' },
      { countryCode: 'GBR', countryName: 'United Kingdom', continent: 'Europe' },
      { countryCode: 'USA', countryName: 'United States', continent: 'North America' },
      { countryCode: 'CAN', countryName: 'Canada', continent: 'North America' },
      { countryCode: 'DEU', countryName: 'Germany', continent: 'Europe' },
      { countryCode: 'JPN', countryName: 'Japan', continent: 'Asia' },
      { countryCode: 'AUS', countryName: 'Australia', continent: 'Oceania' },
      { countryCode: 'BRA', countryName: 'Brazil', continent: 'South America' },
      { countryCode: 'CHN', countryName: 'China', continent: 'Asia' },
      { countryCode: 'RUS', countryName: 'Russia', continent: 'Europe' },
      { countryCode: 'IND', countryName: 'India', continent: 'Asia' },
      { countryCode: 'EGY', countryName: 'Egypt', continent: 'Africa' },
      { countryCode: 'ZAF', countryName: 'South Africa', continent: 'Africa' },
      { countryCode: 'ITA', countryName: 'Italy', continent: 'Europe' },
      { countryCode: 'AFG', countryName: 'Afghanistan', continent: 'Asia' },
      { countryCode: 'ALB', countryName: 'Albania', continent: 'Europe' },
      { countryCode: 'DZA', countryName: 'Algeria', continent: 'Africa' },
      { countryCode: 'AND', countryName: 'Andorra', continent: 'Europe' },
      { countryCode: 'ZWE', countryName: 'Zimbabwe', continent: 'Africa' },
    ];

    try {
      // Vérifier les countryCode existants pour éviter les doublons
      const existingCodes = await CountryReferenceModel.find({
        countryCode: { $in: countriesData.map((c) => c.countryCode) },
      }).distinct('countryCode');

      // Filtrer les données pour ne garder que celles qui n'existent pas encore
      const newCountries = countriesData.filter((country) => !existingCodes.includes(country.countryCode));

      if (newCountries.length === 0) {
        return { insertedCount: 0, skippedCount: countriesData.length };
      }

      // Insérer les nouveaux documents
      const result = await CountryReferenceModel.insertMany(newCountries, { ordered: false });

      return {
        insertedCount: result.length,
        skippedCount: countriesData.length - result.length,
      };
    } catch (error:any) {
      console.error('Error populating countries:', error.message);
      throw new Error(`Failed to populate countries: ${error.message}`);
    }
  }
}