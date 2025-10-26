import NavBar from "../routes/NavBar";

// styling
import '../NavBar.css';
import '../index.css';

const HelpPage = () => {
  return (
    <div>
      <NavBar />
      <div className="help-container">
        <h1>Need help? No problem</h1>

        <section>
          <h2>Creating your account</h2>
          <p>
            To set up your account, navigate to the 'Create your account' page in the navigation 
            menu at the top of the page. If you aren't logged in, you won't be able to access any 
            of your event info, so you'll need to do this first.
          </p>
          <p>
            To create your account, you'll need to register using your name and email address. 
            You'll then need to set up a username and password - although your password will need 
            to contain at least 8 characters, with at least 1 uppercase and lowercase letter, 
            a number and a special character.
          </p>
        </section>

        <section>
          <h2>Adding events</h2>
          <p>
            To add an event, navigate to the 'Add an event' page and submit the required 
            information on your upcoming event. Once you've hit the 'submit' button, you
            should see an alert to notify you that your event is now visible on the calendar.
          </p>
        </section>

        <section>
          <h2>Editing events</h2>
          <p>
            To edit events, you'll need to make sure you're on the Event Dashboard. You can then
            hover over your events, and click on them to make any necessary changes. To amend 
            your event, hit 'Save'. Alternatively, you can delete your event if it's no longer 
            relevant.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;