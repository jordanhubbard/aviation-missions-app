export interface Mission {
  id: number;
  title: string;
  category: string;
  difficulty: number;
  objective: string;
  mission_description: string;
  why_description: string;
  notes?: string;
  route?: string;
  comment_count: number;
  completion_count: number;
  thumbs_up: number;
  thumbs_down: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  mission_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export interface Review {
  id: number;
  mission_id: number;
  pilot_name: string;
  review_text?: string;
  flight_date?: string;
  created_at: string;
}

export interface Rating {
  rating: 'up' | 'down';
}

export interface Submission {
  id: number;
  title: string;
  category: string;
  difficulty: number;
  objective: string;
  mission_description: string;
  why_description: string;
  notes?: string;
  route?: string;
  submitter_name: string;
  submitter_email?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface MissionUpdate {
  id: number;
  mission_id: number;
  title: string;
  category: string;
  difficulty: number;
  objective: string;
  mission_description: string;
  why_description: string;
  notes?: string;
  route?: string;
  submitter_name: string;
  submitter_email?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  original_title: string;
  created_at: string;
  reviewed_at?: string;
}

export interface AdminSession {
  token: string;
  admin_name: string;
}

export interface NewMissionSubmission {
  title: string;
  category: string;
  difficulty: number;
  objective: string;
  mission_description: string;
  why_description: string;
  notes?: string;
  route?: string;
  submitter_name: string;
  submitter_email?: string;
}

export interface NewComment {
  author_name: string;
  content: string;
}

export interface NewReview {
  pilot_name: string;
  review_text?: string;
  flight_date?: string;
}

export interface NewRating {
  pilot_name: string;
  rating: 'up' | 'down';
}

export interface MissionCompletion {
  pilot_name: string;
  completion_date: string;
  notes?: string;
}
