import React, { useState } from "react";
import { IPersonData, usePersonData } from "../context/PeopleDataContext";
import { POST } from "../utils/api";
import EditableDataCard from "./editable-data-card";

const SettingsPage = () => {
  const { personData, refreshData } = usePersonData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(personData.people);
  const [errors, setErrors] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    const updatedErrors = [...errors];

    console.log("Name:", name, "Value:", value);
    if (value === null || value === undefined || value.trim() === "") {
      console.log("Value cannot be empty", value);
      updatedErrors[index] = "Value cannot be empty";
    } else if (name === "count" && parseInt(value) < 0) {
      console.log("Count cannot be negative", value);
      updatedErrors[index] = "Count cannot be negative";
    } else {
      updatedErrors[index] = "";
    }

    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
    setErrors(updatedErrors);
  };
  console.log(errors);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await POST<IPersonData>("people", formData);
      refreshData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating person data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = errors.some((error) => error !== "");
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
        {formData?.map((person, index) => (
          <EditableDataCard
            key={index}
            person={person}
            isEditing={isEditing}
            handleChange={handleChange}
            index={index}
            error={errors[index]}
          />
        ))}{" "}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleSubmit} disabled={hasErrors || isSubmitting}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
