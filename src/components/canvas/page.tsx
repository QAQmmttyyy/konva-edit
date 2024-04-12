import { FC } from "react";
import { Layer, Stage } from "react-konva";
import { useStore } from "@/context/store-context";
import { Element } from "./element";

interface IPageProps {
  width: number;
  height: number;
}

export const Page: FC<IPageProps> = ({ width, height }) => {
  const store = useStore();
  return (
    <Stage width={width} height={height}>
      <Layer>
        {store?.activePage.children.map((child) => (
          <Element key={child.id} element={child} />
        ))}
      </Layer>
    </Stage>
  );
};
