
import { Insurance, User } from '../types/Insurance';

export const mockUser: User = {
  id: '1',
  name: 'Jan Janssen',
  email: 'jan.janssen@email.com',
  phone: '+32 123 456 789',
};

export const mockInsurances: Insurance[] = [
  {
    id: '1',
    type: 'car',
    provider: 'Groep Van Haute',
    policyNumber: 'CAR-2024-001',
    premium: 850,
    expiryDate: '2024-12-31',
    status: 'active',
    description: 'Volledige dekking - BMW X3',
  },
  {
    id: '2',
    type: 'home',
    provider: 'Groep Van Haute',
    policyNumber: 'HOME-2024-002',
    premium: 1200,
    expiryDate: '2024-11-15',
    status: 'active',
    description: 'Woonhuis - Gent centrum',
  },
  {
    id: '3',
    type: 'health',
    provider: 'Groep Van Haute',
    policyNumber: 'HEALTH-2024-003',
    premium: 2400,
    expiryDate: '2024-12-31',
    status: 'active',
    description: 'Gezinsverzekering',
  },
  {
    id: '4',
    type: 'life',
    provider: 'Groep Van Haute',
    policyNumber: 'LIFE-2024-004',
    premium: 1800,
    expiryDate: '2025-03-20',
    status: 'active',
    description: 'Levensverzekering',
  },
];
