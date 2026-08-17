// TrustLens AI - AI Service (powered by OpenRouter, free tier, no billing required)
// Handles the actual call to the AI and returns structured scam analysis.

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Free models sometimes get pulled from OpenRouter's free tier without notice.
// We try them in order and fall back to the next one if a model is unavailable.
const MODEL_FALLBACKS = [
  "openai/gpt-oss-20b:free",
  "inclusionai/ling-3.0-flash:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "google/gemma-3-27b-it:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "mistralai/mistral-7b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
];

function buildPrompt(category, message, language = "english") {
  const languageInstruction =
    language === "tamil"
      ? `Write the explanation, redFlags, and safetyTips in NATURAL, GRAMMATICALLY CORRECT spoken Tamil (பேச்சு தமிழ்) - the way a Tamil person actually talks, NOT a word-by-word translation from English (that produces broken grammar). Double-check each sentence makes proper grammatical sense in Tamil before writing it.

Follow this exact style, copying the sentence patterns below:
- Explanation example: "இது ஒரு ஏமாற்று மெசேஜ். இதுல இருக்குற ஆபர் நம்ப முடியாதது. காசு கேட்குறது சந்தேகமா இருக்கு."
- Red flag examples: "பாஸ்வேர்டு கேட்குறாங்க", "பணம் கேட்குறாங்க முன்னாடியே", "பயமுறுத்தி சொல்றாங்க"
- Safety tip examples: "இணைப்பை க்ளிக் பண்ணாதீங்க", "யாருக்கும் பாஸ்வேர்டு சொல்லாதீங்க", "நேரடியா நிறுவனத்த தொடர்பு கொள்ளுங்க"

Keep every sentence short (4-7 words) and grammatically complete - not fragments.`
      : "Write the explanation, redFlags, and safetyTips in very simple, natural, grammatically correct English, using short complete sentences and everyday words. Avoid technical or overly formal language.";

  return `You are a fraud analyst AI inside a scam-detection app called TrustLens AI, helping everyday people (including people with little education) understand scams.

Analyze the following message, which the user has flagged as a possible "${category}".

Message:
"""
${message}
"""

${languageInstruction}

Respond ONLY with valid JSON (no markdown, no backticks, no extra text) in exactly this shape:

{
  "riskScore": <number 0-100>,
  "category": "<short scam category name>",
  "isScam": <true or false>,
  "explanation": "<2-3 short, simple sentences explaining why this is or isn't suspicious>",
  "redFlags": ["<short simple red flag 1>", "<short simple red flag 2>", "..."],
  "safetyTips": ["<short simple actionable safety tip 1>", "<short simple actionable safety tip 2>", "..."]
}

If the message looks completely safe, still return the JSON with a low riskScore and isScam: false, and redFlags as an empty array.`;
}

async function callModel(model, category, message, language) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: buildPrompt(category, message, language),
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content || "";
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

export async function analyzeMessage(category, message, language = "english") {
  if (!API_KEY) {
    throw new Error(
      "OpenRouter API key is missing. Check your .env file (VITE_OPENROUTER_API_KEY)."
    );
  }

  let lastError;
  for (const model of MODEL_FALLBACKS) {
    try {
      return await callModel(model, category, message, language);
    } catch (err) {
      lastError = err;
      // If this model is unavailable (404) or rate-limited (429), try the next one.
      // For any other error, stop immediately instead of wasting more calls.
      if (!err.message.includes("404") && !err.message.includes("429")) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All AI models are currently unavailable. Try again later.");
}