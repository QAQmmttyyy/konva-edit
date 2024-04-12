import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Page } from "./page";

export const Workspace = () => {
  const [size, setSize] = useState({
    width: 10,
    height: 10,
  });
  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleWorkspaceResize = () => {
    const workspaceDom = workspaceRef.current;
    if (!workspaceDom) return;

    const { width, height } = workspaceDom.getBoundingClientRect();
    console.log("width", width, "height", height);

    const newSize = { width, height };
    setSize(newSize);
  };

  useLayoutEffect(() => {
    handleWorkspaceResize();
  }, []);

  // TODO handle resize 现在有问题
  useEffect(() => {
    const workspaceDom = workspaceRef.current;
    const resizeObserver = new ResizeObserver(handleWorkspaceResize);
    console.log("workspaceDom", typeof workspaceDom);

    resizeObserver.observe(workspaceDom!);

    return () => {
      resizeObserver.unobserve(workspaceDom!);
    };
  }, []);

  return (
    <div ref={workspaceRef} id="workspace" className="h-full w-full flex-1">
      <Page width={size.width} height={size.height} />
    </div>
  );
};
