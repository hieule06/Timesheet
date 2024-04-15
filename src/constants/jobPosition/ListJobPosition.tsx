export interface ListJobPositionType {
  title: string;
  type: number;
}

export const ListJobPosition: ListJobPositionType[] = [
  {
    title: "All",
    type: 3
  },
  {
    title: "Staff",
    type: 0
  },
  {
    title: "Internship",
    type: 1
  },
  {
    title: "collaborator",
    type: 2
  }
];
