import { Router } from 'express';
import PostalAddressController from '../controllers/contact/postal-address.controller';
import PhoneContactController from '../controllers/contact/phone-contact.controller';
import ElectronicContactController from '../controllers/contact/electronic-contact.controller';
import EmergencyContactController from '../controllers/contact/emergency-contact.controller';
import ContactPreferenceController from '../controllers/contact/contact-preference.controller';
import ContactValidationController from '../controllers/contact/contact-validation.controller';
import {
  addressValidationSchema,
  phoneValidationSchema,
  electronicValidationSchema,
  emergencyValidationSchema,
  preferenceValidationSchema,
  verificationValidationSchema,
} from '../validator/contactValidators.validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - addressType
 *         - streetLine1
 *         - city
 *         - postalCode
 *         - countryCode
 *         - effectiveDate
 *         - addressVerificationStatus
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the employee
 *         addressType:
 *           type: string
 *           enum: [HOME, WORK, SECONDARY, OTHER]
 *           description: The type of address
 *         isPrimary:
 *           type: boolean
 *           description: Whether this is the primary address
 *         streetLine1:
 *           type: string
 *           description: First line of the street address
 *         streetLine2:
 *           type: string
 *           description: Second line of the street address (optional)
 *         city:
 *           type: string
 *           description: City of the address
 *         stateProvince:
 *           type: string
 *           description: State or province (optional)
 *         postalCode:
 *           type: string
 *           description: Postal code
 *         countryCode:
 *           type: string
 *           description: ISO country code (e.g., US, FR)
 *         geoLatitude:
 *           type: number
 *           description: Geographic latitude (optional)
 *         geoLongitude:
 *           type: number
 *           description: Geographic longitude (optional)
 *         effectiveDate:
 *           type: string
 *           format: date
 *           description: Effective date of the address
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the address (optional)
 *         addressVerificationStatus:
 *           type: string
 *           enum: [VERIFIED, UNVERIFIED, INVALID]
 *           description: Verification status of the address
 *         verificationDate:
 *           type: string
 *           format: date
 *           description: Date of verification (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     PhoneContact:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - phoneType
 *         - countryCode
 *         - phoneNumber
 *         - isMessagingEnabled
 *         - verificationStatus
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the employee
 *         phoneType:
 *           type: string
 *           enum: [MOBILE, HOME, WORK, FAX, OTHER]
 *           description: The type of phone number
 *         isPrimary:
 *           type: boolean
 *           description: Whether this is the primary phone number
 *         countryCode:
 *           type: string
 *           description: Country code (e.g., +1, +33)
 *         phoneNumber:
 *           type: string
 *           description: Phone number
 *         extension:
 *           type: string
 *           description: Phone extension (optional)
 *         isMessagingEnabled:
 *           type: boolean
 *           description: Whether messaging is enabled
 *         preferredTimeStart:
 *           type: string
 *           format: date-time
 *           description: Preferred start time for contact (optional)
 *         preferredTimeEnd:
 *           type: string
 *           format: date-time
 *           description: Preferred end time for contact (optional)
 *         timeZone:
 *           type: string
 *           description: Time zone (optional)
 *         verificationStatus:
 *           type: string
 *           enum: [VERIFIED, UNVERIFIED, INVALID]
 *           description: Verification status of the phone number
 *         verificationDate:
 *           type: string
 *           format: date
 *           description: Date of verification (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     ElectronicContact:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - contactType
 *         - contactValue
 *         - purpose
 *         - verificationStatus
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the employee
 *         contactType:
 *           type: string
 *           enum: [EMAIL, CORPORATE_EMAIL, MESSENGER, SOCIAL, OTHER]
 *           description: The type of electronic contact
 *         isPrimary:
 *           type: boolean
 *           description: Whether this is the primary electronic contact
 *         contactValue:
 *           type: string
 *           description: The contact value (e.g., email address, messenger ID)
 *         provider:
 *           type: string
 *           description: The provider (e.g., Gmail, WhatsApp) (optional)
 *         purpose:
 *           type: string
 *           enum: [GENERAL, OFFICIAL_COMMUNICATIONS, MARKETING, ALERTS]
 *           description: The purpose of the contact
 *         verificationStatus:
 *           type: string
 *           enum: [VERIFIED, UNVERIFIED, INVALID]
 *           description: Verification status of the contact
 *         verificationDate:
 *           type: string
 *           format: date
 *           description: Date of verification (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     EmergencyContact:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - lastName
 *         - firstName
 *         - relationship
 *         - phonePrimary
 *         - priorityLevel
 *         - notificationProtocol
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the employee
 *         lastName:
 *           type: string
 *           description: Last name of the emergency contact
 *         firstName:
 *           type: string
 *           description: First name of the emergency contact
 *         relationship:
 *           type: string
 *           description: Relationship to the employee
 *         priorityLevel:
 *           type: number
 *           description: Priority level of the contact
 *         phonePrimary:
 *           type: string
 *           description: Primary phone number
 *         phoneSecondary:
 *           type: string
 *           description: Secondary phone number (optional)
 *         email:
 *           type: string
 *           format: email
 *           description: Email address (optional)
 *         addressId:
 *           type: string
 *           description: ID of the associated address (optional)
 *         notes:
 *           type: string
 *           description: Additional notes (optional)
 *         languagePreference:
 *           type: string
 *           description: Preferred language (optional)
 *         notificationProtocol:
 *           type: string
 *           enum: [CALL_ONLY, CALL_THEN_EMAIL, ALL_METHODS]
 *           description: Notification protocol
 *         lastVerificationDate:
 *           type: string
 *           format: date
 *           description: Date of last verification (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     ContactPreference:
 *       type: object
 *       required:
 *         - personalIdentityId
 *         - preferredContactMethod
 *         - preferredLanguage
 *       properties:
 *         personalIdentityId:
 *           type: string
 *           description: The ID of the employee
 *         preferredContactMethod:
 *           type: string
 *           enum: [EMAIL, PHONE, MAIL, MESSENGER, IN_PERSON]
 *           description: Preferred contact method
 *         preferredLanguage:
 *           type: string
 *           description: Preferred language
 *         preferredTimeStart:
 *           type: string
 *           format: date-time
 *           description: Preferred start time for contact (optional)
 *         preferredTimeEnd:
 *           type: string
 *           format: date-time
 *           description: Preferred end time for contact (optional)
 *         preferredDays:
 *           type: string
 *           description: Preferred days for contact (optional)
 *         optOutMarketing:
 *           type: boolean
 *           description: Whether to opt out of marketing communications
 *         optOutNonEssential:
 *           type: boolean
 *           description: Whether to opt out of non-essential communications
 *         communicationRestrictions:
 *           type: string
 *           description: Communication restrictions (optional)
 *         specialInstructions:
 *           type: string
 *           description: Special instructions (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     ValidationReport:
 *       type: object
 *       properties:
 *         hasValidAddress:
 *           type: boolean
 *           description: Whether a verified address exists
 *         hasValidPhone:
 *           type: boolean
 *           description: Whether a verified phone number exists
 *         hasValidEmail:
 *           type: boolean
 *           description: Whether a verified email exists
 *         hasEmergencyContact:
 *           type: boolean
 *           description: Whether an emergency contact exists
 *         hasPreferences:
 *           type: boolean
 *           description: Whether contact preferences exist
 *     VerificationResult:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the verification
 */

/**
 * @swagger
 * /api/employees/{employeeId}/addresses:
 *   post:
 *     summary: Create a new address for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/addresses', validationMiddleware(addressValidationSchema), PostalAddressController.createAddress);

/**
 * @swagger
 * /api/employees/{employeeId}/addresses/{addressId}:
 *   put:
 *     summary: Update an address
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: addressId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */
router.put('/employees/:employeeId/addresses/:addressId', validationMiddleware(addressValidationSchema), PostalAddressController.updateAddress);

/**
 * @swagger
 * /api/employees/{employeeId}/addresses:
 *   get:
 *     summary: Get all addresses for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
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
 *                     $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/employees/:employeeId/addresses', PostalAddressController.getAllAddresses);

/**
 * @swagger
 * /api/employees/{employeeId}/addresses/{addressId}:
 *   get:
 *     summary: Get an address by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: addressId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the address
 *     responses:
 *       200:
 *         description: Address retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Address'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */
router.get('/employees/:employeeId/addresses/:addressId', PostalAddressController.getAddressById);

/**
 * @swagger
 * /api/employees/{employeeId}/phones:
 *   post:
 *     summary: Create a new phone contact for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneContact'
 *     responses:
 *       201:
 *         description: Phone contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PhoneContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/phones', PhoneContactController.createPhoneContact);

/**
 * @swagger
 * /api/employees/{employeeId}/phones/{phoneId}:
 *   put:
 *     summary: Update a phone contact
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: phoneId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the phone contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneContact'
 *     responses:
 *       200:
 *         description: Phone contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/PhoneContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Phone contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/employees/:employeeId/phones/:phoneId', PhoneContactController.updatePhoneContact);
// router.get('/employees/:employeeId/phones', PhoneContactController.getPhonesByUserId);
/**
 * @swagger
 * /api/employees/{employeeId}/phones:
 *   get:
 *     summary: Get all phone contacts for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Phone contacts retrieved successfully
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
 *                     $ref: '#/components/schemas/PhoneContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/employees/:employeeId/phones', PhoneContactController.getAllPhoneContacts);

/**
 * @swagger
 * /api/employees/{employeeId}/electronic-contacts:
 *   post:
 *     summary: Create a new electronic contact for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ElectronicContact'
 *     responses:
 *       201:
 *         description: Electronic contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ElectronicContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/electronic-contacts', validationMiddleware(electronicValidationSchema), ElectronicContactController.createElectronicContact);

/**
 * @swagger
 * /api/employees/{employeeId}/electronic-contacts/{contactId}:
 *   put:
 *     summary: Update an electronic contact
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the electronic contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ElectronicContact'
 *     responses:
 *       200:
 *         description: Electronic contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ElectronicContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Electronic contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/employees/:employeeId/electronic-contacts/:contactId', validationMiddleware(electronicValidationSchema), ElectronicContactController.updateElectronicContact);
router.get('/employees/electronic-contacts/', ElectronicContactController.getAll);
router.get('/employees/:employeeId/electronic-contacts/', ElectronicContactController.getByUserId);


/**
 * @swagger
 * /api/employees/{employeeId}/emergency-contacts:
 *   post:
 *     summary: Create a new emergency contact for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmergencyContact'
 *     responses:
 *       201:
 *         description: Emergency contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/EmergencyContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/emergency-contacts', validationMiddleware(emergencyValidationSchema), EmergencyContactController.createEmergencyContact);

/**
 * @swagger
 * /api/employees/{employeeId}/emergency-contacts/{contactId}:
 *   put:
 *     summary: Update an emergency contact
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the emergency contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmergencyContact'
 *     responses:
 *       200:
 *         description: Emergency contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/EmergencyContact'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Emergency contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/employees/:employeeId/emergency-contacts/:contactId', validationMiddleware(emergencyValidationSchema), EmergencyContactController.updateEmergencyContact);

/**
 * @swagger
 * /api/employees/{employeeId}/contact-preferences:
 *   post:
 *     summary: Update contact preferences for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactPreference'
 *     responses:
 *       200:
 *         description: Contact preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ContactPreference'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/contact-preferences', validationMiddleware(preferenceValidationSchema), ContactPreferenceController.updateContactPreferences);

/**
 * @swagger
 * /api/employees/{employeeId}/contact-preferences:
 *   get:
 *     summary: Get contact preferences for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Contact preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ContactPreference'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact preferences not found
 *       500:
 *         description: Internal server error
 */
router.get('/employees/:employeeId/contact-preferences', ContactPreferenceController.getContactPreferences);

/**
 * @swagger
 * /api/employees/{employeeId}/contacts/validate:
 *   post:
 *     summary: Validate contact information for an employee
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *     responses:
 *       200:
 *         description: Contact information validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ValidationReport'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/contacts/validate', ContactValidationController.validateContactInformation);

/**
 * @swagger
 * /api/employees/{employeeId}/contacts/{contactType}/{contactId}/verify:
 *   post:
 *     summary: Initiate contact verification
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee
 *       - in: path
 *         name: contactType
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of contact (e.g., address, phone, email)
 *       - in: path
 *         name: contactId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contact
 *     responses:
 *       200:
 *         description: Verification initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/VerificationResult'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.post('/employees/:employeeId/contacts/:contactType/:contactId/verify', ContactValidationController.initiateContactVerification);

/**
 * @swagger
 * /api/verifications/{verificationId}:
 *   put:
 *     summary: Record verification result
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: verificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [VERIFIED, UNVERIFIED, INVALID]
 *                 description: The verification status
 *     responses:
 *       200:
 *         description: Verification result recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/VerificationResult'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Verification not found
 *       500:
 *         description: Internal server error
 */
router.put('/verifications/:verificationId', validationMiddleware(verificationValidationSchema), ContactValidationController.recordVerificationResult);

export default router;