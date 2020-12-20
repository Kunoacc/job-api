export interface Flags {
  benefits: boolean;
  canary: boolean;
  enlauSource: boolean;
  fake: boolean;
  featureDiscovery: boolean;
  getSignaledBenefitsViewed: boolean;
  firstSignalSent: boolean;
  promoteYourselfBenefitsViewed: boolean;
  promoteYourselfCompleted: boolean;
  importingLinkedin: boolean;
  onBoarded: boolean;
  remoter: boolean;
  signalsFeatureDiscovery: boolean;
  signedInToOpportunities: boolean;
  importingLinkedinRecommendations: boolean;
  contactsImported: boolean;
  appContactsImported: boolean;
  genomeCompletionAcknowledged: boolean;
}

export interface Link {
  id: string;
  name: string;
  address: string;
}

export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  timezoneOffSet: number;
}

export interface Person {
  professionalHeadline: string;
  completion: number;
  showPhone: boolean;
  created: Date;
  verified: boolean;
  flags: Flags;
  weight: number;
  locale: string;
  subjectId: number;
  picture: string;
  hasEmail: boolean;
  phone: string;
  name: string;
  links: Link[];
  location: Location;
  theme: string;
  id: string;
  pictureThumbnail: string;
  claimant: boolean;
  summaryOfBio: string;
  weightGraph: string;
  publicId: string;
}

export interface Stats {
  jobs: number;
  education: number;
  strengths: number;
  interests: number;
}

export interface Strength {
  id: string;
  code: number;
  name: string;
  weight: number;
  recommendations: number;
  media: any[];
  created: Date;
  additionalInfo: string;
}

export interface Interest {
  id: string;
  code: number;
  name: string;
  media: any[];
  created: Date;
  additionalInfo: string;
}

export interface Organization {
  id: number;
  name: string;
  picture: string;
}

export interface MediaItem {
  id: string;
  address: string;
}

export interface Medium {
  group: string;
  mediaType: string;
  description: string;
  mediaItems: MediaItem[];
}

export interface Experience {
  id: string;
  category: string;
  name: string;
  organizations: Organization[];
  responsibilities: any[];
  fromMonth: string;
  fromYear: string;
  remote: boolean;
  additionalInfo: string;
  highlighted: boolean;
  weight: number;
  verifications: number;
  recommendations: number;
  media: Medium[];
  rank: number;
  toMonth: string;
  toYear: string;
}

export interface Organization2 {
  id: number;
  name: string;
  picture: string;
}

export interface MediaItem2 {
  id: string;
  address: string;
}

export interface Medium2 {
  group: string;
  mediaType: string;
  description: string;
  mediaItems: MediaItem2[];
}

export interface Job {
  id: string;
  category: string;
  name: string;
  organizations: Organization2[];
  responsibilities: any[];
  fromMonth: string;
  fromYear: string;
  remote: boolean;
  additionalInfo: string;
  highlighted: boolean;
  weight: number;
  verifications: number;
  recommendations: number;
  media: Medium2[];
  rank: number;
  toMonth: string;
  toYear: string;
}

export interface Organization3 {
  id: number;
  name: string;
  picture: string;
}

export interface Education {
  id: string;
  category: string;
  name: string;
  organizations: Organization3[];
  responsibilities: any[];
  fromMonth: string;
  fromYear: string;
  remote: boolean;
  additionalInfo: string;
  highlighted: boolean;
  weight: number;
  verifications: number;
  recommendations: number;
  media: any[];
  rank: number;
}

export interface Opportunity {
  id: string;
  interest: string;
  field: string;
  data: any;
}

export interface Language {
  code: string;
  language: string;
  fluency: string;
}

export interface Group {
  id: string;
  order: number;
  median: number;
  stddev: number;
}

export interface Analysis {
  groupId: string;
  analysis: number;
}

export interface PersonalityTraitsResults {
  groups: Group[];
  analyses: Analysis[];
}

export interface Group2 {
  id: string;
  text: string;
  answer: string;
  order: number;
}

export interface Analysis2 {
  groupId: string;
  section: string;
  analysis: number;
}

export interface ProfessionalCultureGenomeResults {
  groups: Group2[];
  analyses: Analysis2[];
}

export interface PersonApiResponse {
  person: Person;
  stats: Stats;
  strengths: Strength[];
  interests: Interest[];
  experiences: Experience[];
  awards: any[];
  jobs: Job[];
  projects: any[];
  publications: any[];
  education: Education[];
  opportunities: Opportunity[];
  languages: Language[];
  personalityTraitsResults: PersonalityTraitsResults;
  professionalCultureGenomeResults: ProfessionalCultureGenomeResults;
}