import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  ChefHat,
  Sparkles,
  Loader2,
} from "lucide-react";

const RecipeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your culinary assistant! 👨‍🍳 Ask me about recipes, cooking tips, or ingredient substitutions!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses - in production, this would call an actual AI API
  const getBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Recipe suggestions
    if (
      lowerMessage.includes("suggest") ||
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("what should")
    ) {
      return "Based on popular choices, I'd recommend trying our Chicken Parmesan, Thai Green Curry, or classic Spaghetti Carbonara! What type of cuisine are you in the mood for?";
    }

    // Cooking tips
    if (lowerMessage.includes("how to") || lowerMessage.includes("cook")) {
      return "Great question! For best results, always preheat your oven, use fresh ingredients when possible, and don't be afraid to taste as you go. What specific dish are you working on?";
    }

    // Ingredient substitutions
    if (
      lowerMessage.includes("substitute") ||
      lowerMessage.includes("instead of") ||
      lowerMessage.includes("replace")
    ) {
      return "For common substitutions:\n• Butter → Coconut oil or olive oil\n• Eggs → Flax eggs or applesauce\n• Milk → Almond, soy, or oat milk\n\nWhat ingredient are you looking to substitute?";
    }

    // Dietary restrictions
    if (
      lowerMessage.includes("vegetarian") ||
      lowerMessage.includes("vegan") ||
      lowerMessage.includes("gluten")
    ) {
      return "We have plenty of options for special diets! Use our category filters to find Vegetarian recipes, or search for specific dietary requirements. Would you like me to suggest some recipes?";
    }

    // Meal planning
    if (lowerMessage.includes("meal plan") || lowerMessage.includes("week")) {
      return "Meal planning is a great way to stay organized! I recommend:\n1. Choose 3-4 main dishes\n2. Prep ingredients on Sunday\n3. Mix proteins and veggies\n4. Don't forget snacks!\n\nNeed help picking recipes for the week?";
    }

    // Default response
    const responses = [
      "That's a great question! While I'm learning more about cooking every day, I can help you search our recipe database. Try using the search bar above!",
      "I love your curiosity! Have you tried browsing by cuisine type? We have recipes from around the world!",
      "Interesting! For the best answer, I'd recommend checking out our recipe collection. What type of dish interests you most?",
      "Good thinking! You can filter recipes by category or search for specific ingredients. What are you craving today?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(
      async () => {
        const botResponse = await getBotResponse(input);
        const botMessage = {
          type: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const quickQuestions = [
    "Suggest a recipe",
    "Vegetarian options?",
    "Quick dinner ideas",
    "Dessert recipes",
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
        }`}
        style={{
          boxShadow: isOpen
            ? "0 10px 40px rgba(220, 38, 38, 0.5)"
            : "0 10px 40px rgba(59, 130, 246, 0.5)",
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950 animate-pulse"></span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-150 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 z-50 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChefHat className="w-8 h-8 text-white" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white">Recipe Assistant</h3>
                <p className="text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-800 text-gray-100 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-blue-200"
                        : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 space-y-2">
              <p className="text-xs text-gray-500 font-medium">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-gray-900 border-t border-gray-800"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about recipes..."
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default RecipeChatbot;
