import FormFieldsWrapper from "../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../wrappers/FormLabelWrapper/FormLabelWrapper";
import type { ClientFormFieldsType } from "../../../types/client";

const NameField = ({ register, errors }: ClientFormFieldsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Contact Name</h4>
                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="firstName"><span style={{ color: 'red' }}>* </span>First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("name.firstName")}
                            required
                        />
                    </div>
                    <div>
                        {errors.name?.firstName && (
                            <p className="error">{errors.name.firstName.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="middleName">Middle Name:</label>
                        <input
                            type="text"
                            id="middleName"
                            {...register("name.middleName")}
                        />
                    </div>
                    <div>
                        {errors.name?.middleName && (
                            <p className="error">{errors.name.middleName.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="lastName"><span style={{ color: 'red' }}>* </span>Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("name.lastName")}
                            required
                        />
                    </div>
                    <div>
                        {errors.name?.lastName && (
                            <p className="error">{errors.name.lastName.message}</p>
                        )}
                    </div>
                </FormFieldsWrapper>
            </FormLabelWrapper>
        </>
    )
}

export default NameField;