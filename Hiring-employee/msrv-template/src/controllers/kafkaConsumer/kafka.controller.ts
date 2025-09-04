// kafkaConsumer.ts
import { KafkaConnector } from "../../service/kafkaConnector";
import logger from "../../configs/logger.config";

interface Message {
  type: string;
  data: {
    employee: any;
  };
}

export const receivedEmployees: any[] = [];

export const startKafkaConsumer = async () => {
  const kafka = KafkaConnector.getInstance();

  try {
    await kafka.connect();
    logger.info("✅ Kafka connecté avec succès");

    await kafka.consume("personal-data-events", async (rawMessage: object) => {
      logger.info("📨 Message brut reçu :", rawMessage);

      const messageTyped = rawMessage as Message;

      if (messageTyped.type === "EMPLOYEE_CREATED") {
        const employee = messageTyped.data.employee;
        receivedEmployees.push(employee);

        logger.info("👤 Nouvel employé reçu depuis Kafka :", {
          registrationNumber: employee.registrationNumber,
          fullName: `${employee.firstName} ${employee.lastName}`,
          job: employee.jobTitle,
        });
      } else {
        logger.info(`ℹ️ Type ignoré : ${messageTyped.type}`);
      }
    });

    logger.info("📡 Abonné au topic personal-data-events");
  } catch (error) {
    logger.error("❌ Erreur dans startKafkaConsumer :", error);
  }
};
