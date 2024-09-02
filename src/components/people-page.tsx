import DoughnutChart from "./doughnut-chart";
import woman from "/women-image.webp";
import man from "/man-image.webp";
import boy from "/boy-image.webp";
import girl from "/girl-image.webp";
import { usePersonData } from "../context/PeopleDataContext";

const DataCard = ({ type, count }: { type: string; count: number }) => {
  const getImage = () => {
    switch (type) {
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
      <img
        src={getImage()}
        style={{ width: "100px" }}
        className="card-image"
        alt="person"
      />
      {count && <span>{count}</span>}
    </div>
  );
};

const PeoplePage = () => {
  const { personData } = usePersonData();
  const categories = ["Man", "Woman", "Girl", "Boy"];

  const chartValues = personData?.people?.map((item) => item.count) ?? [
    0, 0, 0, 0,
  ];

  const dataCards = personData?.people?.map((person, index) => (
    <DataCard key={index} type={person.type} count={person.count} />
  ));
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
      <div className="data-card-container">{dataCards}</div>
      <DoughnutChart values={chartValues} categories={categories} />
    </div>
  );
};

export default PeoplePage;
