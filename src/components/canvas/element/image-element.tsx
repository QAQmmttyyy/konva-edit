import { Image } from "react-konva";
import { observer } from "mobx-react-lite";
import { IImageInstance } from "@/model/image-model";
import useImage from "use-image";

interface IImageProps {
  element: IImageInstance;
}

export const ImageElement = observer<IImageProps>(({ element }) => {
  const [img] = useImage(element.src);
  return <Image image={img} x={element.x} y={element.y} />;
});
