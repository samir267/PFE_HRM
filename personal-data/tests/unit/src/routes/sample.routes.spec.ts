import mongoose from 'mongoose'
import request from 'supertest'
import { Sample } from '../../../../src/models/sample.model'
import { startApp } from '../../../../src/app' // Import startApp instead of app
import envConfigPromise from '../../../../src/configs/env.config'
import { Server } from 'http'
import logger from '../../../../src/configs/logger.config'
import { FeatureFlagService } from '../../../../src/service/featureFlag.service'

// Define interface for Sample document
interface ISample extends mongoose.Document {
  samplename: string
  sampledescription: string
  creationdate: string
  _id: mongoose.Types.ObjectId
}

describe('Sample API', () => {
  let sampleId: string
  let app: any // Will hold the express app instance
  let server: Server
  let featureFlagService: FeatureFlagService
  beforeAll(async () => {
    const envConfig = await envConfigPromise // Ensure config is resolved
    await mongoose.connect('mongodb://localhost:27017/test')

    // Initialize the app the same way as in server.ts
    app = await startApp(envConfig)

    // Create a test server
    server = app.listen(0) // 0 will assign a random available port
    featureFlagService = new FeatureFlagService()
    await featureFlagService.initialize()
    // Activer sample_feature pour les tests
    await featureFlagService.setFlag({
      name: 'sample_feature',
      enabled: true,
      targeting: { users: [], tenants: [], percentage: 100 },
    })
  })

  afterAll(async () => {
    server.close()
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await Sample.deleteMany({})
  })

  describe('POST /api/samples', () => {
    test('should create a new sample', async () => {
      const newSample = {
        samplename: 'New Sample',
        sampledescription: 'New Description',
        creationdate: new Date().toISOString(),
      }

      const response = await request(app).post('/api/samples').send(newSample).expect(201)

      expect(response.body.sample).toHaveProperty('_id')
      expect(response.body.sample.samplename).toBe(newSample.samplename)
      expect(response.body.sample.sampledescription).toBe(newSample.sampledescription)
      expect(response.body.sample.creationdate).toBeTruthy()

      sampleId = response.body.sample._id
    })

    test('should return 400 if required fields are missing', async () => {
      const newSample = {
        samplename: '',
        sampledescription: '',
        creationdate: '',
      }

      const response = await request(app).post('/api/samples').send(newSample).expect(400)

      expect(response.body.errors).toContain('Sample name is required')
      expect(response.body.errors).toContain('Sample description is required')
      expect(response.body.errors).toContain('Creation date must be in ISO format')
    })
  })

  describe('GET /api/samples', () => {
    test('should fetch all samples', async () => {
      const sample1 = (await Sample.create({
        samplename: 'Sample 1',
        sampledescription: 'Description 1',
        creationdate: new Date().toISOString(),
      })) as unknown as ISample

      const sample2 = (await Sample.create({
        samplename: 'Sample 2',
        sampledescription: 'Description 2',
        creationdate: new Date().toISOString(),
      })) as unknown as ISample

      const response = await request(app).get('/api/samples').expect(200)

      expect(response.body.length).toBe(2)
      expect(response.body[0].samplename).toBe(sample1.samplename)
      expect(response.body[1].samplename).toBe(sample2.samplename)
    })
  })

  describe('GET /api/samples/:id', () => {
    beforeEach(async () => {
      const sample = (await Sample.create({
        samplename: 'Sample',
        sampledescription: 'Description',
        creationdate: new Date().toISOString(),
      })) as unknown as ISample

      sampleId = sample._id.toString()
    })

    test('should fetch sample by ID', async () => {
      const response = await request(app).get(`/api/samples/${sampleId}`).expect(200)

      expect(response.body.samplename).toBe('Sample')
      expect(response.body.sampledescription).toBe('Description')
    })

    test('should return 404 if sample not found', async () => {
      const response = await request(app).get('/api/samples/6649ff7a12b6ae5aa612e023').expect(404)

      expect(response.body.message).toBe('Sample not found')
    })
  })

  describe('PUT /api/samples/:id', () => {
    beforeEach(async () => {
      const sample = (await Sample.create({
        samplename: 'Sample',
        sampledescription: 'Description',
        creationdate: new Date().toISOString(),
      })) as unknown as ISample

      sampleId = sample._id.toString()
    })

    test('should update sample by ID', async () => {
      const updatedSample = {
        samplename: 'Updated Sample',
        sampledescription: 'Updated Description',
        creationdate: new Date().toISOString(),
      }

      const response = await request(app)
        .put(`/api/samples/${sampleId}`)
        .send(updatedSample)
        .expect(200)

      expect(response.body.sample.samplename).toBe(updatedSample.samplename)
      expect(response.body.sample.sampledescription).toBe(updatedSample.sampledescription)
    })

    test('should return 404 if sample not found', async () => {
      const updatedSample = {
        samplename: 'Updated Sample',
        sampledescription: 'Updated Description',
        creationdate: new Date().toISOString(),
      }

      const response = await request(app)
        .put('/api/samples/6649ff7a12b6ae5aa612e023')
        .send(updatedSample)
        .expect(404)

      expect(response.body.message).toBe('Sample not found')
    })
  })

  describe('DELETE /api/samples/:id', () => {
    beforeEach(async () => {
      const sample = (await Sample.create({
        samplename: 'Sample',
        sampledescription: 'Description',
        creationdate: new Date().toISOString(),
      })) as unknown as ISample

      sampleId = sample._id.toString()
    })

    test('should delete sample by ID', async () => {
      const response = await request(app).delete(`/api/samples/${sampleId}`).expect(200)

      expect(response.body.message).toBe(`Sample with ID ${sampleId} deleted successfully`)

      const deletedSample = await Sample.findById(sampleId)
      expect(deletedSample).toBeNull()
    })

    test('should return 404 if sample not found', async () => {
      const response = await request(app)
        .delete('/api/samples/6649ff7a12b6ae5aa612e023')
        .expect(404)

      expect(response.body.message).toBe('Sample not found')
    })
  })
})

