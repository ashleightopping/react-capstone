import NavBar from '../routes/NavBar';
import { useFormik } from 'formik'; // importing form
import DatePicker from 'react-datepicker'; // importing calendar feature
import 'react-datepicker/dist/react-datepicker.css';
import { useAppContext } from '../context/AppContext';
// styling
import '../index.css';
import '../NavBar.css';

const AddEvent = () => {
  const { events, setEvents } = useAppContext();

  const formik = useFormik({ // form expects the following as input
    initialValues: {
      eventName: '',
      startDate: new Date(),
      description: '',
      location: '',
    },
    // making name, date and location required fields
    validate: (values) => {
      const errors = {};
      if (!values.eventName) errors.eventName = "Required";
      if (!values.startDate) errors.startDate = "Required";
      if (!values.location) errors.location = "Required";
      return errors;
    },
    // on submitting button, alert will display to user
    onSubmit: (values, { resetForm }) => { // importing resetFrom to clear form after each submission
      const newEvent = {
        id: Date.now(), // highlights date on calendar as today
        title: values.eventName,
        start: values.startDate,
        end: values.startDate,
        description: values.description,
        location: values.location,
      };

      setEvents(prevEvents => [...prevEvents, newEvent]); // add new event to existing array
      alert(`Event "${values.eventName}" has now been added to the calendar`);
      resetForm(); // clear form after submit
    },
  });

  return (
    <div>
      <NavBar /> 
      <div className="add-event-container">
        <h1>Got something coming up? Add it to your calendar!</h1>

        <form onSubmit={formik.handleSubmit} className="add-event-form">

          <div className="form-group">
            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              placeholder="Event name"
              onChange={formik.handleChange}
              value={formik.values.eventName}
            />
            {formik.errors.eventName && (
              <div className="error">{formik.errors.eventName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Date & Time:</label>
            <DatePicker
              selected={formik.values.startDate}
              onChange={(date) => formik.setFieldValue("startDate", date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15} // timings show as every 15 minutes
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            {formik.errors.startDate && (
              <div className="error">{formik.errors.startDate}</div>
            )}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Event description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Where is your event?"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
            {formik.errors.location && (
              <div className="error">{formik.errors.location}</div>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Add Event
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddEvent;