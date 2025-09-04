// models/Vehicle.js
import mongoose from 'mongoose';

const assignmentHistorySchema = new mongoose.Schema({
  employeeId: {
    type: String, // Référence à votre table employeeInformation existante
    required: true
  },
  assignmentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  releaseDate: {
    type: Date,
    default: null
  }
}, { _id: false });

const maintenanceHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
//   type: {
//     type: String,
//     required: true,
//     enum: ['Sedan', 'SUV', 'Van', 'Truck', 'Motorcycle', 'Other']
//   },
  color: {
    type: String,
    trim: true,
    maxlength: 30
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: 20
  },
  status: {
    type: String,
    enum: ['In service', 'In maintenance', 'Out of service'],
    default: 'Out of service'
  },
  assignment: {
    employeeId: {
      type: String, // ID de référence vers votre table employeeInformation
      default: null
    },
    history: [assignmentHistorySchema]
  },
  maintenanceHistory: [maintenanceHistorySchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour les recherches fréquentes
vehicleSchema.index({ licensePlate: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ 'assignment.employeeId': 1 });
vehicleSchema.index({ make: 1, model: 1 });

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);