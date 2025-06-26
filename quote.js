const quoteTexts = [
    "Don't only do the things you enjoy. Also enjoy the things you're doing.",
    "When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has been opened for us.",
    "Focus on being productive instead of busy.",
    "If you spend too much time thinking about a thing, you'll never get it done.",
    "Nothing is particularly hard when you divide it into small jobs.",
    "To simplify before you understand the details is ignorance. To simplify after you understand the details is genius.",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten. Don't let yourself be lulled into inaction.",
    "The secret of getting ahead is getting started."
]
const quoteAuthors = [
    "Ali Abdaal",
    "Alexander Graham Bell",
    "Tim Ferriss",
    "Bruce Lee",
    "Henry Ford",
    "James Clear",
    "Aristotle",
    "Chinese Proverb",
    "Bill Gates",
    "Mark Twain"
]

window.onload = generateRandomQuote
document.getElementById('quote-display').addEventListener('click', generateRandomQuote)

function generateRandomQuote() {
    const randomNumber = Math.floor(Math.random() * quoteTexts.length)
    const quoteText = quoteTexts[randomNumber]
    const quoteAuthor = quoteAuthors[randomNumber]

    document.getElementById('quote-text').textContent = `"${quoteText}"`
    document.getElementById('quote-author').textContent = quoteAuthor
}
