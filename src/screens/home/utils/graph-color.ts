const GRAPH_COLORS = [
  "#d4d4d4",
  "#a1a1aa",
  "#71717a",
  "#a3a3a3",
  "#525252",
  "#475569",
  "#3f3f46",
];

export const getGraphColor = (index: number) =>
  GRAPH_COLORS[index > 6 ? index % 7 : index];

export const GRAPH_CONFIG = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0.5,
  backgroundColor: "#ffff",
  backgroundGradientFrom: "#ffff",
  backgroundGradientTo: "#ffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
