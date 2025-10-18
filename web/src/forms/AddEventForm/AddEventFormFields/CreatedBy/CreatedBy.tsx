import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const CreatedBy = () => {
    return (
        <>
            <FormLabelWrapper>
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Created By:</label>
                    <input
                        type="text"
                        value="Tzlil Cohen"
                        readOnly
                    />
                </FormFieldsWrapper>
            </ FormLabelWrapper>
        </>
    );
}

export default CreatedBy;