import Konva from "konva";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import colors from "tailwindcss/colors";

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

              transformer.nodes(nodes);
              transformer.getLayer()?.batchDraw();
            }
          },
        } satisfies ISelectionBoxRef;
      },
      []
    );

    return (
      <Transformer
        ref={transformerRef}
        ignoreStroke
        rotateAnchorOffset={30}
        borderStroke={colors.sky[400]}
        borderStrokeWidth={2}
        anchorStroke={colors.sky[400]}
        anchorStrokeWidth={2}
        anchorStyleFunc={(anchor) => {
          const _anchor = anchor as Konva.Rect;
          _anchor.cornerRadius(10);
        }}
      />
    );
  })
);
