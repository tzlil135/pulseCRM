import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const ParentChildEventsField = () => {
    return (
        <>
            <FormLabelWrapper>
                <FormFieldsWrapper>
                    <label htmlFor="">Parent Event:</label>
                    <p style={{ color: 'black', fontSize: '16px', fontWeight: '600' }}>No Parent Event</p>
                </FormFieldsWrapper>
            </ FormLabelWrapper>
        </>
    )
}

export default ParentChildEventsField;