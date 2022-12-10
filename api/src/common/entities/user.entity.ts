import { Field, ObjectType } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm'
import { hash } from 'argon2'

import { Roles } from '../enums'

import { BaseEntity } from './base.entity'


@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => String)
    @Column({ 
        unique: true,
        length: 50,
        nullable: false
    })
    public displayName: string

    @Field(() => String)
    @Column({
        length: 50,
        nullable: false
    })
    public fullName: string

    @Field()
    @Column({
        nullable: false,
        default: Roles.Student,
        type: 'enum',
        enum: Roles
    })
    public role: Roles

    @Field(() => String)
    @Index()
    @Column({ 
        unique: true,
        name: 'email',
        nullable: false
    })
    public email: string

    @Column({
        length: 300,
        nullable: false
    })
    public password: string


    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        this.password = await hash(this.password)
    }

    @BeforeInsert()
    private async getRole() {
        try {
            const emailDomain = this.email.split('@')[1]
            switch (emailDomain) {
                case 'pollub.edu.pl':
                    this.role = Roles.Student
                    break;
                case 'pollub.pl':
                    this.role = Roles.Instructor
                    break;
            
                default:
                    break;
            }
        } catch (err) {
            
        }
    }
}