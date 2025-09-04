import mongoose, { Schema } from 'mongoose';

const MedicalConditionSchema = new Schema(
  {
    employeeid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    conditionname: {
      type: String,
      required: true,
      description: 'Nom ou description de la condition médicale / invalidité'
    },
    startdate: {
      type: Date,
      required: true,
      description: 'Date de début de la condition/invalidité'
    },
    enddate: {
      type: Date,
      required: false,
      description: 'Date de fin de la condition/invalidité (si applicable)'
    },
    disabilityreason: {
      type: String,
      required: true,
      enum: ['Maladie chronique', 'Accident de travail', 'Handicap de naissance', 'Autre']
    },
    severity: {
      type: String,
      required: true,
      enum: ['Légère', 'Modérée', 'Sévère']
    },
    requiredfollowup: {
      type: Boolean,
      default: false
    },
    disabilityrate: {
      type: Number,
      min: 0,
      max: 100,
      required: false
    },
    disabilitystatus: {
      type: String,
      required: true,
      enum: ['Temporaire', 'Permanente', 'En évaluation']
    },
    comments: {
      type: String,
      required: false
    },
    accommodationsmade: {
      type: [String], // Liste d'aménagements réalisés
      required: false
    },
    limitationsandaccommodationsrequired: {
      type: String, // Description textuelle des besoins/aménagements
      required: false
    },
    createdat: {
      type: Date,
      default: Date.now
    },
    updatedat: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export const MedicalConditionModel = mongoose.model('MedicalCondition', MedicalConditionSchema);
