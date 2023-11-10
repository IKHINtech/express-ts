import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  public category_name: string;
}
