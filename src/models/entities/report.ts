import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, (user) => user.reports) // First function helps to remove circular dependency
    user: User;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lat: number;

    @Column()
    long: number;

    @Column()
    mileage: number;
    
}