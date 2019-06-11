export interface OverviewPage {
  orders;
  gain;
}

export interface OverviewPageItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: number;
}
