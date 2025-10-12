import FormFieldsWrapper from "../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../wrappers/FormLabelWrapper/FormLabelWrapper";
import type { ClientFormFieldsType } from "../../../types/client";

const CallerLocationField = ({ register, errors }: ClientFormFieldsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Contact Location</h4>
                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="street"><span style={{ color: 'red' }}>* </span>Street:</label>
                        <input
                            type="text"
                            id="street"
                            {...register("address.street")}
                            required
                        />
                    </div>
                    <div>
                        {errors.address?.street && (
                            <p className="error">{errors.address.street.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="city"><span style={{ color: 'red' }}>* </span>City:</label>
                        <input
                            type="text"
                            id="city"
                            {...register("address.city")}
                            required
                        />
                    </div>
                    <div>
                        {errors.address?.city && (
                            <p className="error">{errors.address.city.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="houseNumber"><span style={{ color: 'red' }}>* </span>House Number:</label>
                        <input
                            style={{ width: '20%' }}
                            type="text"
                            id="houseNumber"
                            {...register("address.houseNumber")}
                            required
                        />
                    </div>
                    <div>
                        {errors.address?.houseNumber && (
                            <p className="error">{errors.address.houseNumber.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>
            </FormLabelWrapper>
        </>
    )
}

export default CallerLocationField;