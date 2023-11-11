import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  public product_name: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  public qty: number;

  @IsNumber()
  @IsNotEmpty()
  public category_id: number;

  @IsNumber()
  @IsNotEmpty()
  public manufacture_id: number;
}
