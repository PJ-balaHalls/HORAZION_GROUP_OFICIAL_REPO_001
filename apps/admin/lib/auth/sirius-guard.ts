/**
 * [CORE-HZ-ADMIN] Validação de Governança
 * Baseado no PADRAO ARQUITETURA.pdf e SIDEBAR ADMIN.pdf
 */
export const HrzGroups = { SIRIUS: "Sirius", CANOPUS: "Canopus", ALPHA: "Alpha" } as const;
export const HrzLevels = { OMEGA: 3, SIGMA: 2, ALPHA: 1 } as const;

export interface SiriusUser {
  id: string;
  celestial_group: string;
  access_level: keyof typeof HrzLevels;
  constellations: string[];
}

export function validateSiriusSession(user: SiriusUser, requiredLevel: keyof typeof HrzLevels = "SIGMA") {
  // 1. Grupo Sirius é pré-requisito para o Admin
  if (user.celestial_group !== HrzGroups.SIRIUS) return false;

  // 2. Hierarquia de Nível (Omega > Sigma > Alpha)
  if (HrzLevels[user.access_level] < HrzLevels[requiredLevel]) return false;

  return true;
}