export type Language = 'en' | 'ur' | 'roman';

export type ServiceCategoryId = 
  | 'ac_technician'
  | 'electrician'
  | 'plumber'
  | 'carpenter'
  | 'cleaner'
  | 'appliance_repair';

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: {
    en: string;
    ur: string;
    roman: string;
  };
  description: {
    en: string;
    ur: string;
    roman: string;
  };
  iconName: string;
  startingPricePKR: number;
  activeProsCount: number;
  popularTasks: {
    en: string[];
    ur: string[];
    roman: string[];
  };
}

export interface Provider {
  id: string;
  name: string;
  title: {
    en: string;
    ur: string;
    roman: string;
  };
  category: ServiceCategoryId;
  avatar: string;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  hourlyRatePKR: number;
  calloutFeePKR: number;
  responseTimeMins: number;
  yearsExperience: number;
  area: string;
  serviceAreas: string[];
  cnicVerified: boolean;
  tradeVerified: boolean;
  policeCleared: boolean;
  phone: string;
  bio: {
    en: string;
    ur: string;
    roman: string;
  };
  skills: string[];
  isAvailableNow: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Review {
  id: string;
  providerId: string;
  authorName: string;
  rating: number;
  date: string;
  location: string;
  comment: {
    en: string;
    ur: string;
    roman: string;
  };
  serviceCategory: ServiceCategoryId;
  verifiedBooking: boolean;
}

export type BookingStatus = 
  | 'requested'
  | 'accepted'
  | 'technician_assigned'
  | 'in_transit'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId?: string;
  providerName?: string;
  providerAvatar?: string;
  category: ServiceCategoryId;
  issueDescription: string;
  urgency: 'emergency' | 'today' | 'scheduled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  area: string;
  addressDetail: string;
  landmark: string;
  status: BookingStatus;
  estimatedCostPKR: {
    min: number;
    max: number;
  };
  finalCostPKR?: number;
  paymentMethod: 'cash_on_completion' | 'easypaisa' | 'jazzcash';
  createdAt: string;
  statusUpdates: {
    status: BookingStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface AIAnalysisResult {
  category: ServiceCategoryId;
  issueSummary: string;
  urgency: 'emergency' | 'today' | 'scheduled';
  estimatedCostPKR: {
    min: number;
    max: number;
  };
  diagnosticPoints: string[];
  locationIdentified: string;
  matchedProviderIds: string[];
}
