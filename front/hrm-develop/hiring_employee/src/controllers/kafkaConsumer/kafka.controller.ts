// kafkaConsumer.ts
import { KafkaConnector } from '../../service/kafkaConnector';
import logger from '../../configs/logger.config';

interface Message {
  type: string;
  data: {
    identity: any;
  };
}
export const receivedEmployees: any[] = [];

export const startKafkaConsumer = async () => {
  const kafka = KafkaConnector.getInstance();

  try {
    await kafka.connect();
    logger.info('✅ Kafka connecté avec succès');

    // 👇 Consommation avec filtrage sur EMPLOYEE_CREATED
        logger.info('✅ aaa');

    await kafka.consume('personal-data-events', async (rawMessage: object) => {
          logger.info('✅ aa');

      logger.info('📨 Message brut reçu :', rawMessage);

      const messageTyped = rawMessage as Message;

      // ✅ On filtre uniquement les employés créés
      if (messageTyped.type === 'EMPLOYEE_CREATED') {
        const identity = messageTyped.data.identity;
          receivedEmployees.push(identity);


        // 🔍 Affiche les informations de l'employé créé
        logger.info('👤 Nouvel employé :');
        logger.info(`➡️ Nom complet : ${identity.firstName} ${identity.middleName || ''} ${identity.lastName}`);
        logger.info(`➡️ Numéro d'enregistrement : ${identity.registrationNumber}`);
        logger.info(`➡️ Nationalités : ${identity.nationalities?.map((n: { nationalityId: any; }) => n.nationalityId).join(', ')}`);
      } else {
        logger.info(`ℹ️ Type ignoré : ${messageTyped.type}`);
      }
    });

    logger.info('📡 Abonné au topic personal-data-events');
  } catch (error) {
    logger.error('❌ Erreur dans startKafkaConsumer :', error);
  }
};
