// routes/vehicleRoutes.ts
import { Router } from "express";
import { body } from "express-validator";
import { VehicleController } from "../../controllers/vehicle/vehicle.controller";

const router = Router();

// ✅ Obtenir tous les véhicules avec pagination, tri et filtres
router.get("/Vehicle", VehicleController.getVehicles);

// ✅ Obtenir un véhicule par ID
router.get("/Vehicle/:id", VehicleController.getVehiclesByEmployee);

// ✅ Créer un véhicule
router.post(
  "/vehicle",  VehicleController.createVehicle);

// ✅ Mettre à jour un véhicule
router.put(
  "/Vehicle/:id",  VehicleController.updateVehicle
);

// ✅ Supprimer un véhicule (soft delete)
router.delete("/Vehicle/:id", VehicleController.deleteVehicle);

// ✅ Suppression en masse
router.post("/vehicle/bulk-delete", VehicleController.deleteVehiclesBulk);

// ✅ Assigner un véhicule à un employé
router.post("/:vehicleId/assign/:employeeId", VehicleController.assignVehicle);

// ✅ Désassigner un véhicule
router.post("/:vehicleId/unassign", VehicleController.unassignVehicle);

// ✅ Ajouter un enregistrement de maintenance
router.post("/:vehicleId/maintenance", VehicleController.addMaintenanceRecord);

// ✅ Obtenir tous les véhicules d’un employé
router.get("/employee/:employeeId", VehicleController.getVehiclesByEmployee);

export default router;
