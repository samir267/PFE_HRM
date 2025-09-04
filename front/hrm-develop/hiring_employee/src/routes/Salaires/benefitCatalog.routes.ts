import { Router } from 'express';
import { BenefitCatalogController } from '../../controllers/Salaires/BenefitCatalog.controller';

const router = Router();

router.post('/BenefitCatalog', BenefitCatalogController.create);
router.get('/BenefitCatalog', BenefitCatalogController.findAll);
router.get('/BenefitCatalog/:id', BenefitCatalogController.findById);
router.put('/BenefitCatalog/:id', BenefitCatalogController.update);
router.delete('/BenefitCatalog/:id', BenefitCatalogController.delete);

export default router;
