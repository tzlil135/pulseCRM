import styles from './AddEventForm.module.css';
import { useForm } from "react-hook-form";
import type { NewEventType } from "../../types/event";
import { joiResolver } from "@hookform/resolvers/joi";
import { addEventSchema } from "../../validations/addEventSchema";
import CallerNameField from "./AddEventFormFields/CallerDetails/CallerNameField";
import LocationField from "./AddEventFormFields/Location/LocationField";
import DescriptionField from "./AddEventFormFields/Description/DescriptionField";
import CreatedBy from "./AddEventFormFields/CreatedBy/CreatedBy";
import ParentChildEventsField from "./AddEventFormFields/ParentChildEvents/ParentChildEventsField";
import TimelineField from "./AddEventFormFields/Timeline/TimelineField";
import { useFormSubmitContext } from "../../contexts/FormSubmitContext";
import { useEffect } from "react";
import { addEvent } from "../../service/eventService";
import toast, { Toaster } from "react-hot-toast";

const AddEventForm = () => {

    const { setSubmitFormFn } = useFormSubmitContext();

    const { register, handleSubmit, formState: { errors } } = useForm<NewEventType>(
        {
            defaultValues: {
                callerName: '',
                description: '',
                address: '',
                location: {
                    city: '',
                    street: '',
                    houseNumber: '',
                },
                assignedTeam: '',
                subject: '',
                subSubject: '',
                resolvation: '',
            },
            mode: 'onChange',
            resolver: joiResolver(
                addEventSchema
            )
        }
    );

    useEffect(() => {
        const onSubmit = (data: NewEventType) => {
            console.log("Inside onSubmit");
            console.log(data);
            toast.success("Event added successfully!");
            addEvent(data); // Call the service to add the event
        };

        const submitFunction = handleSubmit(onSubmit);

        setSubmitFormFn(submitFunction);
    }, [setSubmitFormFn, handleSubmit]);


    return (
        <>
            <Toaster />
            <div className={styles['form-container']}>
                <div className={styles['form-header']}>
                    <div className={styles['form-header-top']}>
                        <h3>New Event</h3>
                        <div className={styles['details']}>
                            <div className={styles['details-content']} style={{ borderRight: '1px solid #ccc' }}>
                                <p>Event Number</p>
                                <p style={{ fontWeight: 'bold' }}>612345-06-25</p>
                            </div>
                            <div className={styles['details-content']} style={{ borderRight: '1px solid #ccc' }}>
                                <p>priority</p>
                                <select name="priority" id="priority">
                                    <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                </select>
                            </div>
                            <div className={styles['details-content']}>
                                <p>Event Type</p>
                                <select name="event-type" id="event-type">
                                    <option value="call">Call</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="email">Email</option>
                                    <option value="other">Other</option>
                                </select>
                            </ div>
                        </div>
                    </div>
                    <div className={styles['form-header-bottom']}>
                        <button className={styles['information-btn']}>Information</button>
                        <button className={styles['information-btn']}>Event History</button>
                    </div>
                </div>
                <form className={styles["form-content"]} action="">
                    <div className={styles["form-fields-wrapper"]}>
                        <CallerNameField register={register} errors={errors} />

                    </div>
                    <div className={styles["form-fields-wrapper"]}>
                        <LocationField register={register} errors={errors} />
                        <DescriptionField register={register} errors={errors} />
                        <CreatedBy />
                    </div>
                    <div className={styles["form-fields-wrapper"]}>
                        <ParentChildEventsField />
                        <TimelineField />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddEventForm;