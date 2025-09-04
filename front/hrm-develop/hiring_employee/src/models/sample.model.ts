import mongoose, { Schema, Document, Model } from 'mongoose'

export interface SampleDocument extends Document {
  samplename: string
  sampledescription: string
  creationdate: Date // Ajout du champ creationdate
  createdAt?: Date
  updatedAt?: Date
}

const SampleSchema: Schema = new Schema(
  {
    samplename: { type: String, required: true },
    sampledescription: { type: String, required: true },
    creationdate: { type: Date, required: true }, // Champ creationdate explicite
  },
  { timestamps: true } // Utilisation de timestamps pour createdAt et updatedAt
)

export const Sample: Model<SampleDocument> = mongoose.model<SampleDocument>('Sample', SampleSchema)
