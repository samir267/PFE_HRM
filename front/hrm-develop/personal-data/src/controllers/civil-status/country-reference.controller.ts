import { Request, Response } from 'express';
import { CountryReferenceService } from '../../service/civil-status/country-reference.service';
import logger from '../../configs/logger.config';

export class CountryReferenceController {
  /**
   * GET /country-references/validate
   * Valider une liste de codes de pays.
   */
  static async validateCountryCodes(req: Request, res: Response) {
    try {
      const countryCodes = req.body.countryCodes as string[];
      logger.info('Validation des codes de pays: %j', countryCodes);

      const result = await CountryReferenceService.validateCountryCodes(countryCodes);

      res.json({
        message: 'Country codes validated successfully',
        data: result,
      });
    } catch (error: any) {
      logger.error('Erreur lors de la validation des codes de pays:', error);
      res.status(400).json({ message: error.message });
    }
  }


static async populateCountries(req: Request, res: Response) {
    try {
      const result = await CountryReferenceService.populateCountries();
      return res.status(200).json({
        message: 'Collection populated successfully',
        insertedCount: result.insertedCount,
        skippedCount: result.skippedCount,
      });
    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
  }
}