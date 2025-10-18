import type { NewEventFormFieldsPropsType } from "../../../../types/event";
import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const DescriptionField = ({ register, errors }: NewEventFormFieldsPropsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Event Details</h4>
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Assigned Team:</label>
                    <input
                        type="text"
                        {...register("assignedTeam")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.assignedTeam && (
                    <p>{errors.assignedTeam.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Subject:</label>
                    <input
                        type="text"
                        {...register("subject")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.subject && (
                    <p>{errors.subject.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor="">Sub Subject:</label>
                    <input
                        type="text"
                        {...register("subSubject")}
                    />
                </FormFieldsWrapper>
                {errors.subSubject && (
                    <p>{errors.subSubject.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Description:</label>
                    <textarea
                        {...register("description")}
                        required
                        style={{ width: '60%', height: '100px' }}
                    />
                </FormFieldsWrapper>
                {errors.description && (
                    <p>{errors.description.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor="">Resolvation:</label>
                    <input
                        type="text"
                        {...register("resolvation")}
                    />
                </FormFieldsWrapper>
            </FormLabelWrapper>
        </>
    );
};

export default DescriptionField;