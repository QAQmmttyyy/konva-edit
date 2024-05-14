import Konva from "konva";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Rect } from "react-konva";
import colors from "tailwindcss/colors";
import { useStore } from "@/context/store-context";
import { ELEMENT_NODE_NAME } from "@/lib/constants";

export interface IHighlighterRef {
  highlight: (ev: Konva.KonvaPointerEvent) => void;
  hide: () => void;
}

export const Highlighter = forwardRef<IHighlighterRef>((_props, ref) => {
  const store = useStore();
  const [config, setConfig] = useState<Konva.RectConfig>();
  const prevTargetRef = useRef<Konva.KonvaPointerEvent["target"]>();

  useImperativeHandle(
    ref,
    () => {
      return {
        highlight: (ev) => {
          const target = ev.target;
          // selected element no need highlight
          if (
            target.hasName(ELEMENT_NODE_NAME) &&
            store.selectedElementsIds.includes(target.id())
          ) {
            return;
          }

          // from one element to another
          // or firstly enter one element
          if (
            prevTargetRef.current !== target &&
            target.hasName(ELEMENT_NODE_NAME)
          ) {
            prevTargetRef.current = target;
            setConfig({
              x: target.x(),
              y: target.y(),
              width: target.width(),
              height: target.height(),
              rotation: target.rotation(),
              visible: true,
            });
          }
          // just leave one element
          else if (
            prevTargetRef.current &&
            !target.hasName(ELEMENT_NODE_NAME)
          ) {
            prevTargetRef.current = undefined;
            setConfig({ visible: false });
          }
        },
        hide: () => {
          prevTargetRef.current = undefined;
          setConfig({ visible: false });
        },
      } satisfies IHighlighterRef;
    },
    [store.selectedElementsIds]
  );

  return (
    <Rect
      listening={false}
      visible={false}
      stroke={colors.sky[400]}
      strokeWidth={2}
      strokeScaleEnabled={false}
      {...config}
    />
  );
});
