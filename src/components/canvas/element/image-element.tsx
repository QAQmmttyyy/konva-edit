import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Image } from "react-konva";
import useImage from "use-image";
import { IImageInstance, IImageSnapshotIn } from "@/model/image-model";

interface IImageProps {
  element: IImageInstance;
}

export const ImageElement = observer<IImageProps>(({ element }) => {
  const { id, src, x, y, width, height, rotation } = element;

  const [img] = useImage(src);

  return (
    <Image
      id={id}
      name="element"
      image={img}
      x={x}
      y={y}
      width={width || img?.width || 0}
      height={height || img?.height || 0}
      rotation={rotation}
      onDragEnd={(ev) => {
        const pos = ev.target.position();
        element.set({ x: pos.x, y: pos.y });
      }}
      onTransform={(ev) => {
        const imageNode = ev.currentTarget;
        imageNode.setAttrs({
          width: imageNode.width() * imageNode.scaleX(),
          height: imageNode.height() * imageNode.scaleY(),
          rotation: imageNode.rotation(),
          scaleX: 1,
          scaleY: 1,
        } satisfies Konva.NodeConfig);
      }}
      onTransformEnd={(ev) => {
        const imageNode = ev.currentTarget;
        element.set({
          width: imageNode.width() * imageNode.scaleX(),
          height: imageNode.height() * imageNode.scaleY(),
          rotation: imageNode.rotation(),
        } satisfies Omit<IImageSnapshotIn, "id">);
      }}
      draggable
    />
  );
});
