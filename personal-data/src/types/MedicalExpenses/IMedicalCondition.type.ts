import { Types } from 'mongoose';

export interface IMedicalCondition {
  employeeid: Types.ObjectId;
  conditionname: string;
  startdate: Date;
  enddate?: Date;
  disabilityreason: 'Maladie chronique' | 'Accident de travail' | 'Handicap de naissance' | 'Autre';
  severity: 'Légère' | 'Modérée' | 'Sévère';
  requiredfollowup?: boolean;
  disabilityrate?: number;
  disabilitystatus: 'Temporaire' | 'Permanente' | 'En évaluation';
  comments?: string;
  accommodationsmade?: string[];
  limitationsandaccommodationsrequired?: string;
  createdat?: Date;
  updatedat?: Date;
}
