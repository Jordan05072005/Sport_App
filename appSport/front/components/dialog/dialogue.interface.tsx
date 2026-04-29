
export interface DialogInterface{
	title: string,
	description: string,
	activate: boolean
	setActivate: (activate: boolean) => void
	onValid: () => void
	onClose: () => void
}