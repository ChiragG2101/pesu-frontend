export interface IPeople {
  type: "man" | "woman" | "boy" | "girl";
  count: number;
}
export interface IPersonData {
  totalCount: number;
  people: IPeople[];
}
