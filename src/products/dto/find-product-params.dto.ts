import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class FindProductParamsDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    public organizationName: string;
}
