import React from 'react';

const phrase = "The result: 4–8x more content. 50–65% more traffic. 10–20 hours saved every week. Marketing that stops being an expense and starts being a revenue engine.";

export const ResultsTypographySection = () => {
  const words = phrase.split(" ");

  return (
    <section className="py-24 md:py-40 bg-zinc-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        <p className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] md:leading-[1.05] text-zinc-900">
          {words.map((word, i) => {
            // Highlight logic to match previous design but static
            const isHighlight = word.includes("4–8x") || word.includes("50–65%") || word.includes("10–20") || word.includes("revenue");

            return (
              <span key={i} className="inline-block mr-[0.3em] mb-[0.1em]">
                {isHighlight ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};
