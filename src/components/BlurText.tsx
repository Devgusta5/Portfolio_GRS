interface BlurTextProps {
  text: string;
  className?: string;
  delayStep?: number;
}

export function BlurText({ text, className = "", delayStep = 0.07 }: BlurTextProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="animate-blur-reveal mr-[0.3em] inline-block"
          style={{ animationDelay: `${i * delayStep}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
