import { Interest, Person } from "@prisma/client";
import { PeopleComparisonData } from "src/interface/compare-api.interface";
import { Education, Job, Strength } from "src/interface/person-api.interface";

export class CreatePersonComparison implements PeopleComparisonData {
  employmentDuration?: string;
  numberOfOpportunities?: string;
  topFiveSkills?: Strength[];
  topFiveInterests?: Interest[];
  longestExperience?: Job;
  mostRecentEducation?: Education;
  confidenceScore?: number;
  skillsBreakdown?: string;
  id: number;
  name: string;
  phone: string;
  picture: string;
  headline: string;
  username: string;
  links: string;
  bio: string;
  profileWeight: number;
  location: string;
  timezone: string;
  isVerified: boolean;
  fullyFetched: boolean;
  generatedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  preferredJobCompensationCurrency: string;
  preferredJobCompensationAmount: number;
  preferredJobCompensationCycle: string;
  preferredGigCompensationCurrency: string;
  preferredGigCompensationAmount: number;
  preferredGigCompensationCycle: string;
  isOpenToInterships: boolean;
  isOpenToMentoring: boolean;
  isOpenToGigs: boolean;
  isOpenToJobs: boolean;
  

  constructor (data: Person) {
    const self = this
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        self[key] = element
      }
    }
  }

  static generateFromApi(data: Person) {
    return new CreatePersonComparison(data)
  }
}