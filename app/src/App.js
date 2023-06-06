import "./App.css";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
// import { Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// import { Segment } from "semantic-ui-react";

const theme = {
  background: "white",
  fontFamily: "Arial",
  headerBgColor: "black",
  headerFontColor: "#333333",
  headerFontSize: "15px",
  botBubbleColor: "#e6e6fa",
  botFontColor: "#333333",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const TicketForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const api = axios.create({
      baseURL: "http://localhost:3001",
    });

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("issue", issue);
    formData.append("phone", phone);

    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Send the form data to the backend
    api
      .post("/api/tickets", data)
      .then((response) => {
        setName("");
        setEmail("");
        setIssue("");
        console.log("Ticket created:", response.data);

        // Update the chatbot to inform the user that their ticket has been created
        props.triggerNextStep();
      })
      .catch((error) => {
        console.log(name);
        console.log(email);
        console.log(issue);
        console.log(phone);
        console.log(data);
        console.error("Failed to create ticket:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "250px" }}>
      <label style={{ display: "block", margin: "10px 0" }}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "92%", padding: "8px" }}
        />
      </label>
      <label style={{ display: "block", margin: "10px 0" }}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "92%", padding: "8px" }}
        />
      </label>
      <label style={{ display: "block", margin: "10px 0" }}>
        Phone: {/* Added phone input */}
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "92%", padding: "8px" }}
        />
      </label>
      <label style={{ display: "block", margin: "10px 0" }}>
        Issue:
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          style={{ width: "92%", padding: "8px" }}
        ></textarea>
      </label>
      <button type="submit" style={{ display: "block", margin: "10px 0" }}>
        Submit
      </button>
    </form>
  );
};

const bot_messages = [
  {
    id: "Greet",
    message: "Hello, Welcome to Ruby Red.",
    trigger: "Ask Name",
  },
  {
    id: "Ask Name",
    message: "Please enter your name",
    trigger: "waiting1",
  },
  {
    id: "waiting1",
    user: true,
    trigger: "My Name",
  },
  {
    id: "My Name",
    message: "Hi {previousValue}, Please select what you are looking for?",
    trigger: "sections",
  },

  {
    id: "Continue message",
    message: "Continue",
    trigger: "Continue",
  },

  {
    id: "Continue",
    options: [
      { value: "Yes", label: "Yes", trigger: "C Yes" },
      { value: "No", label: "No", trigger: "C No" },
    ],
  },
  {
    id: "C Yes",
    message: "Please select what you are looking for?",
    trigger: "sections",
  },
  {
    id: "C No",
    message: "See you again. I hope you got what you were looking for!",
    end: true,
  },

  {
    id: "sections",
    options: [
      { value: "Software", label: "Software", trigger: "Software" },
      { value: "Website", label: "Website", trigger: "Website" },
      {
        value: "App",
        label: "App",
        trigger: "App",
      },
      {
        value: "Customer Support",
        label: "Customer Support",
        trigger: "Customer Support",
      },
    ],
  },

  // Software
  {
    id: "Software",
    message:
      "Great choice! We offer a variety of Software to choose from. What is your prefered programming language?",
    trigger: "programming level",
  },
  {
    id: "programming level",
    options: [
      { value: "Java", label: "Java", trigger: "Java" },
      { value: "C#", label: "C#", trigger: "C#" },
      { value: "Python", label: "Python", trigger: "Python" },
    ],
  },
  // Java Workout
  {
    id: "Java",
    message:
      "Perfect. Here are some Java strength training Software you can choose from:",
    trigger: "Java Software",
  },
  {
    id: "Java Software",
    options: [
      {
        value: "Hotel management System",
        label: "Hotel management System",
        trigger: "B Hotel management System",
      },
      {
        value: "School managemnet system",
        label: "School managemnet system",
        trigger: "School managemnet system",
      },
      {
        value: "Hospital Managemnet System",
        label: "Hospital Managemnet System",
        trigger: "B Hospital Managemnet System",
      },
    ],
  },

  {
    id: "B Hotel management System",
    message: "Excellent choice! Here's your software details:",
    trigger: "B Hotel management System points",
  },

  {
    id: "B Hotel management System points",
    component: (
      <div class="workout">
        <ol>
          <li>Login and Registration</li>
          <li> Receptionist Management </li>
          <li> Room Management </li>
          <li> Reservation Management </li>
          <li> Check-in and Check-out </li>
          <li> Food and Beverage Management </li>
          <li> Housekeeping Management</li>
          <li> Reporting and Analytics </li>
          <li> Billing and Paymen </li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },
  {
    id: "School managemnet system",
    message:
      "Great choice! Here's a Java school managemnt software to get you started:",
    trigger: "School managemnet system points",
  },
  {
    id: "School managemnet system points",
    component: (
      <div class="workout">
        <ol>
          <li>Student Management</li>
          <li>Staff Management</li>
          <li>Attendance Management</li>
          <li>Academic Curriculum Management</li>
          <li>Exam and Grade Management</li>
          <li>Communication and Messaging</li>
          <li>Library Management</li>
          <li>Timetable and Scheduling</li>
          <li>Reporting and Analytics</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "B Hospital Managemnet System",
    message: "Great! Here's your Hospital Managemnet Features:",
    trigger: "B Hospital Managemnet System points",
  },

  {
    id: "B Hospital Managemnet System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  // C# Workout
  {
    id: "C#",
    message: "Perfect. Here are some Software to look out for:",
    trigger: "C# Software",
  },
  {
    id: "C# Software",
    options: [
      {
        value: "Hotel management System",
        label: "Hotel management System",
        trigger: "I Hotel management System",
      },
      {
        value: "School managemnet app",
        label: "School managemnet app",
        trigger: "School managemnet app",
      },
      {
        value: "Hospital Managemnet System",
        label: "Hospital Managemnet System",
        trigger: "I Hospital Managemnet System",
      },
    ],
  },

  {
    id: "I Hotel management System",
    message: "Great! Here's your workout plan:",
    trigger: "I Hotel management System points",
  },

  {
    id: "I Hotel management System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "School managemnet app",
    message: "Great choice! Here's a Java software for scholl with features:",
    trigger: "School managemnet app points",
  },

  {
    id: "School managemnet app points",

    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "I Hospital Managemnet System",
    message: "Great! Here is your software features:",
    trigger: "I Hospital Managemnet System points",
  },

  {
    id: "I Hospital Managemnet System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),

    trigger: "Continue message",
  },

  // Python Workout
  {
    id: "Python",
    message: "Perfect. Here are some Python Software you can choose from:",
    trigger: "Python Workout",
  },
  {
    id: "Python Workout",
    options: [
      {
        value: "Hotel management System",
        label: "Hotel management System",
        trigger: "A Hotel management System",
      },
      {
        value: "School Management System",
        label: "School Management System",
        trigger: "School Management System",
      },
      {
        value: "Hospital Managemnet System",
        label: "Hospital Managemnet System",
        trigger: "A Hospital Managemnet System",
      },
    ],
  },

  {
    id: "A Hotel management System",
    message: "Excellent choice! Here's your features:",
    trigger: "I Hotel management System points",
  },

  {
    id: "A Hotel management System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "School Management System",
    message: "Great choice! Here's your software features:",
    trigger: "School Management System points",
  },

  {
    id: "School Management System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "A Hospital Managemnet System",
    message: "Great! Here's your software features:",
    trigger: "A Hospital Managemnet System points",
  },

  {
    id: "A Hospital Managemnet System points",
    component: (
      <div class="workout">
        <ol>
          <li>Patient Management</li>
          <li>Appointment and Scheduling</li>
          <li>Electronic Medical Records</li>
          <li>Billing and Insurance Management</li>
          <li>Pharmacy Management</li>
          <li>Staff Management</li>
          <li>Operating Theater Management</li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  // Website

  {
    id: "Website",
    message: "Great choice! Which programming language you would like?",
    trigger: "Type of Website",
  },

  {
    id: "Type of Website",
    options: [
      {
        value: "React",
        label: "React",
        trigger: "React",
      },
      {
        value: "Word Press",
        label: "Word Press",
        trigger: "Word Press",
      },
      {
        value: "Django",
        label: "Django",
        trigger: "Django",
      },
    ],
  },

  {
    id: "React",
    message: "Here's are some React Website :",
    trigger: "React points",
  },

  {
    id: "React points",
    component: (
      <ol class="workout">
        <li>
          <strong>Portfolio</strong>: Company of personal portfolio
        </li>
        <li>
          <strong>Managemnet System</strong>: Any managemnet system like
          school,college
        </li>
        <li>
          <strong>Orginazation Website</strong>: Any orginazation website like
          college, school, construction company etc.
        </li>
        <li>
          <strong>Ecommerce</strong>: Ecommerce platform for you business
        </li>
      </ol>
    ),
    trigger: "Continue message",
  },

  {
    id: "Word Press",
    message:
      "Here's a some website ideas:",
    trigger: "Word Press points",
  },

  {
    id: "Word Press points",
    component: (
      <div class="workout">
        <ol class="workout">
          <li>
            <strong>Portfolio</strong>: Company of personal portfolio
          </li>
          <li>
            <strong>Managemnet System</strong>: Any managemnet system like
            school,college
          </li>
          <li>
            <strong>Orginazation Website</strong>: Any orginazation website like
            college, school, construction company etc.
          </li>
          <li>
            <strong>Ecommerce</strong>: Ecommerce platform for you business
          </li>
        </ol>
        
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "Django",
    message:
      " Here's some website for you:",
    trigger: "Django points",
  },

  {
    id: "Django points",
    component: (
      <div class="workout">
        <ol class="workout">
          <li>
            <strong>Portfolio</strong>: Company of personal portfolio
          </li>
          <li>
            <strong>Managemnet System</strong>: Any managemnet system like
            school,college
          </li>
          <li>
            <strong>Orginazation Website</strong>: Any orginazation website like
            college, school, construction company etc.
          </li>
          <li>
            <strong>Ecommerce</strong>: Ecommerce platform for you business
          </li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  {
    id: "App",
    message: "Here are some app's:",
    trigger: "Equipments list",
  },

  {
    id: "Equipments list",
    component: (
      <div class="workout">
         <ol class="workout">
          <li>
            <strong>Portfolio</strong>: Company of personal portfolio
          </li>
          <li>
            <strong>Managemnet System</strong>: Any managemnet system like
            school,college
          </li>
          <li>
            <strong>Orginazation Website</strong>: Any orginazation website like
            college, school, construction company etc.
          </li>
          <li>
            <strong>Ecommerce</strong>: Ecommerce platform for you business
          </li>
        </ol>
      </div>
    ),
    trigger: "Continue message",
  },

  // Customer Support
  {
    id: "Customer Support",
    message: "Hi, how can I help you?",
    trigger: "Support options",
  },
  {
    id: "Support options",
    options: [
      {
        value: "Issue",
        label: "Report an issue",
        trigger: "Issue form",
      },
      {
        value: "Question",
        label: "Ask a question",
        trigger: "Question response",
      },
    ],
  },
  {
    id: "Issue form",
    message: "Please fill out the form below to report your issue.",
    trigger: "ticket_form",
  },
  {
    id: "Question response",
    message:
      "I'm sorry, As an AI language i am still not trained for this . Please contact support at 9808758007 for further assistance.",
    end: true,
  },
  {
    id: "ticket_form",
    component: <TicketForm />,
    waitAction: true,
    trigger: "Thank you",
  },
  {
    id: "Thank you",
    message:
      "Thank you for contacting us. Your ticket has been created and a support representative will be in touch with you shortly.",
    end: true,
  },
];

function App() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  const CustomHeader = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "red",
        color: "white",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <h3 style={{ marginRight: "auto" }}>Ruby Red</h3>
      {/* <Button
        style={{ color: "black", background: "white" }}
        onClick={handleReload}
      >
        <FontAwesomeIcon icon={faRedoAlt} /> */}
      {/* </Button> */}
      <FontAwesomeIcon
        icon={faRedoAlt}
        className="reload-icon"
        onClick={handleReload}
      />
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* <ChatBot steps={bot_messages} />; */}
      <ChatBot
        headerComponent={<CustomHeader />}
        steps={bot_messages}
        key={reload}
        // botAvatar={"bot.png"}
      />
    </ThemeProvider>
  );
}

export default App;
