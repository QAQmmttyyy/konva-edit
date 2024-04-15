import { Image } from "react-konva";
import { observer } from "mobx-react-lite";
import { IImageInstance } from "@/model/image-model";
import useImage from "use-image";

interface IImageProps {
  element: IImageInstance;
}

export const ImageElement = observer<IImageProps>(({ element }) => {
  const { id, src, x, y, width, height } = element;

  const [img] = useImage(src);

  return (
    <Image
      id={id}
      image={img}
      x={x}
      y={y}
      width={img?.width ?? width}
      height={img?.height ?? height}
      onDragEnd={(e) => {
        const pos = e.target.position();
        element.set({ x: pos.x, y: pos.y });
      }}
      draggable
    />
  );
});
