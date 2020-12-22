import { Experience, Interest, Person, Skills } from "@prisma/client";
import { Education, Strength } from "./person-api.interface";

export interface ComparePeople {
  preferredIndex: string | unknown;
  compared: Record<string, PeopleComparisonData>;
}

export interface PeopleComparisonData extends Person {
  employmentDuration?: string;
  confidenceScore?: number;
  numberOfOpportunities?: string;
  topFiveSkills?: Strength[];
  skillsBreakdown?: string;
  topFiveInterests?: Interest[];
  longestExperience?: Experience;
  mostRecentEducation?: Education;
}