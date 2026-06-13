import React, { useEffect, useRef } from "react";

interface DatabaseNetworkBackgroundProps {
  isDark: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  isServerNode: boolean;
  label?: string;
}

export const CyberFingersBackground: React.FC<DatabaseNetworkBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize clean floating cluster nodes and server nodes
    const initializeNodes = (w: number, h: number) => {
      const list: Node[] = [];
      const nodeCount = Math.min(65, Math.floor((w * h) / 22000));
      
      const serverLabels = [
        "DB_PROD_REPLICA_1",
        "REDIS_LOCK_SENTINEL",
        "API_GULF_GATEWAY",
        "QUEUE_HORIZON_WORKER",
        "POSTGRES_MASTER_01"
      ];

      for (let i = 0; i < nodeCount; i++) {
        const isServerNode = i < 5;
        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: isServerNode ? Math.random() * 2 + 3.5 : Math.random() * 1.5 + 1.2,
          alpha: Math.random() * 0.5 + 0.3,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
          isServerNode,
          label: isServerNode ? serverLabels[i] : undefined
        });
      }
      nodesRef.current = list;
    };

    initializeNodes(width, height);

    // Handle Resize elegantly without layout jump
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight;
        // Keep existing nodes within bounds rather than wiping them entirely to avoid layout shifts
        nodesRef.current.forEach(node => {
          if (node.x > width) node.x = Math.random() * width;
          if (node.y > height) node.y = Math.random() * height;
        });
      }
    });

    resizeObserver.observe(canvas);

    // Mouse interactions
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Main animation loop
    const render = () => {
      // Clear with clearRect or elegant subtle fade to keep trailing light paths if desired
      ctx.clearRect(0, 0, width, height);

      // Render technical micro-grid dots for alignment (avoiding CLS, extremely lightweight)
      const gridSize = 45;
      const gridOpacity = isDark ? 0.03 : 0.05;
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, " + gridOpacity + ")" : "rgba(100, 116, 139, " + gridOpacity + ")";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Draw lines between nodes first (connections network)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
          const maxDist = 135;

          if (dist < maxDist) {
            // Calculate proximity opacity
            const factor = 1 - dist / maxDist;
            const finalAlpha = Math.min(n1.alpha, n2.alpha) * factor * (isDark ? 0.18 : 0.12);
            
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // Connect lines using a beautiful color spectrum
            if (isDark) {
              // Soft purples and indigos
              ctx.strokeStyle = `rgba(99, 102, 241, ${finalAlpha})`;
            } else {
              // Warm grays and subtle blue slate
              ctx.strokeStyle = `rgba(79, 70, 229, ${finalAlpha})`;
            }
            ctx.lineWidth = factor * 1.1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes and move them
      nodes.forEach((node) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off bounds
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gravity pull (subtle, non-disturbing grid hover effect)
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distToMouse = Math.hypot(dx, dy);
        
        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          // Softly attract
          node.x -= (dx / distToMouse) * force * 0.7;
          node.y -= (dy / distToMouse) * force * 0.7;
        }

        // Pulse server node elements
        node.pulsePhase += node.pulseSpeed;
        const currentPulse = Math.sin(node.pulsePhase) * 0.4 + 0.6; // 0.2 to 1.0

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (node.isServerNode ? (1 + currentPulse * 0.15) : 1), 0, Math.PI * 2);
        
        if (node.isServerNode) {
          // Glow server nodes
          const glowAlpha = node.alpha * (isDark ? 0.65 : 0.5);
          ctx.fillStyle = isDark 
            ? `rgba(168, 85, 247, ${glowAlpha})` // Fuchsia/purple in dark
            : `rgba(99, 102, 241, ${glowAlpha})`; // Indigo in light
          ctx.shadowBlur = isDark ? 8 : 4;
          ctx.shadowColor = isDark ? "rgba(168, 85, 247, 0.6)" : "rgba(99, 102, 241, 0.4)";
          ctx.fill();
          ctx.shadowBlur = 0; // Clear shadow
          
          // Outer halo
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3 * currentPulse, 0, Math.PI * 2);
          ctx.strokeStyle = isDark 
            ? `rgba(168, 85, 247, ${0.1 * currentPulse})` 
            : `rgba(99, 102, 241, ${0.08 * currentPulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Render micro technical labels for high developer detail
          if (node.label && distToMouse < 250) {
            ctx.font = "8px 'JetBrains Mono', monospace";
            ctx.fillStyle = isDark ? "rgba(224, 231, 255, 0.65)" : "rgba(30, 41, 59, 0.7)";
            ctx.textAlign = "left";
            ctx.fillText(node.label, node.x + 10, node.y + 3);
          }
        } else {
          // Standard node representation
          ctx.fillStyle = isDark 
            ? `rgba(129, 140, 248, ${node.alpha * 0.5})` 
            : `rgba(71, 85, 105, ${node.alpha * 0.45})`;
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      id="db_network_background_layer"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-500"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #090514 0%, #13112a 50%, #03010b 100%)" 
          : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)"
      }}
    />
  );
};
