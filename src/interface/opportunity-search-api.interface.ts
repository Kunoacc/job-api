export interface Aggregators {
}

export interface Organization {
    id: number;
    name: string;
    picture: string;
}

export interface Data {
    code: string;
    currency: string;
    minAmount: number;
    maxAmount: number;
    periodicity: string;
}

export interface Compensation {
    data: Data;
    visible: boolean;
}

export interface Skill {
    name: string;
    experience: string;
}

export interface Member {
    subjectId: string;
    name: string;
    username: string;
    professionalHeadline: string;
    picture: string;
    member: boolean;
    manager: boolean;
    poster: boolean;
    weight: number;
}

export interface Question {
    id: string;
    text: string;
    date: Date;
}

export interface Context {
    signaled: any[];
}

export interface Opportunity {
    completion: number;
}

export interface Input {
    criteria?: any;
    opportunity: Opportunity;
}

export interface And {
    [`@type`]: string;
    id: string;
    input: Input;
    score: number;
}

export interface Scorer {
    [`@type`]: string;
    score: number;
    and: And[];
}

export interface Meta {
    rank: number;
    scorer: Scorer;
    filter?: any;
    boosters: string[];
}

export interface Result {
    id: string;
    objective: string;
    type: string;
    organizations: Organization[];
    locations: string[];
    remote: boolean;
    external: boolean;
    deadline?: Date;
    status: string;
    compensation: Compensation;
    skills: Skill[];
    members: Member[];
    questions: Question[];
    context: Context;
    _meta: Meta;
}

export interface RootObject {
    aggregators: Aggregators;
    offset: number;
    results: Result[];
    size: number;
    total: number;
}

