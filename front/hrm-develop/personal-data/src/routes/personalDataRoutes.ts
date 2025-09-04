import { Router } from 'express';
import { EmployeeController } from '../controllers/civil-status/employee.controller';
import { PersonalIdentityController } from '../controllers/civil-status/personal-identity.controller';
import { BirthInformationController } from '../controllers/civil-status/birth-information.controller';
import { NationalityController } from '../controllers/civil-status/nationality.controller';
import { CountryReferenceController } from '../controllers/civil-status/country-reference.controller';

const router = Router();

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalIdentity:
 *                 type: object
 *                 description: Personal identity information of the employee
 *               birthInformation:
 *                 type: object
 *                 description: Birth information of the employee
 *                 properties:
 *                   placeOfBirth:
 *                     type: string
 *                     example: "Paris"
 *                   countryOfBirthCode:
 *                     type: string
 *                     example: "FRA"
 *               nationalities:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nationalityCountryCode:
 *                       type: string
 *                       example: "FRA"
 *                     isPrimary:
 *                       type: boolean
 *                       example: true
 *                     isResident:
 *                       type: boolean
 *                       example: false
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     identity:
 *                       type: object
 *                     birthInfo:
 *                       type: object
 *                     nationalities:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid countryOfBirthCode"
 */
router.post('/employees', EmployeeController.createEmployee);

/**
 * @swagger
 * /api/personal-identity/{id}:
 *   patch:
 *     summary: Update personal identity information
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal identity (personalIdentityId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalIdentity:
 *                 type: object
 *                 description: Updated personal identity information
 *     responses:
 *       200:
 *         description: Personal identity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identity updated"
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed for personalIdentity"
 */
router.patch('/personal-identity/:id', PersonalIdentityController.updatePersonalIdentity);

/**
 * @swagger
 * /api/personal-identity/{id}:
 *   get:
 *     summary: Retrieve personal identity information
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal identity (personalIdentityId)
 *     responses:
 *       200:
 *         description: Personal identity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identity retrieved"
 *                 data:
 *                   type: object
 *                   properties:
 *                     registrationNumber:
 *                       type: string
 *                     identity:
 *                       type: object
 *                     birthInfo:
 *                       type: object
 *                     nationalities:
 *                       type: array
 *                       items:
 *                         type: object
 *       404:
 *         description: Personal identity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identity not found"
 */
router.get('/personal-identity/:id', PersonalIdentityController.readPersonalIdentity);

/**
 * @swagger
 * /api/personal-identities:
 *   get:
 *     summary: Retrieve all active personal identities
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of active personal identities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identities retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/personal-identities', PersonalIdentityController.readAllPersonalIdentities);

/**
 * @swagger
 * /api/personal-identities/deleted:
 *   get:
 *     summary: Retrieve all deleted personal identities
 *     tags: [Employee]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of deleted personal identities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identities retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/personal-identities/deleted', PersonalIdentityController.readAllPersonalIdentitiesDeleted);

/**
 * @swagger
 * /api/personal-identity/{id}:
 *   delete:
 *     summary: Delete (soft delete) a personal identity
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal identity (personalIdentityId)
 *     responses:
 *       200:
 *         description: Personal identity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identity deleted"
 *                 data:
 *                   type: object
 *       404:
 *         description: Personal identity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal identity not found"
 */
router.delete('/personal-identity/:id', PersonalIdentityController.deletePersonalIdentity);

/**
 * @swagger
 * /api/birth-information/{personalIdentityId}:
 *   patch:
 *     summary: Update birth information for a personal identity
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: personalIdentityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal identity (personalIdentityId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeOfBirth:
 *                 type: string
 *                 example: "Paris"
 *               countryOfBirthCode:
 *                 type: string
 *                 example: "FRA"
 *     responses:
 *       200:
 *         description: Birth information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Birth information updated"
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid countryOfBirthCode"
 */
router.patch('/birth-information/:personalIdentityId', BirthInformationController.updateBirthInformation);

/**
 * @swagger
 * /api/birth-information/{personalIdentityId}:
 *   get:
 *     summary: Retrieve birth information for a personal identity
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: personalIdentityId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal identity (personalIdentityId)
 *     responses:
 *       200:
 *         description: Birth information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Birth information retrieved"
 *                 data:
 *                   type: object
 *       404:
 *         description: Birth information not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Birth information not found"
 */
router.get('/birth-information/:personalIdentityId', BirthInformationController.readBirthInformation);



/**
 * @swagger
 * /api/nationalities:
 *   post:
 *     summary: create nationalities
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: nationalities created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "nationalities created"
 *                 data:
 *                   type: object
 */
router.post('/nationalities', NationalityController.createNationalities);

/**
 * @swagger
 * /api/country-references:
 *   post:
 *     summary: create country-references
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: country-references created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "country-references created"
 *                 data:
 *                   type: object
 */
router.post('/country-references', CountryReferenceController.populateCountries);


// /**
//  * @swagger
//  * /api/nationalities/{personalIdentityId}:
//  *   patch:
//  *     summary: Update nationalities for a personal identity
//  *     tags: [Employee]
//  *     parameters:
//  *       - in: path
//  *         name: personalIdentityId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the personal identity (personalIdentityId)
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               nationalities:
//  *                 type: array
//  *                 items:
//  *                   type: object
//  *                   properties:
//  *                     nationalityCountryCode:
//  *                       type: string
//  *                       example: "FRA"
//  *                     isPrimary:
//  *                       type: boolean
//  *                       example: true
//  *                     isResident:
//  *                       type: boolean
//  *                       example: false
//  *     responses:
//  *       200:
//  *         description: Nationalities updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Nationalities updated"
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *       400:
//  *         description: Invalid input data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Primary nationality must match country of birth"
//  */
// router.patch('/nationalities/:personalIdentityId', NationalityController.updateNationalities);

// /**
//  * @swagger
//  * /api/nationalities/{personalIdentityId}:
//  *   get:
//  *     summary: Retrieve nationalities for a personal identity
//  *     tags: [Employee]
//  *     parameters:
//  *       - in: path
//  *         name: personalIdentityId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the personal identity (personalIdentityId)
//  *     responses:
//  *       200:
//  *         description: Nationalities retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Nationalities retrieved"
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *       404:
//  *         description: Nationalities not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Nationalities not found"
//  */
// router.get('/nationalities/:personalIdentityId', NationalityController.readNationalities);

/**
 * @swagger
 * /api/country-references/validate:
 *   post:
 *     summary: Validate a list of country codes
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryCodes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "FRA"
 *     responses:
 *       200:
 *         description: Country codes validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Country codes validated successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid country codes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid country code"
 */
router.post('/country-references/validate', CountryReferenceController.validateCountryCodes);

export default router;