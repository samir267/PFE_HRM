import Joi from "joi";

export const officialDocumentValidator = Joi.object({
  employeeid: Joi.string().required(),
  documenttype: Joi.string()
    .valid("Permis de conduire", "Passeport", "Carte d'identité", "Contrat de travail", "Visa", "Autre")
    .required(),
  keyidentifier: Joi.string().required(),
  issueddate: Joi.date().required(),
  validfrom: Joi.date().required(),
  validuntil: Joi.date().min(Joi.ref("validfrom")).optional(),
  status: Joi.string().valid("Valide", "Expiré", "En attente de renouvellement", "Inconnu").optional()
});
export const attachedDocumentValidator = Joi.object({
  employeeid: Joi.string().required(),
  documenttype: Joi.string()
    .valid("Diplôme", "Certificat", "CV", "Lettre de motivation", "Contrat de travail", "Vidéo", "Autre")
    .required(),
  documentname: Joi.string().required(),
  fileurl: Joi.string().uri().required(),
  filesizebytes: Joi.number().optional(),
  mimetype: Joi.string().optional(),
  uploadedby: Joi.string().optional(),
  comments: Joi.string().optional(),
  isconfidential: Joi.boolean().optional()
});