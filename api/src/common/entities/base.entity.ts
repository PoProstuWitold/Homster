import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'

@ObjectType({
    isAbstract: true
})
export abstract class BaseEntity {
    @Field(() => String)
    public id: string

    @Field(() => GraphQLISODateTime)
    public createdAt: Date

    @Field(() => GraphQLISODateTime)
    public updatedAt: Date
}