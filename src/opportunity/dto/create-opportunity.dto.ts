import { Prisma } from "@prisma/client"
import { OpportunityApiResponse } from 'src/interface/opportunity-api.interface'

export class CreateOpportunity implements Prisma.OpportunityCreateInput {
  uid: string
  title: string
  isReviewed: boolean
  benefits?: string
  responsibilities?: string
  structure?: string
  location?: string
  deadline: string | Date
  type: string
  minSalaryRange: number
  maxSalaryRange: number
  compensationPeriod: string
  compensationCurrency: string
  status: string
  poster: Prisma.PersonCreateOneWithoutOpportunityInput
  company: Prisma.CompanyCreateOneWithoutOpportunityInput
  skills?: Prisma.SkillCreateManyWithoutOpportunityInput
  
  constructor (data: OpportunityApiResponse) {
    this.uid = data.id
    this.title = data.objective
    this.isReviewed = data.review == 'approved'
    this.benefits = JSON.stringify(new Set(...data.details.filter(benefit => benefit.code === 'benefits' || benefit.code === 'stock-compensations').map(benefit => benefit.content)))
    this.responsibilities = data.details.filter(detail => detail.code === 'responsibilities')?.[0]?.content
    this.structure = data.details.filter(detail => detail.code === 'team-structure')?.[0]?.content
    this.location = data.place.anywhere && data?.place?.remote ? 'Remote WorldWide' : data?.place?.location?.[0]?.id || 'Anywhere'
    this.deadline = new Date(data.deadline as unknown as string)
    this.type = data.commitment.code
    this.minSalaryRange = data?.compensation?.minAmount || 0
    this.maxSalaryRange = data?.compensation?.maxAmount || 0
    this.compensationPeriod = data?.compensation?.periodicity
    this.compensationCurrency = data?.compensation?.currency
    this.status = data.status
    
    // prisma generator for poster
    this.poster = {
      connectOrCreate: {
        create: {
          username: data.owner.username,
          name: data.owner.name,
          headline: data.owner.professionalHeadline,
          picture: data.owner.picture,
          profileWeight: data.owner.weight,
          isVerified: data.owner.verified,
          fullyFetched: false
        } as Prisma.PersonCreateWithoutOpportunityInput,
        where: {
          username: data.owner.username
        }
      }
    }

    this.company = {
      connectOrCreate: {
        create: {
          profile: {
            connectOrCreate: {
              create: {
                culture: data.details.filter(detail => detail.code === 'team-culture')?.[0]?.content,
                summary: data.details.filter(detail => detail.code === 'reason')?.[0]?.content || data.details.filter(detail => detail.code === 'organizations')?.[0]?.content
              },
              where: {
                companyId: data.organizations?.[0]?.id
              }
            } as Prisma.CompanyProfileCreateOrConnectWithoutcompanyInput
          },
          logo: data.organizations?.[0]?.picture,
          name: data.organizations?.[0]?.name
        } as Prisma.CompanyCreateWithoutOpportunityInput,
        where: {
          name: data.organizations?.[0]?.name
        }
      }
    }

    this.skills = {
      connectOrCreate: data.strengths.map(skill => ({
        create: {
          code: skill.code,
          name: skill.name
        } as Prisma.SkillCreateWithoutOpportunityInput,
        where: {
          name: skill.name
        }
      } as Prisma.SkillCreateOrConnectWithoutOpportunityInput))
    }
  }

  static generateFromApi(data: OpportunityApiResponse) {
    return new CreateOpportunity(data)
  }
}
