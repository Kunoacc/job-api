import { Prisma } from "@prisma/client";
import { PersonApiResponse } from "src/interface/person-api.interface";

export class CreatePerson implements Prisma.PersonCreateInput {

  name: string;
  phone?: string;
  picture: string;
  headline?: string;
  username: string;
  links?: string;
  bio?: string;
  profileWeight?: number;
  location?: string;
  timezone?: string;
  isVerified: boolean;
  fullyFetched?: boolean;
  generatedAt?: string | Date;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  preferredJobCompensationCurrency?: string;
  preferredJobCompensationAmount?: number;
  preferredJobCompensationCycle?: string;
  preferredGigCompensationCurrency?: string;
  preferredGigCompensationAmount?: number;
  preferredGigCompensationCycle?: string;
  isOpenToInterships?: boolean;
  isOpenToMentoring?: boolean;
  isOpenToGigs?: boolean;
  isOpenToJobs?: boolean;
  skills?: Prisma.SkillsCreateManyWithoutPersonInput;
  experiences?: Prisma.ExperienceCreateManyWithoutPersonInput;
  interests?: Prisma.InterestCreateManyWithoutPersonInput;
  companies?: Prisma.CompanyCreateManyWithoutPeopleInput;
  Opportunity?: Prisma.OpportunityCreateManyWithoutPosterInput;

  constructor (data: PersonApiResponse) {
    this.name = data.person.name
    this.phone = data.person?.phone
    this.picture = data.person?.picture
    this.headline = data.person?.professionalHeadline
    this.username = data.person.publicId
    this.links = JSON.stringify(data.person.links)
    this.bio = data.person?.summaryOfBio
    this.profileWeight = data.person.weight
    this.location = data.person?.location.name
    this.timezone = data.person?.location.timezone
    this.isVerified = data.person.verified
    this.createdAt = new Date(data?.person?.created as unknown as string || Date.now())
    this.preferredGigCompensationAmount = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-amount' && opportunity.interest === 'gigs')?.[0]?.data
    this.preferredGigCompensationCurrency = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-currency' && opportunity.interest === 'gigs')?.[0]?.data
    this.preferredGigCompensationCycle = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-periodicity' && opportunity.interest === 'gigs')?.[0]?.data
    this.preferredJobCompensationCycle = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-periodicity' && opportunity.interest === 'jobs')?.[0]?.data
    this.preferredJobCompensationCurrency = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-currency' && opportunity.interest === 'jobs')?.[0]?.data
    this.preferredJobCompensationAmount = data?.opportunities?.filter(opportunity => opportunity.field === 'desirable-compensation-amount' && opportunity.interest === 'jobs')?.[0]?.data
    this.isOpenToJobs = data?.opportunities?.filter(opportunity => opportunity.field === 'active' && opportunity.interest === 'jobs')?.[0]?.data
    this.isOpenToGigs = data?.opportunities?.filter(opportunity => opportunity.field === 'active' && opportunity.interest === 'gigs')?.[0]?.data
    this.isOpenToInterships = data?.opportunities?.filter(opportunity => opportunity.field === 'active' && opportunity.interest === 'internships')?.[0]?.data
    this.isOpenToMentoring = data?.opportunities?.filter(opportunity => opportunity.field === 'active' && opportunity.interest === 'mentoring')?.[0]?.data
    
    // Prisma generator for skills relationships
    this.skills = {
      connectOrCreate: data.strengths.map(skill => ({
        create: {
          skill: {
            connectOrCreate: {
              create: {
                name: skill.name,
                code: skill.code
              },
              where: {
                name: skill.name
              }
            }
          },
          recommendations: skill.recommendations,
          skillWeight: skill.weight,
          code: skill.id
        },
        where: {
          code: skill.id
        }
      } as Prisma.SkillsCreateOrConnectWithoutpersonInput))
    }

    // Prisma generator for experiences with relationship
    this.experiences = {
      connectOrCreate: data.jobs.map(experience => ({
        create: {
          company: {
            connectOrCreate: {
              create: {
                logo: experience.organizations?.[0]?.picture,
                name: experience.organizations?.[0]?.name
              },
              where: {
                name: experience.organizations?.[0]?.name
              }
            }
          },
          category: experience.category,
          toDate: experience?.toMonth && experience?.toYear ? new Date(Date.parse(`${experience.toMonth}, ${experience.toYear}`)) : undefined,
          fromDate: experience?.fromMonth && experience?.fromYear ? new Date(Date.parse(`${experience.fromMonth}, ${experience.fromYear}`)) : undefined,
          isRemote: experience.remote,
          role: experience.name,
          code: experience.id,
          responsibilities: JSON.stringify(experience.responsibilities)
        },
        where: {
          code: experience.id
        }
      } as Prisma.ExperienceCreateOrConnectWithoutpersonInput))
    }

    // Prisma generator for interests with relationships
    this.interests = {
      connectOrCreate: data.interests.map(interest => ({
        create: {
          code: interest.id,
          skill: {
            connectOrCreate: {
              create: {
                name: interest.name,
                code: interest.code
              },
              where: {
                name: interest.name
              }
            }
          }
        },
        where: {
          code: interest.id
        }
      } as Prisma.InterestCreateOrConnectWithoutpersonInput))
    }
  }


  static generateFromApi(data: PersonApiResponse){
    return new CreatePerson(data)
  }
}