import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { GET } from "../utils/api";
import { IPersonData } from "../types";
import toast from "react-hot-toast";

interface PersonDataContextProps {
  personData: IPersonData;
  setPersonData: React.Dispatch<React.SetStateAction<IPersonData>>;
  refreshData: () => void;
}

const PersonDataContext = createContext<PersonDataContextProps | undefined>(
  undefined
);

export const PersonDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [personData, setPersonData] = useState<IPersonData>({
    totalCount: 0,
    people: [
      { type: "man", count: 0 },
      { type: "woman", count: 0 },
      { type: "boy", count: 0 },
      { type: "girl", count: 0 },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (token) {
        const response = await GET<IPersonData>(`people`);
        setPersonData(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = () => {
    fetchData();
  };

  return (
    <PersonDataContext.Provider
      value={{ personData, setPersonData, refreshData }}
    >
      {children}
    </PersonDataContext.Provider>
  );
};

export const usePersonData = () => {
  const context = useContext(PersonDataContext);
  if (!context) {
    throw new Error("usePersonData must be used within a PersonDataProvider");
  }
  return context;
};
