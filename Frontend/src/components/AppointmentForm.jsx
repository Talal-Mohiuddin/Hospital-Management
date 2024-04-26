import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { URL } from "../URL";

const AppointmentForm = () => {
  const { isAuthenticated, user } = useAuth();

  const [patientId] = useState(user._id);
  const [firstName] = useState(user.firstName);
  const [lastName] = useState(user.lastName);
  const [email] = useState(user.email);
  const [phone] = useState(user.phone);
  const [nic] = useState(user.nic);
  const [dob, setDob] = useState(user.dob);
  const [gender, setGender] = useState(user.gender);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setdoctorId] = useState();

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(`${URL}/user/doctors`, {
        withCredentials: true,
      });
      setDoctors(data.doctors);
    };

    fetchDoctors();
  }, []);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAppointment = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${URL}/appointment/new`,
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
          patientId,
          doctorId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setDob(""),
          setAppointmentDate(""),
          setDepartment(""),
          setDoctorFirstName(""),
          setDoctorLastName(""),
          setHasVisited(""),
          setAddress("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input type="text" placeholder="First Name" value={firstName} />
            <input type="text" placeholder="Last Name" value={lastName} />
          </div>
          <div>
            <input type="text" placeholder="Email" value={email} />
            <input type="number" placeholder="Mobile Number" value={phone} />
          </div>
          <div>
            <input type="number" placeholder="NIC" value={nic} />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName, _id] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
                setdoctorId(_id);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDerpartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName} ${doctor._id}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ cursor: "pointer", margin: "0 auto" }}>
            GET APPOINTMENT
          </button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
