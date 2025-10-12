import FormFieldsWrapper from "../../../wrappers/FormFieldWrapper/FormFieldsWrapper";
import FormLabelWrapper from "../../../wrappers/FormLabelWrapper/FormLabelWrapper";
import type { ClientFormFieldsType } from "../../../types/client";

const EmploymentDetailsField = ({ register }: ClientFormFieldsType) => {
    return (
        <>
            <FormLabelWrapper>
                <h4>Employment Details</h4>
                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="company">Company:</label>
                        <input
                            type="text"
                            id="company"
                            {...register("company")}
                        />
                    </div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div><label htmlFor="position">Position:</label>
                        <select
                            id="position"
                            {...register("position")}
                            style={{
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                fontSize: '13px',
                                fontWeight: "bold",
                                padding: '5px 10px',
                            }}
                        >
                            <option value="">Select a position</option>
                            <option value="CEO">CEO</option>
                            <option value="Manager">Manager</option>
                            <option value="Team Leader">Team Leader</option>
                            <option value="Assistant Manager">Assistant Manager</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Accountant">Accountant</option>
                            <option value="HR">HR</option>
                            <option value="Operations">Operations</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Technician">Technician</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Intern">Intern</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Other">Other</option>
                        </select></div>
                </FormFieldsWrapper>

                <FormFieldsWrapper>
                    <div>
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                            style={{ width: '60%', height: '100px' }}
                            id="notes"
                            {...register("notes")}
                        />
                    </div>
                </FormFieldsWrapper>
            </FormLabelWrapper>
        </>
    )
}

export default EmploymentDetailsField;