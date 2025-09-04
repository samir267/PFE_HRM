import { Router } from "express";
import { receivedEmployees } from "../../controllers/kafkaConsumer/kafka.controller";

const router = Router();

// 🔹 Liste brute des messages Kafka reçus (ici : employés créés)
router.get("/getemployees", (req, res) => {
    console.log("receivedEmployees");
  res.json(receivedEmployees);
});

// 🔹 Chercher un employé par son registrationNumber
router.get("/employees/:registrationNumber", (req, res) => {
  const employee = receivedEmployees.find(
    (emp) => emp.registrationNumber === req.params.registrationNumber
  );

  if (!employee) {
    return res.status(404).json({ error: "Employé introuvable" });
  }

  res.json(employee);
});

router.get("/employee/:id", (req, res) => {
  const employee = receivedEmployees.find(
    (emp) => emp._id === req.params.id
  );

  if (!employee) {
    return res.status(404).json({ error: "Employé introuvable" });
  }

  res.json(employee);
});

export default router;
