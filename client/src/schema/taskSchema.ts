import * as Yup from 'yup'

export const taskSchema = Yup.object({
    taskName: Yup.string().required('Task Name is required'),
    assignTo: Yup.array().min(1, 'At least one employee must be selected'),
    description: Yup.string().required('Description is required'),
});