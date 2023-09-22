import { ApiProperty } from "@nestjs/swagger";


export class UserSignIn {
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export class UserSignUp {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}
