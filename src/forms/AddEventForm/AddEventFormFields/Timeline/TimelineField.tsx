
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const TimelineField = () => {
    return (
        <>
            <FormLabelWrapper>
                <label style={{ textAlign: 'center', fontWeight: 'bold' }} htmlFor="timeline">Timeline</label>
                <p style={{ fontSize: '16px' }}>Saving required to enable timeline updates</p>
            </FormLabelWrapper>
        </>
    )
}

export default TimelineField;