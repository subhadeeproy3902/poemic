"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
            >
              {
                // if in the word \n is found, replace it with a line break
                word.split("\\n").map((w, i) => {
                  return (
                    <span key={w + i}>
                      {w}{" "}
                      {i < word.split("\\n").length - 1 && <br />}
                    </span>
                  );
                })
              }
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-normal lucida min-h-[450px]", className)}>
      <div className="mt-4">
        <div className="text-lg leading-snug tracking-wide whitespace-pre-wrap">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
