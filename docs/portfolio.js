window.portfolio = {
  "name": "Manideep Sai",
  "role": "Software & experiments",
  "intro": "I’m Manideep Sai. I build software in Hyderabad. My projects usually start with a question: what can I cook with what I have, or how could someone use an app in the language they speak at home?",
  "about": "I’m K. Manideep Sai, a B.Tech student at CVR College of Engineering in Hyderabad, studying Computer Science and Engineering with a focus on AI and machine learning. I expect to graduate in 2027. I enjoy connecting a working model to something a person can actually use. In HealBuddy, that meant working with two teammates to connect symptom inputs to a classifier and a local chat interface. Away from the screen, I tinker with electronics. Space exploration first drew me to rovers, and I’d like to learn how they choose a route across unfamiliar terrain.",
  "training": "In 2025 I completed a 10-week virtual training program with AICTE & EduSkills, covering data preparation, feature engineering and model evaluation.",
  "skills": "Application development · Python, JavaScript, React, FastAPI and Express.\nMachine learning and retrieval · scikit-learn, NumPy, pandas, TF-IDF and cosine similarity.\nData and tools · SQL, MongoDB and Git.\nCurrently exploring · reinforcement learning with Pygame, Gymnasium and TensorFlow.",
  "email": "katurimanideepsai@gmail.com",
  "github": "https://github.com/ManideepSai-K",
  "linkedin": "https://www.linkedin.com/in/manideepsaikaturi/",
  "accent": "#c4f390",
  "cat": "Byte",
  "deskTrack": {
    "title": "Window Seat",
    "src": "window-seat.wav"
  },
  "resume": "Manideep-Sai-Resume.pdf",
  "tinkering": "I like ThinkPads and tinkering with hardware. Michael Reeves is one of my inspirations. One of my own builds was an automatic light with an Arduino Uno, a light sensor, and an LED.",
  "interests": "Away from coding, I play Minecraft, listen to music, and fill my notebook with doodles. My anime favorites include Attack on Titan, Hunter × Hunter, One Piece, Demon Slayer, Hajime no Ippo, Hell’s Paradise, and Haikyuu!!",
  "thoughts": [
    "“I slept well,” says Manideep. We both watched the sunrise from this sill.",
    "Exam day. He says he didn’t study. His friends would like a second opinion.",
    "The little forest in HealBuddy? A Random Forest. Sadly, no climbable trees.",
    "Manideep once wanted to be an astronaut. I’d settle for a window seat.",
    "Ingreedy starts with the main ingredients. Mine would be fish. Just fish.",
    "I’m running a local nap. Zero API calls.",
    "Psst. Type P, then Enter, to peek at the Projects book.",
    "Ollama runs HealBuddy’s chat model locally. The desk makes a fine sleeping spot.",
    "Click my ears if you have a question about Manideep."
  ],
  "projects": [
    {
      "name": "HealBuddy",
      "type": "Applied ML",
      "summary": "A symptom-to-condition classifier with a local language model for follow-up questions.",
      "stack": "Python · scikit-learn · FastAPI · Ollama",
      "detail": "I proposed HealBuddy and helped implement it in a team of three. The FastAPI backend sends symptom inputs to a Random Forest classifier. A separate Llama 3.2 model runs locally through Ollama to support follow-up questions.",
      "notes": [
        "I proposed this semester project and helped implement it in a team of three. We wanted someone to be able to enter symptoms and ask a follow-up question.",
        "FastAPI passes symptoms to a Random Forest classifier. A separate Llama model handles the conversation locally through Ollama.",
        "The classifier learns the conditions represented in its training data. Its output is a project demonstration, not a clinical diagnosis."
      ],
      "art": "health",
      "url": ""
    },
    {
      "name": "SaralQ",
      "type": "Language tools",
      "summary": "Archived, incomplete Chromium prototype for translating research papers.",
      "stack": "JavaScript · Express · Bhashini · Gemini",
      "detail": "I presented the SaralQ prototype at Megathon in 2025. Development stopped before completion. That idea later informed the proposal for MITRA, our final-year team project.",
      "notes": [
        "I wanted readers to explore a research paper in their own language.",
        "I explored connecting a Chromium extension to translation and summarization services.",
        "I presented the prototype as a Megathon finalist in 2025. Development stopped before completion."
      ],
      "art": "paper",
      "url": ""
    },
    {
      "name": "Ingreedy",
      "type": "Recommendation",
      "summary": "A live pantry recipe finder that puts your main ingredients first.",
      "stack": "Python · FastAPI · scikit-learn · React · Docker",
      "detail": "I built Ingreedy to find meals from the ingredients already in my kitchen. The React app sends a pantry list to FastAPI, which ranks recipes by main-ingredient coverage, missing ingredients, and TF-IDF similarity. The public demo runs on Render.",
      "notes": [
        "I built Ingreedy for my struggle meals, starting with the food already in my kitchen. I connected the React interface to a FastAPI backend and worked on how pantry items become recipe recommendations.",
        "Recipes using more of the main ingredients rank first. Missing ingredients come next, with TF-IDF similarity breaking ties. This prevents butter alone from pushing unrelated dishes ahead.",
        "Try the live demo with rice and eggs. The app shows missing ingredients, includes saved guides for simple meals, and links catalog recipes to their original instructions."
      ],
      "art": "food",
      "url": "https://ingreedy-27eo.onrender.com/",
      "linkLabel": "Try Ingreedy ↗"
    },
    {
      "name": "MITRA",
      "summary": "Final-year team project · documentation complete.",
      "detail": "MITRA is our final-year team project. We have completed the documentation for a multilingual voice-and-text assistant for Indian languages. Implementation is the next phase.",
      "notes": [
        "The idea grew out of my earlier SaralQ prototype. Our team is exploring how people could ask follow-up questions in their own language.",
        "Our project documentation describes a standalone app with voice and text input.",
        "Documentation is complete. Implementation and testing are ahead of us."
      ],
      "stack": "Planned stack · React · Web Speech API · FastAPI",
      "url": ""
    },
    {
      "name": "Game AI",
      "summary": "In progress · a reinforcement learning experiment in a 2D arcade game.",
      "detail": "I’m developing a Pygame environment to experiment with how a DQN agent learns from rewards.",
      "notes": [
        "I want to see how changing a reward changes the way an agent plays.",
        "I’m building a Pygame environment with a Gymnasium interface and working toward a TensorFlow DQN agent.",
        "The training experiment is in progress."
      ],
      "stack": "Python · Pygame · Gymnasium · TensorFlow",
      "url": ""
    }
  ]
};
