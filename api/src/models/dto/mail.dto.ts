export interface RegisterMail {
  email: string;
  equipe: string;
  fullname: string;
}

export interface ConfirmationAccount extends RegisterMail {
  valid: boolean;
}
