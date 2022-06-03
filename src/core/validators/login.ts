import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class loginBodyValidtor {
  @IsString({ message: "الاسم لازم يكون حروف" })
  username: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
