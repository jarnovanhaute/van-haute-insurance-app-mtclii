
export interface Insurance {
  id: string;
  type: 'car' | 'home' | 'health' | 'life' | 'travel';
  provider: string;
  policyNumber: string;
  premium: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AccidentReport {
  id: string;
  date: string;
  type: 'car' | 'home' | 'other';
  description: string;
  photos: string[];
  status: 'submitted' | 'processing' | 'completed';
  insuranceId?: string;
}
