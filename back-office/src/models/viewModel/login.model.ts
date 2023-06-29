import { object, string } from 'yup';

export const LoginSchema = object({
  email: string().required('Le champ email est requis.').email("L'email doit être valide.").trim(),
  password: string()
    .required('Le champ mot de passe est requis.')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .trim()
});

export interface LoginVM {
  email: string;
  password: string;
}
