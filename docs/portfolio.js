window.portfolio = {
  name: "Manideep Sai", role: "Personal workspace",
  intro: "I’m Manideep. I built a recipe finder for my struggle meals and a browser extension for reading research papers. This is my desk. Pick a project or try the light sensor on the ThinkPad.",
  about: "I’m a B.Tech student at CVR College of Engineering in Hyderabad, studying Artificial Intelligence & Machine Learning and graduating in 2027. I learn by building things I want to use.",
  training: "In 2025 I completed a 10-week virtual training program with AICTE & EduSkills, covering data preparation, feature engineering and model evaluation.",
  skills: "Python, scikit-learn, Pandas, NumPy, FastAPI, Ollama, JavaScript, React, Node.js, SQL and MongoDB.",
  email: "katurimanideepsai@gmail.com", github:"https://github.com/ManideepSai-K", linkedin:"https://www.linkedin.com/in/manideepsaikaturi/",
  accent:"#c4f390", cat:"Byte",
  deskTrack:{title:'Window Seat',src:'window-seat.wav'},
  resume:"Manideep-Sai-Resume.pdf",
  tinkering:"I like ThinkPads and tinkering with hardware. Michael Reeves is one of my inspirations. One of my own builds was an automatic light with an Arduino Uno, a light sensor, and an LED.",
  interests:"Away from coding, I play Minecraft, listen to music, and fill my notebook with doodles. My anime favorites include Attack on Titan, Hunter × Hunter, One Piece, Demon Slayer, Hajime no Ippo, Hell’s Paradise, and Haikyuu!!",
  thoughts:[
    "“I slept well,” says Manideep. We both watched the sunrise from this sill.",
    "Exam day. He says he didn’t study. His friends would like a second opinion.",
    "The little forest in HealBuddy? A Random Forest. Sadly, no climbable trees.",
    "SaralQ remembers translated pages. I remember every warm spot on this sill.",
    "Ingreedy ranks recipes by ingredient similarity. My query is always “fish”.",
    "I’m running a local nap. Zero API calls.",
    "Psst. Type P, then Enter, to peek at the Projects book.",
    "Ollama runs HealBuddy’s chat model locally. The desk makes a fine sleeping spot.",
    "Click my ears if you have a question about Manideep."
  ],
  projects:[
    {name:"HealBuddy",type:"Applied ML",summary:"A symptom-to-condition classifier with a local language model for follow-up questions.",stack:"Python · scikit-learn · FastAPI · Ollama",detail:"I proposed HealBuddy and helped implement it in a team of three. The FastAPI backend sends symptom inputs to a Random Forest classifier. A separate Llama 3.2 model runs locally through Ollama to support follow-up questions.",notes:["I proposed this semester project and helped implement it in a team of three. We wanted someone to be able to enter symptoms and ask a follow-up question.", "FastAPI passes symptoms to a Random Forest classifier. A separate Llama model handles the conversation locally through Ollama.", "The classifier learns the conditions represented in its training data. Its output is a project demonstration, not a clinical diagnosis."],art:"health",url:""},
    {name:"SaralQ",type:"Language tools",summary:"A browser extension that makes research papers easier to read across languages.",stack:"JavaScript · Express · Bhashini · Gemini",detail:"SaralQ connects a Chromium extension to translation services through Node.js and Express. Readers can choose a language, revisit cached translations, and generate summaries and quizzes. I presented SaralQ as a Megathon finalist in 2025.",notes:["Reading a paper across languages meant leaving the page and translating the same material again on a return visit.", "I connected the Chromium extension to translation services through Express and cached translated pages for repeat visits.", "I presented SaralQ as a Megathon finalist in 2025. The translation comes from Bhashini, while Gemini handles summaries and quizzes."],art:"paper",url:""},
    {name:"Ingreedy",type:"Recommendation",summary:"A recipe finder that starts with the ingredients already in your kitchen.",stack:"Python · TF-IDF · React · MongoDB",detail:"I built Ingreedy for those evenings when I had ingredients but no idea what to cook. It represents ingredients with TF-IDF and ranks recipes by cosine similarity. A Gemini integration offers explanations and ingredient substitutions.",notes:["I built this for my struggle meals. I wanted to start with what was already in my kitchen.", "I used TF-IDF to represent ingredient lists and cosine similarity to rank recipes. Gemini explains a suggestion or offers substitutions.", "A high similarity score can still mean a missing ingredient. That distinction matters when deciding what I can actually cook."],art:"food",url:""}
  ]
};
