export interface Aggregators {
}

export interface Context {
    signaled?: any;
}

export interface Criteria {
    names: string[];
}

export interface Person {
    name: string;
}

export interface Input {
    criteria: Criteria;
    person: Person;
}

export interface Compensations {
  amount: number;
  currency: string;
  periodicity: string;
}

export interface Skill {
    name: string;
    weight: number;
}

export interface Result {
    context: Context;
    _meta: any;
    compensations: Record<string, Compensations>;
    locationName: string;
    name: string;
    openTo: string[];
    picture: string;
    professionalHeadline: string;
    remoter: boolean;
    skills: Skill[];
    subjectId: string;
    username: string;
    verified: boolean;
    weight: number;
}

export interface PersonSearchApiResponse {
    aggregators: Aggregators;
    offset: number;
    results: Result[] | [];
    size: number;
    total: number;
}

