import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindProductQueryDto {
    @IsNotEmpty()
    @Expose()
    @Transform(({ value }: { value: string }) => {
        if (typeof value == 'string') {
            return value.split(',')
        } else {
            return value
        }
    })
    public tags: string[];
}

