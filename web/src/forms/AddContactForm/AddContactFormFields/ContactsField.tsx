import FormFieldsWrapper from "../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../wrappers/FormLabelWrapper/FormLabelWrapper";
import type { ClientFormFieldsType } from "../../../types/client";

const ContactsField = ({ register, errors }: ClientFormFieldsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Contact Details</h4>
                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="email"><span style={{ color: 'red' }}>* </span>Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            required
                        />
                    </div>
                    <div>
                        {errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="phone"><span style={{ color: 'red' }}>* </span>Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            {...register("phone")}
                            required
                        />
                    </div>
                    <div>
                        {errors.phone && (
                            <p className="error">{errors.phone.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="officePhone">Office Phone:</label>
                        <input
                            type="tel"
                            id="officePhone"
                            {...register("officePhone")}
                        />
                    </div>
                    <div>
                        {errors.officePhone && (
                            <p className="error">{errors.officePhone.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>
            </FormLabelWrapper>
        </>
    )
}

export default ContactsField;