// import { KafkaConnector } from '../../service/kafkaConnector';

// async function startKafkaConsumer() {
//   const kafkaConnector = KafkaConnector.getInstance();

//   try {
//     await kafkaConnector.connect();

//     await kafkaConnector.consume('personal-data-events', async (message: any) => {
//       console.log('Message reçu du topic personal-data-events :', JSON.stringify(message));

//       if (!message || !message.type || !message.data || !message.data.identity) {
//         console.warn('Format de message invalide:', JSON.stringify(message));
//         return;
//       }

//       const { type, data } = message;
//       const { identity } = data;

//       console.log(`Événement: ${type}, Utilisateur: ${identity.firstName} ${identity.lastName}`);
//       console.log(`Détails: ID=${identity._id}, Numéro d'enregistrement=${identity.registrationNumber}, Genre=${identity.gender}`);
//       console.log(`Nationalités: ${JSON.stringify(identity.nationalities)}`);
//       console.log(`Créé le: ${identity.createdAt}`);
//     });

//     const status = kafkaConnector.getStatus();
//     console.log('Statut Kafka :', status);
//   } catch (error) {
//     console.error('Erreur lors de la configuration du consumer :', error);
//   }
// }

// // Commenter temporairement pour éviter les conflits
// // startKafkaConsumer().catch((error) => {
// //   console.error('Erreur lors du démarrage du consumer :', error);
// // });

// process.on('SIGINT', async () => {
//   console.log('Déconnexion de Kafka...');
//   await KafkaConnector.getInstance().disconnect();
//   process.exit(0);
// });