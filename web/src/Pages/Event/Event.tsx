import { getEventById, updateEvent } from "../../service/eventService";
import CallerNameField from "../../forms/AddEventForm/AddEventFormFields/CallerDetails/CallerNameField";
import CreatedBy from "../../forms/AddEventForm/AddEventFormFields/CreatedBy/CreatedBy";
import DescriptionField from "../../forms/AddEventForm/AddEventFormFields/Description/DescriptionField";
import LocationField from "../../forms/AddEventForm/AddEventFormFields/Location/LocationField";
import ParentChildEventsField from "../../forms/AddEventForm/AddEventFormFields/ParentChildEvents/ParentChildEventsField";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { EventType, NewEventType } from "../../types/event";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi.js";
import { addEventSchema } from "../../validations/addEventSchema";
import { toast } from "react-hot-toast";
import styles from "./Event.module.css";
import { useFormSubmitContext } from "../../contexts/FormSubmitContext";
import type { FieldErrors } from "react-hook-form";

const Event = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventType | null>(null);

    const [newTimelineNote, setNewTimelineNote] = useState("");

    const { setSubmitFormFn } = useFormSubmitContext();

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
            priority: 'low',
            eventType: 'call',
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
            priority: found.priority ?? 'low',
            eventType: found.eventType ?? 'call',
        });
    }, [id, reset, navigate]);

    const onSubmit = (data: NewEventType) => {
        if (!event) return;

        if (event.status === 'closed') {
            toast.error("Closed event can't be edited");
            return;
        }

        updateEvent(event.id, {
            ...event,
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
            priority: data.priority,
            eventType: data.eventType,
        });

        toast.success("Event updated successfully!");
    };

    const onError = (errors: FieldErrors<NewEventType>) => {
        const firstError = Object.values(errors)[0];

        if (!firstError) return;

        if (firstError?.message) {
            toast.error(firstError.message as string);
            return;
        }

        const nestedError: any = firstError;
        if (nestedError?.city?.message) {
            toast.error(nestedError.city.message);
        } else if (nestedError?.street?.message) {
            toast.error(nestedError.street.message);
        } else if (nestedError?.houseNumber?.message) {
            toast.error(nestedError.houseNumber.message);
        } else {
            toast.error("Please fix the highlighted fields");
        }
    };

    const handleAddTimelineNote = () => {
        if (!event) return;
        if (isReadOnly) return;
        if (!newTimelineNote.trim()) return;

        const newEntry = {
            timestamp: new Date().toISOString(),
            user: "TC",
            action: newTimelineNote.trim(),
        };

        const updatedEvent: EventType = {
            ...event,
            timeLine: [newEntry, ...(event.timeLine ?? [])],
        };

        setEvent(updatedEvent);

        updateEvent(event.id, updatedEvent);

        setNewTimelineNote("");
    };

    useEffect(() => {
        if (!event) return;

        const submitFn = handleSubmit(onSubmit, onError);
        setSubmitFormFn(submitFn);
    }, [event, handleSubmit, setSubmitFormFn]);



    return (
        <>
            <div className={styles['form-container']}>
                <div className={styles['form-header']}>
                    <div className={styles['form-header-top']}>
                        <h3>New Event</h3>
                        <div className={styles['details']}>
                            <div className={styles['details-content']} style={{ borderRight: '1px solid #ccc' }}>
                                <p>Event Number</p>
                                <p style={{ fontWeight: 'bold' }}>{event?.eventNumber}</p>
                            </div>
                            <div className={styles['details-content']} style={{ borderRight: '1px solid #ccc' }}>
                                <p>priority</p>
                                <select {...register("priority")} disabled={isReadOnly}>
                                    <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                </select>

                            </div>
                            <div className={styles['details-content']}>
                                <p>Event Type</p>
                                <select {...register("eventType")} disabled={isReadOnly}>
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

                        {!isReadOnly && (
                            <div className={styles["timeline-section"]}>
                                <h4>Timeline</h4>
                                <div className={styles["timeline-input"]}>
                                    <input
                                        value={newTimelineNote}
                                        onChange={(e) => setNewTimelineNote(e.target.value)}
                                        placeholder="Add a note to the timeline..."
                                    />
                                    <button type="button" onClick={handleAddTimelineNote}>
                                        Add Note
                                    </button>
                                </div>
                            </div>
                        )}
                        {event?.timeLine && event.timeLine.length > 0 ? (
                            <ul className={styles["timeline-list"]}>
                                {event.timeLine.map((item, index) => (
                                    <li key={index} className={styles["timeline-item"]}>
                                        <div className={styles["timeline-header"]}>
                                            <div className={styles["timeline-user"]}>{item.user}</div> ·{" "}
                                            {new Date(item.timestamp).toLocaleString()}
                                        </div>
                                        <div className={styles["timeline-action"]}>{item.action}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No timeline notes yet.</p>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
};

export default Event;