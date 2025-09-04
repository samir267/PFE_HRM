import Joi from 'joi'

export const sampleSchema = Joi.object({
  samplename: Joi.string().min(3).required().messages({
    'string.empty': 'Sample name is required',
    'string.min': 'Sample name should have a minimum length of 3',
  }),
  sampledescription: Joi.string().required().messages({
    'string.empty': 'Sample description is required',
  }),
  creationdate: Joi.date().iso().required().messages({
    'date.base': 'Creation date must be a valid date',
    'date.format': 'Creation date must be in ISO format',
  }),
})
