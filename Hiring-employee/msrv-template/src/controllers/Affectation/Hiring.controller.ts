import logger from "../../configs/logger.config";
import { KafkaConnector } from '../../service/kafkaConnector';

class EmployeeController {
      const kafka = KafkaConnector.getInstance();
    
  async handleEmployeeCreated(employeeData: any) {
    // Exemple de traitement simple
    logger.info(`👤 Nouvel employé reçu: ${employeeData.registrationNumber} - ${employeeData.firstName} ${employeeData.lastName}`);

   await kafka.consume('personal-data-events', async (rawMessage: any) => {
  try {
    logger.info('✅ aa');
    logger.info('📨 Message brut reçu :', rawMessage);

    // Supposons que rawMessage contient déjà { type, data }
    const { type, data } = rawMessage;

    if (type === 'EMPLOYEE_CREATED' && data?.employee) {
      await employeeController.handleEmployeeCreated(data.employee);
    }
  } catch (err) {
    logger.error('❌ Erreur lors du traitement du message Kafka', err);
  }
});
  }
}

export default new EmployeeController();
