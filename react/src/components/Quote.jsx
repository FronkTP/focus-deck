import { useEffect, useState } from "react";

const quotes = [
  "Don't only do the things you enjoy. Also enjoy the things you're doing.",
  "When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has been opened for us.",
  "Focus on being productive instead of busy.",
  "If you spend too much time thinking about a thing, you'll never get it done.",
  "Nothing is particularly hard when you divide it into small jobs.",
  "To simplify before you understand the details is ignorance. To simplify after you understand the details is genius.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don't let yourself be lulled into inaction.",
  "The secret of getting ahead is getting started.",
];

const authors = [
  "Ali Abdaal",
  "Alexander Graham Bell",
  "Tim Ferriss",
  "Bruce Lee",
  "Henry Ford",
  "James Clear",
  "Aristotle",
  "Chinese Proverb",
  "Bill Gates",
  "Mark Twain",
];

export default function Quote() {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [loading, setLoading] = useState(true);

  const generateNew = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://stoic.tekloon.net/stoic-quote"
      );
      const data = await response.json();
      if (data?.data?.quote && data?.data?.author) {
        setQuoteData({ quote: data.data.quote, author: data.data.author });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuoteData({
        quote: quotes[randomIndex],
        author: authors[randomIndex],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateNew();
  }, []);

  return (
    <div
      className="quote"
      id="quote-display"
      onClick={generateNew}
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
