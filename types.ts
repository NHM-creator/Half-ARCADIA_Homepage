export type RoleType = 'TANK' | 'DEALER' | 'SUPPORT';

export type NationType = 'EAST' | 'WEST' | 'SOUTH';

export interface ClassStats {
  attack: number;
  defense: number;
  support: number;
  mobility: number;
  difficulty: number;
}

export interface ClassData {
  id: string;
  name: string;
  role: RoleType;
  nation: NationType;
  tagline: string;
  weapon: string;
  description: string;
  stats: ClassStats;
  imageUrls: string[];
}

export interface FeatureData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  imageUrl: string;
  hoverImageUrl?: string;
}