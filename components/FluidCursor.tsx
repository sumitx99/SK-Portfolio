"use client";
import { useRef } from "react";
import useFluidCursor from "@/hooks/useFluidCursor";

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // CORRECT: Call the hook at the top level. 
  // The hook itself handles the useEffect internally.
  useFluidCursor(canvasRef);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        id="fluid"
        className="w-full h-full block"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
};
export default FluidCursor;