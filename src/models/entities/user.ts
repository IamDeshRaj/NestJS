import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    @Unique(['email'])
    email: string;

    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logId(){
        console.log(`User saved with ${this.id}`);
    }
}
