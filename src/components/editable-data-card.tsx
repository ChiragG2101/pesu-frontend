import React from "react";
import { IPeople } from "../types";
import woman from "/women-image.webp";
import man from "/man-image.webp";
import boy from "/boy-image.webp";
import girl from "/girl-image.webp";

interface EditableDataCardProps {
  person: IPeople;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  index: number;
}

const EditableDataCard: React.FC<EditableDataCardProps> = ({
  person,
  isEditing,
  handleChange,
  index,
}) => {
  const getImage = () => {
    switch (person.type) {
      case "man":
        return man;
      case "woman":
        return woman;
      case "boy":
        return boy;
      case "girl":
        return girl;
      default:
        return "";
    }
  };
  return (
    <div className="data-card">
      {isEditing ? (
        <>
          <img
            src={getImage()}
            style={{ width: "100px" }}
            className="card-image"
            alt="person"
          />
          <input
            type="number"
            name="count"
            value={person.count}
            onChange={(e) => handleChange(e, index)}
          />
        </>
      ) : (
        <>
          <img
            src={getImage()}
            style={{ width: "100px" }}
            className="card-image"
            alt="person"
          />
          <span>{person.count}</span>
        </>
      )}
    </div>
  );
};

export default EditableDataCard;
