import { Request, Response } from "express";
import { AttachedDocumentService } from "../../service/documents/attachedDocuments.service";
import logger from "../../configs/logger.config";
import { KafkaConnector } from "../../service/kafkaConnector";
import cloudinary from "cloudinary";
import { attachedDocumentValidator } from "../../validator/documents/documentsValidation.validator";
import { AttachedDocumentModel } from "../../models/documents/attachedDocuments.model";

const service = new AttachedDocumentService();
const kafka = KafkaConnector.getInstance();

export class AttachedDocumentController {
  // static async create(req: Request, res: Response) {
  //   try{

  //     const document = await service.create(req.body);
  //     await kafka
  //       .produce('personal-data-Documents', {
  //         type: 'ATTACHED_DOCUMENT_CREATED',
  //         data: document,
  //       })
  //       .catch((error) => logger.error('Erreur Kafka lors de la création du document attaché:', error));
  //     return res.status(201).json(document);
  //   }catch(error:any){
  //     logger.error('Erreur lors de la création du document attaché:', error);
  //     return res.status(400).json({ message: error.message });
  //   }
  // }


// static async createAttachedDocument(req: Request, res: Response) {
//   try {
//     const {
//       employeeid,
//       documenttype,
//       documentname,
//       fileurl,
//       filesizebytes,
//       mimetype,
//       uploadedby,
//       comments,
//       isconfidential,
//     } = req.body;

//     const data: any = {
//       employeeid,
//       documenttype,
//       documentname,
//       fileurl,
//       filesizebytes,
//       mimetype,
//       uploadedby,
//       comments,
//       isconfidential,
//     };

//     if (fileurl && typeof fileurl === 'string') {
//       const mycloud = await cloudinary.v2.uploader.upload(fileurl, {
//         folder: "images", // corriger "immages" si c'était une faute
//       });

//       data.thumbnail = {
//         public_id: mycloud.public_id,
//         url: mycloud.secure_url,
//       };
//     }

//     const document = await service.create(data);
//     res.status(201).json(document);
//   } catch (error: any) {
//     res.status(400).json({ message: "Erreur lors de la création", error: error.message });
//   }
// }

static async createAttachedDocument(req: Request, res: Response) {
    try {
      // Extraire thumbnail pour ne pas le valider (car non attendu dans le schéma Joi)
      const { thumbnail, ...dataToValidate } = req.body;

      console.log("Données à valider:", dataToValidate);

      const { error } = attachedDocumentValidator.validate(dataToValidate);
      if (error) {
        return res.status(400).json({ message: "Validation échouée", error: error.message });
      }

      // Si on a une URL dans fileurl, on upload sur Cloudinary
      let uploadedThumbnail = null;
      if (dataToValidate.fileurl && typeof dataToValidate.fileurl === "string") {
        uploadedThumbnail = await cloudinary.v2.uploader.upload(dataToValidate.fileurl, {
          folder: "images",
        });
      }

      // Construire l'objet final à créer dans la base
      const dataToCreate = {
        ...dataToValidate,
        ...(uploadedThumbnail && {
          thumbnail: {
            public_id: uploadedThumbnail.public_id,
            url: uploadedThumbnail.secure_url,
          },
        }),
      };
      await kafka
      .produce('personal-data-documents', {
        type: 'ATTACHED_DOCUMENT_CREATED',
        data: dataToCreate,
      })
      const document = await service.create(dataToCreate);
      return res.status(201).json(document);

    } catch (err: any) {
      console.error("Erreur lors de la création:", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  }













  static async getById(req: Request, res: Response) {
    try{

      const doc = await service.getById(req.params.id);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      return res.status(200).json(doc);
    }catch(error:any){
      logger.error('Erreur lors de la récupération du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async getByEmployee(req: Request, res: Response) {
    try{
      const docs = await service.getByEmployee(req.params.employeeId);
      return res.status(200).json(docs);
    }catch(error:any){
      logger.error('Erreur lors de la récupération des documents attachés:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try{

      const doc = await service.update(req.params.id, req.body);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      await kafka
        .produce('personal-data-Documents', {
          type: 'ATTACHED_DOCUMENT_UPDATED',
          data: doc,
        })
        .catch((error) => logger.error('Erreur Kafka lors de la mise à jour du document attaché:', error));
      return res.status(200).json(doc);
    }catch(error:any){
      logger.error('Erreur lors de la mise à jour du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try{
      const doc = await service.delete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      await kafka
        .produce('personal-data-Documents', {
          type: 'ATTACHED_DOCUMENT_DELETED',
          data: { id: req.params.id },
        })
        .catch((error) => logger.error('Erreur Kafka lors de la suppression du document attaché:', error));
      return res.status(200).json({ message: "Deleted successfully" });
    }catch(error:any){
      logger.error('Erreur lors de la suppression du document attaché:', error);
      return res.status(400).json({ message: error.message });
    }
  }
}