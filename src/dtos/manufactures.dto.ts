import { IsString, IsNotEmpty } from 'class-validator';

export class ManufactureDto {
  @IsString()
  @IsNotEmpty()
  public manufacture_name: string;
}
