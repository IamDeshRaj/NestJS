import { Expose, Transform } from "class-transformer";

export class GetReport {

    @Expose()
    id: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    long: number;

    @Expose()
    mileage: number;

    @Expose()
    approved: boolean;
}