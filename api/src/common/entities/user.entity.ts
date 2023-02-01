import { Field, ObjectType } from '@nestjs/graphql'
import { User as UserDB, Role } from '@prisma/client'
import { BaseEntity } from './base.entity'

@ObjectType()
export class User extends BaseEntity {
    @Field(() => String)
    public displayName: UserDB['displayName']

    @Field(() => String)
    public fullName: UserDB['fullName']

    @Field()
    public role: Role

    @Field(() => String)
    public email: UserDB['email']
}