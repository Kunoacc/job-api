import { Skills, Interest, Experience, Person } from "@prisma/client";
import { PeopleComparisonData } from "src/interface/compare-api.interface";
import { Education, Strength } from "src/interface/person-api.interface";

export class CreatePersonComparison implements PeopleComparisonData {
  employmentDuration?: string;
  numberOfOpportunities?: string;
  topFiveSkills?: Strength[];
  topFiveInterests?: Interest[];
  longestExperience?: Experience;
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
    Object.keys(this).forEach(key => this[key] = data?.[key])
  }

  static generateFromApi(data: Person) {
    return new CreatePersonComparison(data)
  }
}