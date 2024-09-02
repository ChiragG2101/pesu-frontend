import React, { useState } from "react";
import { IPersonData, usePersonData } from "../context/PeopleDataContext";
import { POST } from "../utils/api";
import EditableDataCard from "./editable-data-card";

const SettingsPage = () => {
  const { personData, setPersonData } = usePersonData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(personData.people);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      console.log("formData", formData);
      const response = await POST<IPersonData>("people", formData);
      setPersonData(response);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating person data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        gap: "2rem",
      }}
    >
      <div className="data-card-container">
        {formData.map((person, index) => (
          <EditableDataCard
            key={index}
            person={person}
            isEditing={isEditing}
            handleChange={handleChange}
            index={index}
          />
        ))}{" "}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default SettingsPage;
