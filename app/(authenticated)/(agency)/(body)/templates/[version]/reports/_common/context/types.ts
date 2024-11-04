export type MatrixFilter = {
  campaign: string | undefined;
  interview: string | undefined;
  dateRange: { from: Date; to: Date } | undefined;
};

export interface MatrixFilterContextInterface {
  filtersOptions: {
    // eslint-disable-next-line no-unused-vars
    [key in keyof Omit<MatrixFilter, 'dateRange'>]: {
      id: MatrixFilter[key];
      label: string;
    }[];
  } & {
    dateRange: {
      id: string;
      label: string;
    }[];
  };
  filters: MatrixFilter;
  // eslint-disable-next-line no-unused-vars
  handleSetFilter: (filters: {
    [key in keyof MatrixFilter]?: MatrixFilter[key];
  }) => void;
}
