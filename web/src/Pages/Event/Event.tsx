import { getEventById, updateEvent } from "../../service/eventService";
import CallerNameField from "../../forms/AddEventForm/AddEventFormFields/CallerDetails/CallerNameField";
import CreatedBy from "../../forms/AddEventForm/AddEventFormFields/CreatedBy/CreatedBy";
import DescriptionField from "../../forms/AddEventForm/AddEventFormFields/Description/DescriptionField";
import LocationField from "../../forms/AddEventForm/AddEventFormFields/Location/LocationField";
import ParentChildEventsField from "../../forms/AddEventForm/AddEventFormFields/ParentChildEvents/ParentChildEventsField";
import TimelineField from "../../forms/AddEventForm/AddEventFormFields/Timeline/TimelineField";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { EventType, NewEventType } from "../../types/event";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import { addEventSchema } from "../../validations/addEventSchema";
import { toast } from "react-hot-toast";
import styles from "./Event.module.css";

const Event = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventType | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewEventType>({
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
        resolver: joiResolver(addEventSchema)
    });

    const isReadOnly = event?.status === 'closed';

    useEffect(() => {
        if (!id) return;

        const found = getEventById(id);
        if (!found) {
            toast.error("Event not found");
            navigate("/events");
            return;
        }

        setEvent(found);

        reset({
            callerName: found.callerName,
            description: found.description,
            location: {
                city: found.location.city,
                street: found.location.street,
                houseNumber: found.location.houseNumber,
            },
            assignedTeam: found.assignedTeam ?? '',
            subject: found.subject ?? '',
            subSubject: found.subSubject ?? '',
            resolvation: found.resolvation ?? '',
        });
    }, [id, reset, navigate]);

    const onSubmit = (data: NewEventType) => {
        if (!event) return;

        if (event.status === 'closed') {
            toast.error("Closed event can't be edited");
            return;
        }

        updateEvent(event.id, {
            callerName: data.callerName,
            description: data.description,
            location: {
                city: data.location.city,
                street: data.location.street,
                houseNumber: data.location.houseNumber,
            },
            assignedTeam: data.assignedTeam,
            subject: data.subject,
            subSubject: data.subSubject,
            resolvation: data.resolvation,
        });

        toast.success("Event updated successfully!");
    };


    return (
        <>
            <div className={styles['form-container']}>
                <div className={styles['form-header']}>
                    <div className={styles['form-header-top']}>
                        <h3>New Event</h3>
                        <div className={styles['details']}>
                            <div className={styles['details-content']} style={{ borderRight: '1px solid #ccc' }}>
                                <p>Event Number</p>
                                <p style={{ fontWeight: 'bold' }}>---</p>
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
                            </div>
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
};

export default Event;