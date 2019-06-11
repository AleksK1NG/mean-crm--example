export interface AnalyticsPage {
  average: number;
  chart: AnalyticsChart[];
}

export interface AnalyticsChart {
  gain: number;
  order: number;
  label: string;
}
