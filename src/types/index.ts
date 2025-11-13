export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  waterDrops: number;
  level: number;
  joinedAt: Date;
  garden: Tree[];
  role: 'user' | 'admin';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  reward: number;
  completed: boolean;
  timeEstimate: string;
}

export interface Tree {
  id: string;
  name: string;
  category: string;
  growthStage: 'seed' | 'sprout' | 'sapling' | 'tree' | 'giant';
  plantedAt: Date;
  waterDropsInvested: number;
}

export interface LeaderboardEntry {
  user: User;
  totalDrops: number;
  treesGrown: number;
  rank: number;
  weeklyGrowth: number;
}

export interface CommunityPost {
  id: string;
  user: User;
  content: string;
  achievement?: string;
  likes: number;
  comments: number;
  createdAt: Date;
}