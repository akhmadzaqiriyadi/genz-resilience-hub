import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Loading = () => {
  const navigate = useNavigate();

  const messages = [
    "Menganalisis jawabanmu...",
    "Menghitung skor resiliensi...",
    "Menyiapkan insights personalmu...",
    "Menyusun tips khusus untukmu..."
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 1000);

    // Navigate to results after 4 seconds
    const timer = setTimeout(() => {
      navigate('/results');
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Animated Loader */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-gradient-primary opacity-20 blur-xl animate-pulse" />
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Oke, beres!
          </h2>
          <p className="text-xl text-muted-foreground animate-pulse">
            {messages[currentMessage]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 justify-center">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMessage ? 'bg-primary w-8' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
