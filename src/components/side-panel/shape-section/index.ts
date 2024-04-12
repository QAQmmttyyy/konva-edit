import { ISidePanelSection } from "../type"
import { ShapeTab } from "./tab"
import { ShapePanel } from "./panel"

export const ShapeSection: ISidePanelSection = {
    name: 'shape',
    Tab: ShapeTab,
    Panel: ShapePanel,
} 
