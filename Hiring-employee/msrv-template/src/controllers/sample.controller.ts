// src/controllers/sample.controller.ts
import { Request, Response } from 'express'
import { Sample } from '../models/sample.model'
import logger from '../configs/logger.config'
import { KafkaConnector } from '../service/kafkaConnector'

// Get the singleton instance instead of creating a new one
const kafka = KafkaConnector.getInstance()

// No need to connect here - we'll do it in app.ts
// kafka.connect()

export const createSample = async (req: Request, res: Response) => {
  try {
    const { samplename, sampledescription, creationdate } = req.body
    logger.info("Création d'un échantillon : %j", req.body)

    const newSample = new Sample({
      samplename,
      sampledescription,
      creationdate,
    })
    await newSample.save()

    // This will be a no-op in test environment
    kafka
      .produce('sample-events', { type: 'SAMPLE_CREATED', data: newSample })
      .catch((error) => logger.error('Erreur Kafka:', error))

    return res.status(201).json({ message: 'Sample created successfully', sample: newSample })
  } catch (error) {
    logger.error("Erreur lors de la création de l'échantillon :", error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getAllSamples = async (req: Request, res: Response) => {
  try {
    const samples = await Sample.find()
    logger.info('Liste des échantillons récupérée')

    // Using singleton kafka instance
    kafka
      .produce('sample-events', { type: 'ALL_SAMPLES_FETCHED', data: samples })
      .catch((error) => logger.error('Erreur Kafka:', error))

    return res.status(200).json(samples)
  } catch (error) {
    logger.error('Erreur lors de la récupération des échantillons:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getSampleById = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id)
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' })
    }

    // Using singleton kafka instance
    kafka
      .produce('sample-events', { type: 'SAMPLE_FETCHED', data: sample })
      .catch((error) => logger.error('Erreur Kafka:', error))

    return res.status(200).json(sample)
  } catch (error) {
    logger.error("Erreur lors de la récupération de l'échantillon :", error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateSample = async (req: Request, res: Response) => {
  try {
    const sampleId = req.params.id
    const updatedSample = await Sample.findByIdAndUpdate(sampleId, req.body, { new: true })

    if (!updatedSample) {
      return res.status(404).json({ message: 'Sample not found' })
    }

    // Using singleton kafka instance
    kafka
      .produce('sample-events', { type: 'SAMPLE_UPDATED', data: updatedSample })
      .catch((error) => logger.error('Erreur Kafka:', error))

    return res.status(200).json({ message: 'Sample updated successfully', sample: updatedSample })
  } catch (error) {
    logger.error('Erreur lors de la mise à jour :', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteSample = async (req: Request, res: Response) => {
  try {
    const sampleId = req.params.id
    const deletedSample = await Sample.findByIdAndDelete(sampleId)

    if (!deletedSample) {
      return res.status(404).json({ message: 'Sample not found' })
    }

    // Using singleton kafka instance
    kafka
      .produce('sample-events', { type: 'SAMPLE_DELETED', data: sampleId })
      .catch((error) => logger.error('Erreur Kafka:', error))

    return res.status(200).json({ message: `Sample with ID ${sampleId} deleted successfully` })
  } catch (error) {
    logger.error('Erreur lors de la suppression :', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
