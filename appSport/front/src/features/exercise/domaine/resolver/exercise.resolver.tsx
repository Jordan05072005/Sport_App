import * as yup from 'yup';

export const exerciseSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Le nom doit faire au moins 2 caractères')
    .max(100, 'Le nom doit faire au maximum 100 caractères')
    .required('Le nom est obligatoire'),

  recupTime: yup
    .string()
    .matches(/^\d+$/, 'Le temps de récupération doit être un nombre')
    .required('Le temps de récupération est obligatoire'),

  image: yup.string().url("L'image doit être une URL valide").optional(),

  nbrRepetitions: yup
    .number()
    .typeError('Le nombre de répétitions doit être un nombre')
    .min(1, 'Minimum 1 répétition')
    .max(999, 'Maximum 999 répétitions')
    .integer('Le nombre de répétitions doit être entier')
    .required('Le nombre de répétitions est obligatoire'),

  nbrSets: yup
    .number()
    .typeError('Le nombre de séries doit être un nombre')
    .min(1, 'Minimum 1 série')
    .max(99, 'Maximum 99 séries')
    .integer('Le nombre de séries doit être entier')
    .required('Le nombre de séries est obligatoire'),

  tips: yup
    .string()
    .min(10, 'Le conseil doit faire au moins 10 caractères')
    .max(500, 'Le conseil doit faire au maximum 500 caractères')
    .optional(),
});
