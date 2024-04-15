import Konva from "konva";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Transformer } from "react-konva";
import { observer } from "mobx-react-lite";

export interface ISelectionBoxRef {
  nodes: (ids: string[]) => void;
}

export const SelectionBox = observer(
  forwardRef<ISelectionBoxRef>((_props, ref) => {
    const transformerRef = useRef<Konva.Transformer>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          nodes: (ids: string[]) => {
            if (transformerRef.current) {
              const transformer = transformerRef.current;
              const stage = transformer.getStage();
              const nodes = ids
                .map((id) => stage?.findOne("#" + id))
                .filter((node): node is Konva.Node => !!node);
              console.log("nodes", nodes);
              console.log("transformer", transformer.attrs);

              transformer.nodes(nodes);
              transformer.getLayer()?.batchDraw();
            }
          },
        };
      },
      []
    );

    return (
      <Transformer
        ref={transformerRef}
        anchorStyleFunc={(anchor) => {
          const _anchor = anchor as Konva.Rect;
          // anchor is Konva.Rect instance
          // you manually change its styling
          _anchor.cornerRadius(10);
          // you also can set other properties
          // e.g. you can set fillPatternImage to set icon to the anchor
        }}
      />
    );
  })
);
