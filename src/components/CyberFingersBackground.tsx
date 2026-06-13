import React, { useEffect, useRef } from "react";

interface Joint {
  x: number;
  y: number;
}

interface Finger {
  joints: Joint[];
  length: number;
  angleOffset: number;
}

interface CyberFingersBackgroundProps {
  isDark: boolean;
}

export const CyberFingersBackground: React.FC<CyberFingersBackgroundProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      activeRef.current = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cyber Hand State
    // A wrist point and 5 fingers with segments
    const wrist = { x: width / 2, y: height + 100 };
    
    // Create 5 fingers (0: Thumb, 1: Index, 2: Middle, 3: Ring, 4: Pinky)
    const fingers: Finger[] = [
      { joints: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], length: 50, angleOffset: -0.6 }, // Thumb
      { joints: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], length: 75, angleOffset: -0.3 }, // Index
      { joints: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], length: 85, angleOffset: 0.0 },  // Middle
      { joints: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], length: 78, angleOffset: 0.25 }, // Ring
      { joints: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], length: 60, angleOffset: 0.5 },  // Pinky
    ];

    // Seed initial position
    fingers.forEach((finger) => {
      finger.joints.forEach((joint) => {
        joint.x = width / 2;
        joint.y = height + 50;
      });
    });

    // Floating background code characters
    const codeChars = ["{", "}", "=>", "PHP", "API", "</>", ";", "DB", "SQL", "Redis", "[]"];
    const floats = Array.from({ length: 18 }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        size: Math.random() * 10 + 10,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.3 - 0.1,
        opacity: Math.random() * 0.25 + 0.05,
      };
    });

    // Sparks and Ripples for enhanced animations
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }

    let sparks: Spark[] = [];
    let ripples: Ripple[] = [];

    // Particle emitter for mouse motion / fingertip trails
    let lastMouseX = width / 2;
    let lastMouseY = height / 2;

    const createSparksBurst = (x: number, y: number, count: number) => {
      const colors = ["#6366f1", "#a855f7", "#3b82f6", "#22c55e", "#ec4899"];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1.5,
        });
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Add ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: 120,
        alpha: 0.8,
      });
      // Add burst of neon Sparks
      createSparksBurst(e.clientX, e.clientY, 16);
    };

    window.addEventListener("click", handleMouseClick);

    let time = 0;

    const render = () => {
      time += 0.01;
      
      // Clear canvas with subtle trail
      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Create sparse trails when mouse moves fast
      const distMoved = Math.hypot(targetX - lastMouseX, targetY - lastMouseY);
      if (distMoved > 4 && Math.random() < 0.45) {
        sparks.push({
          x: targetX + (Math.random() - 0.5) * 8,
          y: targetY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          alpha: 0.7,
          color: isDark ? "#818cf8" : "#4f46e5",
          size: Math.random() * 2 + 1,
        });
      }
      lastMouseX = targetX;
      lastMouseY = targetY;

      // Wrist smoothly follows the mouse from a distance (like a hand reaching from bottom-right)
      // The wrist will position itself underneath and slightly offset from the target
      const wristTargetX = targetX + Math.sin(time * 0.5) * 40;
      const wristTargetY = targetY + 280 + Math.cos(time * 0.3) * 30;

      wrist.x += (wristTargetX - wrist.x) * 0.08;
      wrist.y += (wristTargetY - wrist.y) * 0.08;

      // Prevent wrist from going too high
      if (wrist.y < height / 2) {
        wrist.y = height / 2;
      }

      // Draw floats and react to hand fingertips
      ctx.font = "bold 12px monospace";
      floats.forEach((f) => {
        // Move float
        f.x += f.speedX;
        f.y += f.speedY;

        // Loop boundaries
        if (f.y < -30) f.y = height + 30;
        if (f.x < -30) f.x = width + 30;
        if (f.x > width + 30) f.x = -30;

        // Interactive dispersion: push characters away from mouse
        const dx = f.x - targetX;
        const dy = f.y - targetY;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const force = (150 - dist) * 0.05;
          f.x += (dx / dist) * force;
          f.y += (dy / dist) * force;
        }

        ctx.fillStyle = isDark
          ? `rgba(99, 102, 241, ${f.opacity})` 
          : `rgba(99, 102, 241, ${f.opacity * 0.6})`;
        ctx.font = `${f.size}px monospace`;
        ctx.fillText(f.char, f.x, f.y);
      });

      // Update and Draw Cyber fingers
      fingers.forEach((finger, fIndex) => {
        // Find finger target base relative to wrist
        const spreadAngle = finger.angleOffset + Math.sin(time) * 0.05;
        
        // Target angle points from wrist to target position
        const dx = targetX - wrist.x;
        const dy = targetY - wrist.y;
        const angleToMouse = Math.atan2(dy, dx);
        const finalAngle = angleToMouse + spreadAngle;

        // Update joint 0 (base joint)
        const baseOffsetDist = 35 + fIndex * 8;
        const baseTargetX = wrist.x + Math.cos(angleToMouse - Math.PI/2 + (fIndex - 2) * 0.2) * baseOffsetDist;
        const baseTargetY = wrist.y + Math.sin(angleToMouse - Math.PI/2 + (fIndex - 2) * 0.2) * baseOffsetDist;

        finger.joints[0].x += (baseTargetX - finger.joints[0].x) * 0.15;
        finger.joints[0].y += (baseTargetY - finger.joints[0].y) * 0.15;

        // Target for the fingertip is towards the mouse coordinate
        // Add natural finger offsets so they form a beautiful palm structure
        const spreadDistance = 35 + Math.sin(time + fIndex) * 8;
        const fingertipTargetX = targetX + Math.cos(finalAngle - 0.2) * (spreadDistance + (2 - Math.abs(2 - fIndex)) * 12);
        const fingertipTargetY = targetY + Math.sin(finalAngle - 0.2) * (spreadDistance + (2 - Math.abs(2 - fIndex)) * 12);

        // Update intermediate joints (Forward-Backward spring interpolation)
        const totalJoints = finger.joints.length;
        
        // Fingertip (last joint) follows mouse tip directly with lag
        const tipJointIndex = totalJoints - 1;
        finger.joints[tipJointIndex].x += (fingertipTargetX - finger.joints[tipJointIndex].x) * 0.12;
        finger.joints[tipJointIndex].y += (fingertipTargetY - finger.joints[tipJointIndex].y) * 0.12;

        // Intermediary joints smoothly align and distribute between base and tip
        for (let j = 1; j < tipJointIndex; j++) {
          // Weight blending
          const ratio = j / totalJoints;
          const blendX = finger.joints[0].x + (finger.joints[tipJointIndex].x - finger.joints[0].x) * ratio;
          const blendY = finger.joints[0].y + (finger.joints[tipJointIndex].y - finger.joints[0].y) * ratio;
          
          // Add some dynamic finger curve/sine waviness to mimic organic "typing/kneading" knuckles
          const curveFactor = Math.sin(time * 2.5 + fIndex * 0.8 + j * 1.5) * 8;
          const normalAngle = finalAngle + Math.PI / 2;

          const targetJointX = blendX + Math.cos(normalAngle) * curveFactor;
          const targetJointY = blendY + Math.sin(normalAngle) * curveFactor;

          // Interpolate
          finger.joints[j].x += (targetJointX - finger.joints[j].x) * 0.2;
          finger.joints[j].y += (targetJointY - finger.joints[j].y) * 0.2;
        }

        // --- DRAW FINGER CONNECTIONS ---
        // Neon cyber theme: glowing lines and node points
        ctx.beginPath();
        ctx.moveTo(wrist.x, wrist.y);
        ctx.lineTo(finger.joints[0].x, finger.joints[0].y);
        
        for (let j = 0; j < totalJoints - 1; j++) {
          ctx.lineTo(finger.joints[j + 1].x, finger.joints[j + 1].y);
        }

        ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.28)" : "rgba(99, 102, 241, 0.12)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = isDark ? "rgba(139, 92, 246, 0.5)" : "rgba(139, 92, 246, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw joint circles
        finger.joints.forEach((joint, jIndex) => {
          const isTip = jIndex === totalJoints - 1;
          const size = isTip ? 4 : 2.5;

          // Draw neon glow for fingertip
          if (isTip) {
            ctx.beginPath();
            ctx.arc(joint.x, joint.y, size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.08)";
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(joint.x, joint.y, size, 0, Math.PI * 2);
          ctx.fillStyle = isTip 
            ? "#6366f1" 
            : isDark ? "#c084fc" : "#818cf8";
          ctx.fill();
        });
      });

      // Draw abstract wrist structure
      ctx.beginPath();
      ctx.arc(wrist.x, wrist.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(wrist.x, wrist.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#6366f1" : "#4f46e5";
      ctx.fill();

      // Draw subtle connecting wire mesh/wrist band
      ctx.beginPath();
      ctx.moveTo(wrist.x - 14, wrist.y);
      ctx.lineTo(wrist.x - 25, height + 50);
      ctx.moveTo(wrist.x + 14, wrist.y);
      ctx.lineTo(wrist.x + 25, height + 50);
      ctx.strokeStyle = isDark ? "rgba(99, 102, 241, 0.12)" : "rgba(99, 102, 241, 0.06)";
      ctx.stroke();

      // --- ANIMATE AND RENDER NEON SPARKS ---
      sparks.forEach((spark, index) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.04; // gravity drift
        spark.alpha -= 0.015;

        if (spark.alpha <= 0) {
          sparks.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = spark.color;
        ctx.fill();
        ctx.restore();
      });

      // --- ANIMATE AND RENDER ENERGETIC RIPPLES ---
      ripples.forEach((ripple, index) => {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.06;
        ripple.alpha -= 0.012;

        if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius - 2) {
          ripples.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark 
          ? `rgba(99, 102, 241, ${ripple.alpha})` 
          : `rgba(79, 70, 229, ${ripple.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#6366f1";
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-70 dark:opacity-60"
      style={{ isolation: "isolate" }}
    />
  );
};
