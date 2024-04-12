export interface ISidePanelSection {
  name: string;
  Tab: React.ComponentType<{name: string}>;
  Panel: React.ComponentType<{name: string}>;
}
