import { Prisma } from "@prisma/client";
import { PersonApiResponse } from "src/interface/person-api.interface";

export class CreatePerson implements Prisma.PersonCreateInput {

  name: string;
  phone: string;
  picture: string;
  headline?: string;
  username: string;
  links?: string;
  bio?: string;
  profileWeight?: number;
  location?: string;
  timezone?: string;
  isVerified: boolean;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  skills?: Prisma.SkillsCreateManyWithoutPersonInput;
  experiences?: Prisma.ExperienceCreateManyWithoutPersonInput;
  interests?: Prisma.InterestCreateManyWithoutPersonInput;

  constructor (data: PersonApiResponse) {
    this.name = data.person.name
    this.phone = data.person.phone
    this.picture = data.person.picture
    this.headline = data.person.professionalHeadline
    this.username = data.person.publicId
    this.links = JSON.stringify(data.person.links)
    this.bio = data.person.summaryOfBio
    this.profileWeight = data.person.weight
    this.location = data.person.location.name
    this.timezone = data.person.location.timezone
    this.isVerified = data.person.verified
    this.createdAt = new Date(data.person.created as unknown as string)

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
    },

    // Prisma generator for experiences with relationship
    this.experiences = {
      connectOrCreate: [...data.experiences, ...data.jobs].map(experience => ({
        create: {
          company: {
            connectOrCreate: {
              create: {
                logo: experience.organizations[0].picture,
                name: experience.organizations[0].name
              },
              where: {
                name: experience.organizations[0].name
              }
            }
          },
          category: experience.category,
          toDate: experience?.toMonth && experience?.toYear ? new Date(Date.parse(`${experience.toMonth}, ${experience.toYear}`)) : undefined,
          fromDate: new Date(Date.parse(`${experience.fromMonth}, ${experience.fromYear}`)),
          isRemote: experience.remote,
          role: experience.name,
          code: experience.id
        },
        where: {
          code: experience.id
        }
      } as Prisma.ExperienceCreateOrConnectWithoutPersonInput))
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