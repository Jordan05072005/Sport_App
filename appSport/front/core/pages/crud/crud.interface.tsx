import { JSX } from "react"
import { FormStepInterface } from "../../../components/form/form.interface";


// const data = {
// 	homePage:
// }


// firstname -> dans une obj puis envoye au bacl



export interface CrudEditInterface{
	step: FormStepInterface[]
	yup: any
	hooks: {
		useEditDataMutation: (...args: any[]) => any;
		useEditMutation: () => any;
	};
}

export interface CrudCreateInterface{
	step: FormStepInterface[];
	yup: any;
	hooks: {
		useCreateMutation: (...args: any[]) => any;
	};
}

export interface CrudDeleteInterface{
	hooks: {
		useDeleteMutation: (...args: any[]) => any;
	};
}

export interface CRUDInterface{
	create: CrudCreateInterface,
	update: CrudEditInterface,
	delete: CrudDeleteInterface,
}



// -> page recup du manager les c r d u

// createcrud => c r d u -> form / delete
