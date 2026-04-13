"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode | ((progress: MotionValue<number>) => React.ReactNode);
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Phase 1 (0–5%): Tab rotates from 20° to tilted reading angle (8°), title slides in
  // Phase 2 (5–80%): Tab stays at 8° while text scrolls
  // Phase 3 (80–95%): Tab straightens from 8° to 0°
  // Phase 4 (95–100%): Section scrolls away naturally
  const rotate = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.95], [20, 15, 15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], scaleDimensions());
  const headerTranslate = useTransform(scrollYProgress, [0, 0.05], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.88], [0, 1, 1, 0]);

  return (
    <div
      className="h-[400vh] flex items-start justify-center relative w-full"
      ref={containerRef}
    >
      <div
        className="w-full sticky top-0 h-screen flex flex-col items-center justify-center pt-8 overflow-hidden"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={headerTranslate} opacity={headerOpacity} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {typeof children === "function" ? children(scrollYProgress) : children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, opacity, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-[95vw] lg:max-w-6xl mt-4 md:mt-8 mx-auto h-[65vh] md:h-[80vh] w-full border-[8px] md:border-[16px] border-[#1f1f1f] p-2 md:p-3 bg-[#111111] rounded-[2rem] md:rounded-[3rem] shadow-2xl relative"
    >
      <div className="h-full w-full overflow-hidden rounded-[1rem] md:rounded-[2.25rem] bg-[#fdfdfd] relative">
        {children}
      </div>
    </motion.div>
  );
};
