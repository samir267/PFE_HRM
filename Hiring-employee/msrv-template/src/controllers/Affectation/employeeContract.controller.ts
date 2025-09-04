import { Request, Response } from 'express';
import { ContractService, ContractFilters, PaginationOptions } from '../../service/Affectation/employeeContract.service';

export class ContractController {
  private contractService: ContractService;

  constructor() {
    this.contractService = new ContractService();
  }

  /**
   * POST /api/contracts - Créer un nouveau contrat
   */
  createContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.contractService.createContract(req.body);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error('Controller - Create contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * GET /api/contracts/:id - Récupérer un contrat par ID
   */
  getContractById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.contractService.getContractById(id);

      if (!result.success) {
        const statusCode = result.error === 'Contract not found' ? 404 : 400;
        res.status(statusCode).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Get contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * GET /api/contracts/assignment/:assignmentId - Récupérer par Assignment ID
   */
  getContractByAssignmentId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { assignmentId } = req.params;
      const result = await this.contractService.getContractByAssignmentId(assignmentId);

      if (!result.success) {
        const statusCode = result.error === 'Contract not found' ? 404 : 400;
        res.status(statusCode).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Get contract by assignmentId error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * GET /api/contracts - Récupérer tous les contrats
   */
  // getContracts = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const filters: ContractFilters = {
  //       contractStatus: req.query.status as string,
  //       contractType: req.query.contractType as string,
  //       department: req.query.department as string,
  //       employeeName: req.query.employeeName as string,
  //       contractEligibilityStatus: req.query.eligibilityStatus as string,
  //       assignmentId: req.query.assignmentId as string,
  //     };

  //     // Gestion des filtres de date
  //     if (req.query.effectiveDateFrom || req.query.effectiveDateTo) {
  //       filters.effectiveDate = {};
  //       if (req.query.effectiveDateFrom) {
  //         filters.effectiveDate.$gte = new Date(req.query.effectiveDateFrom as string);
  //       }
  //       if (req.query.effectiveDateTo) {
  //         filters.effectiveDate.$lte = new Date(req.query.effectiveDateTo as string);
  //       }
  //     }

  //     const pagination: PaginationOptions = {
  //       page: parseInt(req.query.page as string) || 1,
  //       limit: parseInt(req.query.limit as string) || 10,
  //       sortBy: req.query.sortBy as string,
  //       sortOrder: (req.query.sortOrder as string) === 'desc' ? 'desc' : 'asc',
  //     };

  //     const result = await this.contractService.getContracts(filters, pagination);

  //     if (!result.success) {
  //       res.status(400).json(result);
  //       return;
  //     }

  //     res.json(result);
  //   } catch (error) {
  //     console.error('Controller - Get contracts error:', error);
  //     res.status(500).json({
  //       success: false,
  //       error: 'Internal server error'
  //     });
  //   }
  // };

  getContracts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await this.contractService.getContracts();

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.json(result);
  } catch (error) {
    console.error('Controller - Get contracts error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

  /**
   * PUT /api/contracts/:id - Mettre à jour un contrat
   */
  updateContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.contractService.updateContract(id, req.body);

      if (!result.success) {
        const statusCode = result.error === 'Contract not found' ? 404 : 400;
        res.status(statusCode).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Update contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * DELETE /api/contracts/:id - Supprimer un contrat
   */
  deleteContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.contractService.deleteContract(id);

      if (!result.success) {
        const statusCode = result.error === 'Contract not found' ? 404 : 400;
        res.status(statusCode).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Delete contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * POST /api/contracts/:id/validate - Valider un contrat
   */
  // validateContract = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const { id } = req.params;
  //     const result = await this.contractService.validateContract(id);

  //     if (!result.success) {
  //       res.status(400).json(result);
  //       return;
  //     }

  //     res.json(result);
  //   } catch (error) {
  //     console.error('Controller - Validate contract error:', error);
  //     res.status(500).json({
  //       success: false,
  //       error: 'Internal server error'
  //     });
  //   }
  // };

  /**
   * POST /api/contracts/:id/activate - Activer un contrat
   */
  activateContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.contractService.activateContract(id);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Activate contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * POST /api/contracts/:id/terminate - Terminer un contrat
   */
  terminateContract = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.contractService.terminateContract(id);

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.json(result);
    } catch (error) {
      console.error('Controller - Terminate contract error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * GET /api/contracts/expiring/:days - Contrats expirant bientôt
   */
  getExpiringContracts = async (req: Request, res: Response): Promise<void> => {
    try {
      const days = parseInt(req.params.days) || 30;
      const result = await this.contractService.getExpiringContracts(days);

      res.json(result);
    } catch (error) {
      console.error('Controller - Get expiring contracts error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  /**
   * GET /api/contracts/stats - Statistiques des contrats
   */
  getContractStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.contractService.getContractStats();

      res.json(result);
    } catch (error) {
      console.error('Controller - Get contract stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };
}
