import Joi from 'joi';

export const medicalConditionValidator = Joi.object({
  employeeid: Joi.string().required(),
  conditionname: Joi.string().required(),
  startdate: Joi.date().required(),
  enddate: Joi.date().optional().greater(Joi.ref('startdate')).messages({
    'date.greater': '"enddate" doit être postérieure à "startdate"'
  }),
  disabilityreason: Joi.string()
    .valid('Maladie chronique', 'Accident de travail', 'Handicap de naissance', 'Autre')
    .required(),
  severity: Joi.string().valid('Légère', 'Modérée', 'Sévère').required(),
  requiredfollowup: Joi.boolean().optional(),
  disabilityrate: Joi.number().min(0).max(100).optional(),
  disabilitystatus: Joi.string()
    .valid('Temporaire', 'Permanente', 'En évaluation')
    .required(),
  comments: Joi.string().optional(),
  accommodationsmade: Joi.array().items(Joi.string()).optional(),
  limitationsandaccommodationsrequired: Joi.string().optional()
});
