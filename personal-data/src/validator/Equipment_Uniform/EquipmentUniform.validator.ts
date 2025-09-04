import Joi from 'joi';


export const equipmentTypeValidator = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  subcategory: Joi.string().required(),
  description: Joi.string(),
  serialNumber: Joi.string(),
  specifications: Joi.object({
    brand: Joi.string(),
    model: Joi.string(),
    warranty: Joi.string()
  }),
  requiresSerial: Joi.boolean(),
  trackLocation: Joi.boolean(),
  isUniform: Joi.boolean(),
  defaultValue: Joi.number(),
  maintenanceSchedule: Joi.object({
    frequency: Joi.string(),
    reminderDays: Joi.number()
  }),
  status: Joi.string().default('ACTIVE')
});

export const equipmentInventoryValidator = Joi.object({
  equipmentTypeId: Joi.string().required(),
  serialNumber: Joi.string(),
  assetTag: Joi.string(),
  purchaseInfo: Joi.object({
    purchaseDate: Joi.date(),
    vendor: Joi.string(),
    purchasePrice: Joi.number(),
    warranty: Joi.object({
      startDate: Joi.date(),
      endDate: Joi.date(),
      type: Joi.string().valid('MANUFACTURER', 'EXTENDED', 'NONE').required(),    })
  }),
  currentStatus: Joi.string(),
  condition: Joi.string(),
  location: Joi.object({
    building: Joi.string(),
    floor: Joi.string(),
    room: Joi.string(),
    coordinates: Joi.object({
      latitude: Joi.number(),
      longitude: Joi.number()
    })
  })
});

export const equipmentAssignmentValidator = Joi.object({
  employeeId: Joi.string().required(),
  inventoryId: Joi.string().required(),
  equipmentTypeId: Joi.string().required(),
  assignmentDetails: Joi.object({
    assignedDate: Joi.date().required(),
    assignedBy: Joi.string().required(),
    expectedReturnDate: Joi.date().required(),
    purpose: Joi.string().required(),
    location: Joi.object({
type: Joi.string().valid('OFFICE', 'WAREHOUSE', 'REMOTE').required(),
      building: Joi.string(),
      floor: Joi.string(),
      desk: Joi.string()
    })
  }),
  currentStatus: Joi.string().required(),
  statusHistory: Joi.array().items(Joi.object({
    status: Joi.string(),
    date: Joi.date(),
    changedBy: Joi.string(),
    reason: Joi.string(),
    location: Joi.object({
      building: Joi.string(),
      floor: Joi.string(),
      desk: Joi.string()
    })
  })),
  conditions: Joi.object({
    initialCondition: Joi.string(),
    currentCondition: Joi.string(),
    lastInspection: Joi.date(),
    inspectedBy: Joi.string()
  })
});


export const uniformAssignmentValidator = Joi.object({
  employeeId: Joi.string().required(),
  uniformInventoryId: Joi.string().required(),
  uniformDetails: Joi.object({
    items: Joi.array().items(
      Joi.object({
        itemId: Joi.string().required(),
        type: Joi.string().required(),
        size: Joi.string().required(),
        color: Joi.string().optional(),
        quantity: Joi.number().required(),
        customization: Joi.object({
          embroidery: Joi.string(),
          logo: Joi.string(),
          position: Joi.string()
        }).optional()
      })
    ).required(),
    totalValue: Joi.number().required()
  }).required(),

  assignmentDetails: Joi.object({
    assignedDate: Joi.date().required(),
    assignedBy: Joi.string().required(),
    renewalSchedule: Joi.object({
      frequency: Joi.string().valid('ANNUAL', 'SEMI_ANNUAL', 'QUARTERLY').optional(),
      nextRenewal: Joi.date().optional()
    }).optional()
  }).required(),

  currentStatus: Joi.string().valid('ASSIGNED', 'RETURNED', 'CANCELLED').required(),

  statusHistory: Joi.array().items(
    Joi.object({
      status: Joi.string(),
      date: Joi.date(),
      changedBy: Joi.string(),
      reason: Joi.string()
    })
  ).optional()
});



export const equipmentMaintenanceValidator = Joi.object({
  inventoryId: Joi.string().required(),
  assignmentId: Joi.string().required(),
  maintenanceType: Joi.string().required(),
  scheduledDate: Joi.date(),
  actualDate: Joi.date(),
  maintenanceDetails: Joi.object({
    description: Joi.string(),
    technician: Joi.string(),
    duration: Joi.number(),
    cost: Joi.number(),
    partsReplaced: Joi.array().items(Joi.object({
      partName: Joi.string(),
      partNumber: Joi.string(),
      cost: Joi.number()
    }))
  }),
  status: Joi.string().required()
});

export const equipmentReturnValidator = Joi.object({
  assignmentId: Joi.string().required(),
  employeeId: Joi.string().required(),
  returnDetails: Joi.object({
    initiatedDate: Joi.date(),
    initiatedBy: Joi.string(),
    reason: Joi.string(),
    expectedReturnDate: Joi.date(),
    actualReturnDate: Joi.date()
  }),
  inspection: Joi.object({
    inspectedBy: Joi.string(),
    inspectionDate: Joi.date(),
    condition: Joi.string(),
    damages: Joi.array().items(Joi.string()),
    cleaningRequired: Joi.boolean(),
    repairRequired: Joi.boolean(),
    notes: Joi.string()
  }),
  processing: Joi.object({
    cleaned: Joi.boolean(),
    cleanedBy: Joi.string(),
    cleanedDate: Joi.date(),
    tested: Joi.boolean(),
    testedBy: Joi.string(),
    testedDate: Joi.date(),
    readyForReassignment: Joi.boolean()
  }),
  currentStatus: Joi.string(),
  statusHistory: Joi.array().items(Joi.object({
    status: Joi.string(),
    date: Joi.date(),
    changedBy: Joi.string()
  }))
});

export const auditLogValidator = Joi.object({
  entityType: Joi.string().required(),
  entityId: Joi.string().required(),
  action: Joi.string().required(),
  performedBy: Joi.string().required(),
  timestamp: Joi.date().required(),
  details: Joi.object({
    previousValues: Joi.any(),
    newValues: Joi.any()
  }).required(),
  ipAddress: Joi.string().required(),
  userAgent: Joi.string(),
  sessionId: Joi.string()
});






export const uniformTypeValidator = Joi.object({
  name: Joi.string()
    .valid('SHIRT', 'PANTS', 'JACKET', 'OTHER')
    .required(),
    
  availableSizes: Joi.array()
    .items(Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL'))
    .min(1)
    .required(),
    
  availableColors: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
    
  defaultCustomizationOptions: Joi.object({
    embroidery: Joi.boolean(),
    logo: Joi.boolean(),
    positions: Joi.array()
      .items(Joi.string().valid('LEFT_CHEST', 'RIGHT_CHEST', 'BACK', 'NONE')),
  }).optional(),
  
  basePrice: Joi.number().min(0).required(),
});


export const uniformInventoryValidator = Joi.object({
  uniformTypeId: Joi.string().required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
  quantityInStock: Joi.number().integer().min(0).required(),
  location: Joi.string().optional(),
});



export const uniformReturnValidator = Joi.object({
  assignmentId: Joi.string().required(),
    uniformInventoryId: Joi.string().required(),

  returnedBy: Joi.string().required(),
  returnDate: Joi.date().optional(),
  notes: Joi.string().optional(),
  returnedItems: Joi.array()
    .items(
      Joi.object({
        inventoryId: Joi.string().required(),
        size: Joi.string().required(),
        color: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        condition: Joi.string().valid('GOOD', 'DAMAGED', 'LOST').required(),
      })
    )
    .min(1)
    .required(),
});

