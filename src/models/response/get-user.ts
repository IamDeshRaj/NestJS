import { Expose } from 'class-transformer';

export class GetUser {

    @Expose()
    id: number;

    @Expose()
    email: string;

}