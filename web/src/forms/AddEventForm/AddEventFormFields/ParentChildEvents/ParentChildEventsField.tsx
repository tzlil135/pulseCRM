import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

type ParentChildEventsFieldProps = {
    parentEventId?: string;
    parentEventNumber?: string;
    onParentClick?: () => void;
};

const ParentChildEventsField = ({ parentEventId, parentEventNumber, onParentClick }: ParentChildEventsFieldProps) => {

    const hasParent = !!parentEventId;

    return (
        <>
            <FormLabelWrapper>
                <FormFieldsWrapper>
                    <label>Parent Event:</label>

                    {hasParent ? (
                        <button
                            type="button"
                            onClick={onParentClick}
                            style={{
                                color: 'black',
                                fontSize: '16px',
                                fontWeight: 600,
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                            }}
                        >
                            {parentEventNumber ?? parentEventId}
                        </button>
                    ) : (
                        <p style={{ color: 'black', fontSize: '16px', fontWeight: 600 }}>
                            No Parent Event
                        </p>
                    )}
                </FormFieldsWrapper>
            </ FormLabelWrapper>
        </>
    )
}

export default ParentChildEventsField;