import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { GET } from "../utils/api";
import { IPersonData } from "../types";

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
      const response = await GET<IPersonData>(`people`);
      setPersonData(response);
    } catch (error) {
      toast.error(error);
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
