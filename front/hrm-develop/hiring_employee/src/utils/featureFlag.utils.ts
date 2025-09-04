import { featureFlagService } from "../service/featureFlag.service";

export const isFeatureEnabled = async (
  flagName: string,
  userId?: string,
  tenantId?: string
): Promise<boolean> => {
  return featureFlagService.getFlag(flagName, userId, tenantId);
};