import React, { useEffect, useState } from "react";
import { usePersonData } from "../context/PeopleDataContext";
import { POST } from "../utils/api";
import EditableDataCard from "./editable-data-card";
import { IPersonData } from "../types";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { personData, refreshData } = usePersonData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(personData.people);
  const [errors, setErrors] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(personData.people);
  }, [personData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    const updatedErrors = [...errors];

    if (value === null || value === undefined || value.trim() === "") {
      updatedErrors[index] = "Value cannot be empty";
    } else if (name === "count" && parseInt(value) < 0) {
      updatedErrors[index] = "Count cannot be negative";
    } else {
      updatedErrors[index] = "";
    }

    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
    setErrors(updatedErrors);
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await POST<IPersonData>("people", formData);
      refreshData();
      toast.success("People data updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(`Error updating person data: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = errors.some((error) => error !== "");
  return (
    <div className="people-page">
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
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
