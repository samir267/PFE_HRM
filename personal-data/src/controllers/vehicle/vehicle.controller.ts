// controllers/vehicleController.ts
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Vehicle } from "../../models/Vehicle/Vehicle.model";

export class VehicleController {
  // Obtenir tous les véhicules
//   async getVehicles(req: Request, res: Response, next: NextFunction) {
//     try {
//       const vehicles = await Vehicle.find({ isActive: true });
//       res.json({ success: true, data: vehicles });
//     } catch (error) {
//       next(error);
//     }
//   }

  // Obtenir un véhicule par ID
//   async getVehicleById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const vehicle = await Vehicle.findById(req.params.id);

//       if (!vehicle || !vehicle.isActive) {
//         return res.status(404).json({
//           success: false,
//           message: "Vehicle not found",
//         });
//       }

//       res.json({ success: true, data: vehicle });
//     } catch (error) {
//       next(error);
//     }
//   }


static async getVehicles(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = 1, pageSize = 10, sortBy, sortOrder, filter } = req.query;
    const query: any = { isActive: true };

    // Apply filters (example: filter by make, model, or status)
    if (filter) {
      const parsedFilter = JSON.parse(filter as string);
      if (parsedFilter.make) query.make = { $regex: parsedFilter.make, $options: 'i' };
      if (parsedFilter.model) query.model = { $regex: parsedFilter.model, $options: 'i' };
      if (parsedFilter.status) query.status = parsedFilter.status;
    }

    // Sorting
    const sortOptions: any = {};
    if (sortBy) sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    const [vehicles, total] = await Promise.all([
      Vehicle.find(query).sort(sortOptions).skip(skip).limit(limit),
      Vehicle.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: vehicles,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}
  // Créer un nouveau véhicule
 static async createVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const vehicle = new Vehicle(req.body);
      await vehicle.save();

      res.status(201).json({
        success: true,
        data: vehicle,
        message: "Vehicle created successfully",
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "License plate or serial number already exists",
        });
      }
      next(error);
    }
  }

  // Mettre à jour un véhicule
 static async updateVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const vehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!vehicle || !vehicle.isActive) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      res.json({
        success: true,
        data: vehicle,
        message: "Vehicle updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Supprimer un véhicule (soft delete)
 static async deleteVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        { isActive: false, updatedAt: Date.now() },
        { new: true }
      );

      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      res.json({ success: true, message: "Vehicle deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  // Assigner un véhicule à un employé
 static async assignVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { vehicleId, employeeId } = req.params;

      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      // Libérer l'ancien employé si nécessaire
      if (vehicle.assignment!.employeeId) {
        const lastHistory =
          vehicle.assignment!.history[vehicle.assignment!.history.length - 1];
        if (lastHistory && !lastHistory.releaseDate) {
          lastHistory.releaseDate = new Date();
        }
      }

      // Assigner le nouvel employé
      vehicle.assignment!.employeeId = employeeId;
      vehicle.assignment!.history.push({
        employeeId: employeeId,
        assignmentDate: new Date(),
      });
      vehicle.status = "In service";

      await vehicle.save();

      res.json({
        success: true,
        data: vehicle,
        message: "Vehicle assigned successfully",
      });
    } catch (error) {
      next(error);
    }
  }static
async addMaintenanceRecord(req: Request, res: Response, next: NextFunction) {
  try {
    const { vehicleId } = req.params;
    const { date, description, cost } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.isActive) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.maintenanceHistory.push({ date, description, cost });
    await vehicle.save();

    res.json({
      success: true,
      data: vehicle,
      message: "Maintenance record added successfully",
    });
  } catch (error) {
    next(error);
  }
}


static
async deleteVehiclesBulk(req: Request, res: Response, next: NextFunction) {
  try {
    const { vehicleIds } = req.body;
    if (!Array.isArray(vehicleIds) || vehicleIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No vehicle IDs provided",
      });
    }

    const result = await Vehicle.updateMany(
      { _id: { $in: vehicleIds }, isActive: true },
      { isActive: false, updatedAt: Date.now() }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No vehicles found for deletion",
      });
    }

    res.json({
      success: true,
      message: `${result.modifiedCount} vehicle(s) deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
}
  // Désassigner un véhicule
 static async unassignVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { vehicleId } = req.params;

      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found",
        });
      }

      // Mettre à jour l'historique
      const lastHistory =
        vehicle.assignment!.history[vehicle.assignment!.history.length - 1];
      if (lastHistory && !lastHistory.releaseDate) {
        lastHistory.releaseDate = new Date();
      }

      // Désassigner
      vehicle.assignment!.employeeId = "";
      vehicle.status = "Out of service";
      await vehicle.save();

      res.json({
        success: true,
        data: vehicle,
        message: "Vehicle unassigned successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtenir les véhicules d'un employé spécifique
 static async getVehiclesByEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { employeeId } = req.params;

      const vehicles = await Vehicle.find({
        "assignment.employeeId": employeeId,
        isActive: true,
      });

      res.json({ success: true, data: vehicles });
    } catch (error) {
      next(error);
    }
  }
}

