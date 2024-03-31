interface TypeTask {
  titleTask: string;
  description: string;
  type: number;
}

export const ArrayTypeTask: TypeTask[] = [
  {
    titleTask: "Common Task ",
    description: "These tasks are automatically added to all new projects",
    type: 0
  },
  {
    titleTask: "Other Task ",
    description: "These task must be manually added to projects",
    type: 1
  }
];
