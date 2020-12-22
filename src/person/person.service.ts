import { HttpService, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonApiResponse } from '../interface/person-api.interface'
import { CreatePerson } from './dto/create-person.dto'
import { Person, Prisma } from '@prisma/client'

@Injectable()
export class PersonService {

  constructor (private http: HttpService, private prisma: PrismaService) {  }

  async getPerson(id: string): Promise<PersonApiResponse> {
    try {
      const data: AxiosResponse<PersonApiResponse> = await this.http.get<PersonApiResponse>(`${id}`).toPromise()
      return data?.data
    } catch (error) {
      throw new NotFoundException({
        status: (error as AxiosError)?.response?.status,
        error: (error as AxiosError)?.response?.data?.message
      })
    }
  }

  async createPerson(person: PersonApiResponse): Promise<Person> {
    try {
      return this.prisma.person.create({
        data: CreatePerson.generateFromApi(person)
      })
    } catch (error) {
      Logger.verbose(error)
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops, something went wrong.'
      })
    }
  }

  async retrievePerson(data: Prisma.PersonWhereUniqueInput): Promise<Person>{
    try {
      let person = await this.prisma.person.findFirst({
        where: data,
        include: {
          experiences: {
            include: {
              company: {
                select: {
                  logo: true,
                  name: true
                }
              }
            }
          },
          interests: {
            select: {
              skillId: false,
              personId: false,
              skill: {
                select: {
                  name: true
                }
              }
            }
          },
          skills: {
            include: {
              skill: {
                select: {
                  name: true
                }
              }
            },
            orderBy: {
              skillWeight: 'desc'
            }
          }
        }
      })
      if (person && !person?.fullyFetched) {
        console.log(person)
        await this.updatePerson({
          ...CreatePerson.generateFromApi(await this.getPerson(person.username)),
          fullyFetched: true
        })
        await this.retrievePerson({username: person.username})
      }
      return person
    } catch(error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops. Something went wrong'
      })
    }
  }

  async updatePerson(data: Prisma.PersonUpdateInput): Promise<Person> {
    try {
      return this.prisma.person.update({
        where: {
          username: data.username.toString()
        },
        data
      })
    } catch(error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops, Something went wrong'
      })
    }
  }
}
