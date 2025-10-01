import { useEffect, useState } from "react";

const quotes = [
  {
    quote:
      "Don't only do the things you enjoy. Also enjoy the things you're doing.",
    author: "Ali Abdaal",
  },
  {
    quote:
      "When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has been opened for us.",
    author: "Alexander Graham Bell",
  },
  {
    quote: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
  {
    quote:
      "If you spend too much time thinking about a thing, you'll never get it done.",
    author: "Bruce Lee",
  },
  {
    quote: "Nothing is particularly hard when you divide it into small jobs.",
    author: "Henry Ford",
  },
  {
    quote:
      "To simplify before you understand the details is ignorance. To simplify after you understand the details is genius.",
    author: "James Clear",
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    quote:
      "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don't let yourself be lulled into inaction.",
    author: "Bill Gates",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
];

export default function Quote() {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);

  // const randomiseQuote = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("https://stoic.tekloon.net/stoic-quote");
  //     const data = await response.json();
  //     if (data?.data?.quote && data?.data?.author) {
  //       setQuoteData({ quote: data.data.quote, author: data.data.author });
  //     } else {
  //       throw new Error("Invalid API response");
  //     }
  //   } catch (error) {
  //     const randomIndex = Math.floor(Math.random() * quotes.length);
  //     setQuoteData(quotes[randomIndex]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const randomiseQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuoteData(quotes[randomIndex]);
    setLoading(false);
  };

  useEffect(() => {
    randomiseQuote();
  }, []);

  return (
    <div
      className="quote"
      id="quote-display"
      onClick={randomiseQuote}
      style={{ cursor: "pointer" }}
    >
      {loading ? (
        <p className="quote__text">Loading...</p>
      ) : (
        <>
          <p className="quote__text">"{quoteData.quote}"</p>
          <p className="quote__author">- {quoteData.author}</p>
        </>
      )}
    </div>
  );
}
