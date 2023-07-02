export class UpdateUserDTO {
  email: string;
  company: string;
  siteUrl: string;
  name: string;
  constructor() {
    this.email = '';
    this.company = '';
    this.siteUrl = '';
    this.name = '';
  }
}

export class RegisterDTO extends UpdateUserDTO {
  password: string;
  confirmPassword: string;
  constructor() {
    super();
    this.password = '';
    this.confirmPassword = '';
  }
}
