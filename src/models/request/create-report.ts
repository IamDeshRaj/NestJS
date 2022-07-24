import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReport {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    year: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    long: number;

    @Min(0)
    @Max(100000)
    price: number;
}