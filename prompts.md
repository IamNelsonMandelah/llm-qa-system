#  Prompt Documentation for AI Q&A Assistant

This document explains how prompts are structured and sent to the Gemini LLM (Large Language Model) used in this project.

---

##  What is a Prompt?

A prompt in this context is the user's natural-language question that is sent directly to Google's Gemini model. The application sends this question with no additional formatting or context.

---

##  Prompt Flow

1. User types a question in the frontend.
2. That question is sent as JSON in a POST request to the backend at `/api/ask`.
3. The backend sends the `question` string to Gemini’s `generate_content()` method.
4. The Gemini model responds with an AI-generated answer.
5. The frontend displays the answer.

---

##  Example Prompts and Responses

### Example Conversation: Travel from Kenya to Ireland

| Prompt (User Input)                                                                 | Gemini Response (Simplified)                                                             |
|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| What documents are required to travel from Kenya to Ireland?                         | Kenyan citizens need a valid passport, visa, proof of funds, accommodation, etc.        |
| Do I need travel insurance to enter Ireland?                                         | It's not mandatory, but highly recommended to cover emergencies.                        |
| How long does it take to process an Irish visa in Kenya?                             | Visa processing usually takes 15–30 working days. Check the INIS site for updates.      |
| Can I apply for the Irish visa online or must I go to the embassy?                   | You apply online through AVATS, but biometric data must be submitted at the embassy.    |
| How much money do I need to show for the visa?                                       | You need to prove you can support yourself; exact figures depend on length of stay.     |

### More General Prompts

| Prompt                                            | Gemini Response (Simplified)                      |
|---------------------------------------------------|---------------------------------------------------|
| What is the capital city of Kenya?                | Nairobi                                           |
| Who is the president of South Africa?             | Cyril Ramaphosa (as of 2025)                      |
| Explain what a solar eclipse is.                  | A solar eclipse occurs when the Moon blocks the Sun... |
| How does photosynthesis work?                     | Plants convert sunlight into energy using chlorophyll... |

---

##  Prompt Format (API Example)

```json
{
  "question": "What documents are required to travel from Kenya to Ireland?"
}
