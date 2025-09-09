import axios from 'axios';
import { Mission, Comment, Review, Submission, MissionUpdate, NewMissionSubmission, NewComment, NewReview, NewRating, MissionCompletion, Completion, AdminSession } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin token management
let adminToken: string | null = localStorage.getItem('adminToken');

export const setAdminToken = (token: string) => {
  adminToken = token;
  localStorage.setItem('adminToken', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAdminToken = () => {
  adminToken = null;
  localStorage.removeItem('adminToken');
  delete api.defaults.headers.common['Authorization'];
};

// Set token if exists
if (adminToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
}

// Mission API
export const missionsApi = {
  getAll: (params?: { category?: string; difficulty?: number; sort?: string }) => 
    api.get<{ missions: Mission[] }>('/missions', { params }),
  
  getById: (id: number) => 
    api.get<{ mission: Mission }>(`/missions/${id}`),
  
  create: (mission: Partial<Mission>) => 
    api.post<{ mission: Mission }>('/missions', mission),
  
  update: (id: number, mission: Partial<Mission>) => 
    api.put<{ mission: Mission }>(`/missions/${id}`, mission),
  
  delete: (id: number) => 
    api.delete(`/missions/${id}`),
};

// Comments API
export const commentsApi = {
  getForMission: (missionId: number) => 
    api.get<{ comments: Comment[] }>(`/missions/${missionId}/comments`),
  
  add: (missionId: number, comment: NewComment) => 
    api.post(`/missions/${missionId}/comments`, comment),
};

// Reviews API
export const reviewsApi = {
  getForMission: (missionId: number) => 
    api.get<{ reviews: Review[] }>(`/missions/${missionId}/reviews`),
  
  add: (missionId: number, review: NewReview) => 
    api.post(`/missions/${missionId}/reviews`, review),
};

// Ratings API (thumbs up/down)
export const ratingsApi = {
  add: (missionId: number, rating: NewRating) => 
    api.post(`/missions/${missionId}/rating`, rating),
  
  getUserRating: (missionId: number, pilotName: string) => 
    api.get<{ rating: string | null }>(`/missions/${missionId}/rating/${pilotName}`),
};

// Mission completion API
export const completionApi = {
  getForMission: (missionId: number) => 
    api.get<{ completions: Completion[] }>(`/missions/${missionId}/completed`),
  
  markCompleted: (missionId: number, completion: MissionCompletion) => 
    api.post(`/missions/${missionId}/completed`, completion),
};

// Submissions API
export const submissionsApi = {
  getAll: () => 
    api.get<{ submissions: Submission[] }>('/submissions'),
  
  create: (submission: NewMissionSubmission) => 
    api.post('/submissions', submission),
  
  approve: (id: number) => 
    api.put(`/submissions/${id}/approve`),
  
  reject: (id: number) => 
    api.put(`/submissions/${id}/reject`),
};

// Mission Updates API
export const updatesApi = {
  getAll: () => 
    api.get<{ updates: MissionUpdate[] }>('/updates'),
  
  approve: (id: number) => 
    api.put(`/updates/${id}/approve`),
  
  reject: (id: number) => 
    api.put(`/updates/${id}/reject`),
};

// Admin API
export const adminApi = {
  login: (credentials: { admin_name: string; password: string }) => 
    api.post<AdminSession>('/admin/login', credentials),
};

export const isAdmin = () => !!adminToken;

export default api;
