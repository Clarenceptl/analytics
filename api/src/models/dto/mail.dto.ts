export interface RegisterMail {
  email: string;
  fullname: string;
}

export interface ConfirmationAccount extends RegisterMail {
  valid: boolean;
}
