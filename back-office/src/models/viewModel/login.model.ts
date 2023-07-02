import { object, string, ref } from 'yup';

export const LoginSchema = object({
  email: string().required('Le champ email est requis.').email("L'email doit être valide.").trim(),
  password: string()
    .required('Le champ mot de passe est requis.')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .trim()
});

export const RegisterSchema = object({
  company: string().required('Le champ company est requis.').trim(),
  siteUrl: string().required('Le champ siteUrl est requis.').trim(),
  name: string().required('Le champ nom est requis.').trim(),
  email: string().required('Le champ email est requis.').email("L'email doit être valide.").trim(),
  password: string()
    .required('Le champ mot de passe est requis.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'
    )
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .trim(),
  confirmPassword: string()
    .required('Le champ confirmation de mot de passe est requis.')
    .oneOf([ref('password')], 'Les mots de passe doivent être identiques.')
    .trim()
});

export interface LoginVM {
  email: string;
  password: string;
}
