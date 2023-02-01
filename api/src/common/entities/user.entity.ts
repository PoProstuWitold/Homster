import { Field, ObjectType } from '@nestjs/graphql'

import { BaseEntity } from './base.entity'

@ObjectType()
export class User extends BaseEntity {
    @Field(() => String)
    public displayName: string

    @Field(() => String)
    public fullName: string

    @Field()
    public role: string

    @Field(() => String)
    public email: string
}