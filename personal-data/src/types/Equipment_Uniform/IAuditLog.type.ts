export interface IAuditLog {
  logId: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  timestamp: Date;
  details: {
    previousValues: any;
    newValues: any;
  };
  ipAddress: string;
  userAgent: string;
  sessionId: string;
}
