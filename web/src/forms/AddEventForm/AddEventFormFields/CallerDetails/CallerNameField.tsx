import type { NewEventFormFieldsPropsType } from "../../../../types/event";
import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const CallerNameField = ({ register, errors }: NewEventFormFieldsPropsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Caller Details</h4>
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Name:</label>
                    <input
                        type="text"
                        {...register("callerName")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.callerName && (
                    <p>{errors.callerName.message}</p>
                )}
            </FormLabelWrapper>
        </>
    )
}

export default CallerNameField;