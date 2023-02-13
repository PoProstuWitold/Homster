import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({
    isAbstract: true
})
export abstract class BaseEntity {
    @Field(() => ID)
    id: string

    @Field()
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date
}