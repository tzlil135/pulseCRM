import { TbArrowAutofitContentFilled } from "react-icons/tb";
import type { NewEventFormFieldsPropsType } from "../../../../types/event";
import FormFieldsWrapper from "../../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../../wrappers/FormLabelWrapper/FormLabelWrapper";

const LocationField = ({ register, errors }: NewEventFormFieldsPropsType) => {
    return (
        <>
            <FormLabelWrapper>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h4>Event Location</h4>
                    <button style={{ background: 'rgb(255, 39, 125)', border: 'none', cursor: 'pointer', padding: '5px', borderRadius: '5px', color: 'white', fontSize: '17px' }}>
                        <TbArrowAutofitContentFilled />
                    </button>
                </div>
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>City:</label>
                    <input
                        type="text"
                        {...register("location.city")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.location?.city && (
                    <p>{errors.location.city.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>Street:</label>
                    <input
                        type="text"
                        {...register("location.street")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.location?.street && (
                    <p>{errors.location.street.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor=""><span style={{ color: 'red' }}>* </span>House Number:</label>
                    <input
                        style={{ width: '60px' }}
                        type="text"
                        {...register("location.houseNumber")}
                        required
                    />
                </FormFieldsWrapper>
                {errors.location?.houseNumber && (
                    <p>{errors.location.houseNumber.message}</p>
                )}
                <FormFieldsWrapper>
                    <label htmlFor="">Search By Key:</label>
                    <input
                        type="text"
                        {...register("address")}
                    />
                </FormFieldsWrapper>

            </FormLabelWrapper>
        </>
    )
}

export default LocationField;