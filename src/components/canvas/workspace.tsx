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

    setSize({ width, height });
  };

  useLayoutEffect(() => {
    handleWorkspaceResize();
  }, []);

  useEffect(() => {
    const workspaceDom = workspaceRef.current;
    const resizeObserver = new ResizeObserver(handleWorkspaceResize);

    resizeObserver.observe(workspaceDom!);

    return () => {
      resizeObserver.unobserve(workspaceDom!);
    };
  }, []);

  return (
    <div ref={workspaceRef} id="workspace" className="h-full w-full">
      <Page width={size.width} height={size.height} />
    </div>
  );
};
