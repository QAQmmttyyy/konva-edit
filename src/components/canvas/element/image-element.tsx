import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { ELEMENT_NODE_NAME } from "@/lib/constants";
import { IImageInstance, IImageSnapshotIn } from "@/model/image-model";

interface IImageElementProps {
  element: IImageInstance;
}

export const ImageElement = observer<IImageElementProps>(({ element }) => {
  const { id, src, x, y, width, height, rotation } =
    element.processedSelf as IImageInstance;

  const [img, status] = useImage(src);

  useEffect(() => {
    if (status === "loaded" && img) {
      // TODO not push to undo
      element.set({ width: img.width, height: img.height });
    }
  }, [element, img, status]);

  // TODO add loading/failed/default img assets to show
  return (
    <Image
      id={id}
      name={ELEMENT_NODE_NAME}
      image={img}
      x={x}
      y={y}
      width={width ?? (img?.width || 0)}
      height={height ?? (img?.height || 0)}
      rotation={rotation}
      onDragEnd={(ev) => {
        const pos = ev.target.position();
        element.set({ ...pos });
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
