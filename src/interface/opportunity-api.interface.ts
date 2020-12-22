export interface Attachment {
    resource: string;
    address: string;
    path: string;
    caption: string;
}

export interface PrefilledStatus {
    status: string;
}

export interface Stats {
    finishedApplications: number;
}

export interface Person {
    id: string;
    username: string;
    name: string;
    hasEmail: boolean;
    professionalHeadline: string;
    picture: string;
    pictureThumbnail: string;
    hasBio: boolean;
    bioCompletion: number;
    weight: number;
    verified: boolean;
    subjectId: number;
}

export interface Member {
    id: string;
    person: Person;
    manager: boolean;
    poster: boolean;
    member: boolean;
    status: string;
    visible: boolean;
    screeningQuestionsTipClosed: boolean;
}

export interface Detail {
    code: string;
    content: string;
}

export interface Place {
    remote: boolean;
    anywhere: boolean;
    timezone: boolean;
    location: any[];
}

export interface Identifier {
    [`@type`]: string;
    name: string;
    value: string;
}

export interface HiringOrganization {
    [`@type`]: string;
    name: string;
    logo: string;
}

export interface ApplicantLocationRequirement {
    [`@type`]: string;
    name: string;
}

export interface Value {
    [`@type`]: string;
    minValue: number;
    maxValue: number;
    unitText: string;
}

export interface BaseSalary {
    [`@type`]: string;
    currency: string;
    value: Value;
}

export interface SerpTags {
    [`@context`]: string;
    [`@type`]: string;
    title: string;
    description: string;
    identifier: Identifier;
    datePosted: Date;
    employmentType: string[];
    validThrough: Date;
    hiringOrganization: HiringOrganization;
    jobLocationType: string;
    applicantLocationRequirements: ApplicantLocationRequirement[];
    baseSalary: BaseSalary;
}

export interface Owner {
    id: string;
    username: string;
    name: string;
    hasEmail: boolean;
    professionalHeadline: string;
    picture: string;
    pictureThumbnail: string;
    hasBio: boolean;
    bioCompletion: number;
    weight: number;
    verified: boolean;
    subjectId: number;
}

export interface Agreement {
    type: string;
    currencyTaxes: string;
}

export interface Language2 {
    code: string;
    name: string;
}

export interface Language {
    language: Language2;
    fluency: string;
}

export interface Commitment {
    code: string;
    hours: number;
}

export interface Strength {
    id: string;
    code: number;
    name: string;
    experience: string;
}

export interface Organization {
    id: number;
    name: string;
    size: number;
    picture: string;
}

export interface Compensation {
    code: string;
    currency: string;
    estimate: boolean;
    minAmount: number;
    maxAmount: number;
    periodicity: string;
    visible: boolean;
}

export interface OpportunityApiResponse {
    attachments: Attachment[];
    boardVersion: number;
    prefilledStatus: PrefilledStatus;
    locale: string;
    objective: string;
    stats: Stats;
    review: string;
    draft?: any;
    members: Member[];
    details: Detail[];
    id: string;
    place: Place;
    deadline: Date;
    slug: string;
    serpTags: SerpTags;
    owner: Owner;
    completion: number;
    agreement: Agreement;
    languages: Language[];
    created: Date;
    crawled: boolean;
    opportunity: string;
    active: boolean;
    commitment: Commitment;
    stableOn: Date;
    timezones: string[];
    strengths: Strength[];
    organizations: Organization[];
    compensation: Compensation;
    openGraph: string;
    status: string;
}

