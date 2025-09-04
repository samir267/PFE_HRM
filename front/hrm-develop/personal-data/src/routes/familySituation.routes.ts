import { Router } from 'express';
import { MaritalStatusController } from '../controllers/family-situation/marital-status.controller';
import { DependantController } from '../controllers/family-situation/dependant.controller';
// import { EmergencyContactController } from '../controllers/family-situation/emergency-contact.controller';
import { FamilySituationValidationController } from '../controllers/family-situation/family-situation-validation.controller';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { maritalStatusSchema, dependantSchema, emergencyContactSchema } from '../validator/family-situation.validator';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MaritalStatus:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - statusType
 *         - effectiveDate
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the personal identity
 *         statusType:
 *           type: string
 *           enum: [MARRIED, SINGLE, DIVORCED, WIDOWED]
 *           description: The marital status type
 *         effectiveDate:
 *           type: string
 *           format: date
 *           description: The effective date of the marital status
 *         documentReference:
 *           type: string
 *           description: Reference to the supporting document
 *     Dependant:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - relationshipType
 *         - lastName
 *         - firstName
 *         - dateOfBirth
 *         - isFiscallyDependent
 *         - isPrimaryBeneficiary
 *         - startDate
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the personal identity
 *         relationshipType:
 *           type: string
 *           enum: [CHILD, SPOUSE, PARENT]
 *           description: The relationship type
 *         lastName:
 *           type: string
 *           description: Last name of the dependant
 *         firstName:
 *           type: string
 *           description: First name of the dependant
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth of the dependant
 *         isFiscallyDependent:
 *           type: boolean
 *           description: Whether the dependant is fiscally dependent
 *         isPrimaryBeneficiary:
 *           type: boolean
 *           description: Whether the dependant is a primary beneficiary
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the dependency
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the dependency (optional)
 *     EmergencyContact:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - lastName
 *         - firstName
 *         - relationship
 *         - phoneNumber
 *         - isPrimaryContact
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the personal identity
 *         lastName:
 *           type: string
 *           description: Last name of the emergency contact
 *         firstName:
 *           type: string
 *           description: First name of the emergency contact
 *         relationship:
 *           type: string
 *           description: Relationship to the employee
 *         phoneNumber:
 *           type: string
 *           description: Primary phone number
 *         alternativePhone:
 *           type: string
 *           description: Alternative phone number (optional)
 *         email:
 *           type: string
 *           format: email
 *           description: Email address (optional)
 *         isPrimaryContact:
 *           type: boolean
 *           description: Whether this is the primary emergency contact
 *     FamilySituationValidation:
 *       type: object
 *       properties:
 *         isCompliant:
 *           type: boolean
 *           description: Whether the family situation is compliant
 *         issues:
 *           type: array
 *           items:
 *             type: string
 *           description: List of validation issues (if any)
 *         maritalStatuses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MaritalStatus'
 *           description: List of marital statuses
 *         dependants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Dependant'
 *           description: List of dependants
 *         emergencyContacts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EmergencyContact'
 *           description: List of emergency contacts
 */

/**
 * @swagger
 * /api/marital-status:
 *   post:
 *     summary: Register a new marital status
 *     tags: [FamilySituation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaritalStatus'
 *     responses:
 *       201:
 *         description: Marital status registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MaritalStatus'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/marital-status', validationMiddleware(maritalStatusSchema), MaritalStatusController.registerMaritalStatus);

/**
 * @swagger
 * /api/marital-status/{maritalStatusId}:
 *   get:
 *     summary: Get a marital status by ID
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: maritalStatusId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the marital status
 *     responses:
 *       200:
 *         description: Marital status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MaritalStatus'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Marital status not found
 *       500:
 *         description: Internal server error
 */
router.get('/marital-status/:maritalStatusId', MaritalStatusController.getMaritalStatus);

/**
 * @swagger
 * /api/marital-status/employee/{employeeId}:
 *   get:
 *     summary: Get all marital statuses for an employee
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee (personalIdentityId)
 *     responses:
 *       200:
 *         description: Marital statuses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MaritalStatus'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/marital-status/employee/:employeeId', MaritalStatusController.getMaritalStatusesByPersonalIdentity);

/**
 * @swagger
 * /api/marital-status/{maritalStatusId}:
 *   put:
 *     summary: Update a marital status
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: maritalStatusId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the marital status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaritalStatus'
 *     responses:
 *       200:
 *         description: Marital status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MaritalStatus'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Marital status or employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/marital-status/:maritalStatusId', validationMiddleware(maritalStatusSchema), MaritalStatusController.updateMaritalStatus);

/**
 * @swagger
 * /api/marital-status/{maritalStatusId}:
 *   delete:
 *     summary: Delete a marital status
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: maritalStatusId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the marital status
 *     responses:
 *       200:
 *         description: Marital status deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Marital status not found
 *       500:
 *         description: Internal server error
 */
router.delete('/marital-status/:maritalStatusId', MaritalStatusController.deleteMaritalStatus);

/**
 * @swagger
 * /api/dependant:
 *   post:
 *     summary: Add a new dependant
 *     tags: [FamilySituation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dependant'
 *     responses:
 *       201:
 *         description: Dependant added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Dependant'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/dependant', validationMiddleware(dependantSchema), DependantController.addDependant);

/**
 * @swagger
 * /api/dependant/{dependantId}:
 *   get:
 *     summary: Get a dependant by ID
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: dependantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dependant
 *     responses:
 *       200:
 *         description: Dependant retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Dependant'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Dependant not found
 *       500:
 *         description: Internal server error
 */
router.get('/dependant/:dependantId', DependantController.getDependant);

/**
 * @swagger
 * /api/dependant/employee/{employeeId}:
 *   get:
 *     summary: Get all dependants for an employee
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee (personalIdentityId)
 *     responses:
 *       200:
 *         description: Dependants retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dependant'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/dependant/employee/:employeeId', DependantController.getDependantsByPersonalIdentity);

/**
 * @swagger
 * /api/dependant/{dependantId}:
 *   put:
 *     summary: Update a dependant
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: dependantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dependant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dependant'
 *     responses:
 *       200:
 *         description: Dependant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Dependant'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Dependant or employee not found
 *       500:
 *         description: Internal server error
 */
router.put('/dependant/:dependantId', validationMiddleware(dependantSchema), DependantController.updateDependant);

/**
 * @swagger
 * /api/dependant/{dependantId}:
 *   delete:
 *     summary: Delete a dependant
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: dependantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the dependant
 *     responses:
 *       200:
 *         description: Dependant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Dependant not found
 *       500:
 *         description: Internal server error
 */
router.delete('/dependant/:dependantId', DependantController.deleteDependant);

// /**
//  * @swagger
//  * /api/emergency-contact:
//  *   post:
//  *     summary: Add a new emergency contact
//  *     tags: [FamilySituation]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmergencyContact'
//  *     responses:
//  *       201:
//  *         description: Emergency contact added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 data:
//  *                   $ref: '#/components/schemas/EmergencyContact'
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Employee not found
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/emergency-contact', validationMiddleware(emergencyContactSchema), EmergencyContactController.addEmergencyContact);

// /**
//  * @swagger
//  * /api/emergency-contact/{emergencyContactId}:
//  *   get:
//  *     summary: Get an emergency contact by ID
//  *     tags: [FamilySituation]
//  *     parameters:
//  *       - in: path
//  *         name: emergencyContactId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the emergency contact
//  *     responses:
//  *       200:
//  *         description: Emergency contact retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 data:
//  *                   $ref: '#/components/schemas/EmergencyContact'
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Emergency contact not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/emergency-contact/:emergencyContactId', EmergencyContactController.getEmergencyContact);

// /**
//  * @swagger
//  * /api/emergency-contact/employee/{employeeId}:
//  *   get:
//  *     summary: Get all emergency contacts for an employee
//  *     tags: [FamilySituation]
//  *     parameters:
//  *       - in: path
//  *         name: employeeId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the employee (personalIdentityId)
//  *     responses:
//  *       200:
//  *         description: Emergency contacts retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/EmergencyContact'
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Employee not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/emergency-contact/employee/:employeeId', EmergencyContactController.getEmergencyContactsByPersonalIdentity);

// /**
//  * @swagger
//  * /api/emergency-contact/{emergencyContactId}:
//  *   put:
//  *     summary: Update an emergency contact
//  *     tags: [FamilySituation]
//  *     parameters:
//  *       - in: path
//  *         name: emergencyContactId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the emergency contact
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/EmergencyContact'
//  *     responses:
//  *       200:
//  *         description: Emergency contact updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 data:
//  *                   $ref: '#/components/schemas/EmergencyContact'
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Emergency contact or employee not found
//  *       500:
//  *         description: Internal server error
//  */
// router.put('/emergency-contact/:emergencyContactId', validationMiddleware(emergencyContactSchema), EmergencyContactController.updateEmergencyContact);

// /**
//  * @swagger
//  * /api/emergency-contact/{emergencyContactId}:
//  *   delete:
//  *     summary: Delete an emergency contact
//  *     tags: [FamilySituation]
//  *     parameters:
//  *       - in: path
//  *         name: emergencyContactId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the emergency contact
//  *     responses:
//  *       200:
//  *         description: Emergency contact deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Emergency contact not found
//  *       500:
//  *         description: Internal server error
//  */
// router.delete('/emergency-contact/:emergencyContactId', EmergencyContactController.deleteEmergencyContact);

/**
 * @swagger
 * /api/validate/{employeeId}:
 *   get:
 *     summary: Validate family situation
 *     tags: [FamilySituation]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee (personalIdentityId)
 *     responses:
 *       200:
 *         description: Family situation validation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FamilySituationValidation'
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/validate/:employeeId', FamilySituationValidationController.validateFamilySituation);

export default router;