import { FormStepInterface, FormType } from '@/components/form/form.interface';
import { ExerciseInterface } from '@/src/features/exercise/domaine/interface/exercise-interface';

type TEdit = ExerciseInterface;

const baseSteps: FormStepInterface<TEdit>[] = [
  {
    title: 'Étape 1',
    label: 'Informations générales',
    section: [
      {
        layout: 'row',
        fields: [
          {
            name: 'name',
            label: 'Nom',
            type: FormType.Text,
            required: true,
          },
          {
            name: 'recupTime',
            label: 'Récupération',
            type: FormType.Number,
            required: true,
          },
        ],
      },
      {
        layout: 'row',
        fields: [
          {
            name: 'nbrRepetitions',
            label: 'Répétions',
            type: FormType.Text,
            required: true,
          },
          {
            name: 'nbrSets',
            label: 'Séries',
            type: FormType.Number,
            required: true,
          },
        ],
      },
      {
        layout: 'row',
        fields: [
          {
            name: 'image',
            label: 'Image',
            type: FormType.Image,
          },
        ],
      },
    ],
  },
  {
    title: 'Étape 2',
    label: 'Informations générales',
    section: [
      {
        layout: 'row',
        fields: [
          {
            name: 'tips',
            label: 'Conseil',
            type: FormType.TextArea,
          },
        ],
      },
    ],
  },
];

export const createSteps: FormStepInterface<TEdit>[] = [...baseSteps];
