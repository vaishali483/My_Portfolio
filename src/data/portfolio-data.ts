// Content for the portfolio, drafted from Vaishali-Resume.pdf.
// Components should read everything from here — no copy hard-coded in the UI.

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  summary: string[];
  interests: string[];
  highlights: { value: string; label: string }[];
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  role: string;
  organisation: string;
  start: string;
  end: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  grade: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  points: string[];
  stack: string[];
  featured?: boolean;
  links?: { github?: string; demo?: string; paper?: string };
}

export interface Publication {
  title: string;
  venue: string;
  date: string;
  url?: string;
}

export interface Volunteering {
  role: string;
  organisation: string;
  description: string;
}

export const profile: Profile = {
  name: "Vaishali Veera Saravana Perumal",
  shortName: "Vaishali",
  role: "MSc AI & ML Student · Research Associate",
  tagline: "Explorer at heart, researcher in practice.",
  location: "Birmingham, United Kingdom",
  summary: [
    "I'm an MSc Artificial Intelligence & Machine Learning student at the University of Birmingham, with hands-on experience designing, training, and deploying machine learning systems across computer vision, robotics, and real-time pipelines.",
    "As a co-author of 8 research publications, I bring research rigour and hands-on Python development to every project. I combine analytical thinking with design thinking to tackle problems that sit at the edge of what's possible.",
    "I'm driven by curiosity and a commitment to building things that matter.",
  ],
  interests: [
    "LLMs",
    "Generative AI",
    "Computer Vision",
    "XR",
    "Robotics",
    "Automation",
  ],
  highlights: [
    { value: "8", label: "Research publications" },
    { value: "4", label: "Industry & research roles" },
    { value: "75.67%", label: "MSc AI & ML" },
  ],
};

export const contact: Contact = {
  email: "vaishaliveera04@gmail.com",
  linkedin: "https://www.linkedin.com/in/v-vaishali",
  github: "https://github.com/vaishali483",
  resume: "/resume.pdf",
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C", "C#"],
  },
  {
    category: "ML / DL",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Deep Learning",
      "Reinforcement Learning",
      "Neural Networks",
      "Model Training & Fine-tuning",
      "Model Evaluation",
      "Predictive Analytics",
    ],
  },
  {
    category: "ML Systems",
    skills: [
      "Real-time Data Pipelines",
      "Anomaly Detection",
      "Digital Twin",
      "Embedded Systems",
      "Distributed Monitoring",
      "Experimental Pipeline Design",
    ],
  },
  {
    category: "Computer Vision",
    skills: [
      "OpenCV",
      "YOLO",
      "MediaPipe",
      "Image Segmentation & Recognition",
      "Image Processing",
    ],
  },
  {
    category: "NLP / GenAI",
    skills: ["LLMs", "Generative AI", "RAG", "Prompt Engineering", "NLP"],
  },
  {
    category: "Data & Backend",
    skills: [
      "FastAPI",
      "REST APIs",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Tableau",
      "Data Visualisation",
    ],
  },
  {
    category: "XR & Spatial",
    skills: [
      "Unity 3D",
      "AR / VR",
      "Spatial Computing",
      "Blender",
      "Autodesk Fusion 360",
    ],
  },
  {
    category: "Research",
    skills: [
      "Empirical Validation",
      "Model Benchmarking",
      "Experimental Design",
      "Scientific Writing",
    ],
  },
  {
    category: "Other Tools",
    skills: [
      "Adobe Photoshop",
      "Figma",
      "Sensor Fusion",
      "ROS",
      "Agile Project Management",
    ],
  },
];

export const experience: Experience[] = [
  {
    role: "Research Associate",
    organisation: "Extreme Robotics Lab, University of Birmingham",
    start: "Dec 2025",
    end: "Present",
    points: [
      "Design and run end-to-end empirical ML pipelines that benchmark state-of-the-art computer vision and deep learning architectures on robotic perception tasks, producing reproducible results to publication standards.",
      "Analyse model training dynamics, diagnose performance bottlenecks, and iterate on deep learning architectures.",
    ],
  },
  {
    role: "Unity Developer Intern (AR/AI)",
    organisation: "Schnell Energy Equipments",
    start: "Aug 2024",
    end: "Mar 2025",
    points: [
      "Fine-tuned and deployed deep learning image segmentation models in a production AR pipeline (Unity 3D + ARCore) used for smart-city street-lighting maintenance.",
      "Analysed model performance under real-world deployment constraints and iterated on architecture choices to meet operational reliability requirements.",
      "Engineered inference pipelines bridging Python deep learning models and live AR environments, covering the full stack from training through deployment.",
    ],
  },
  {
    role: "Graduate Innovation Engineer",
    organisation: "Forge Innovation & Ventures",
    start: "Jan 2024",
    end: "Jul 2024",
    points: [
      "Developed ML-driven prototypes spanning computer vision, NLP, and industrial automation, turning research findings into deployable systems within tight project cycles.",
      "Worked cross-functionally with engineers, hardware specialists, and domain experts.",
      "Gained hands-on experience with ROS and computational hardware, and how ML models interact with physical infrastructure.",
    ],
  },
  {
    role: "Unity Developer Intern",
    organisation: "SatoriXR, IITM Research Park",
    start: "Jul 2023",
    end: "Aug 2023",
    points: [
      "Built functional AR applications using Unity 3D and C#.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "MSc Artificial Intelligence and Machine Learning",
    institution: "University of Birmingham",
    location: "United Kingdom",
    start: "2025",
    end: "2026",
    grade: "75.67%",
  },
  {
    degree: "B.Tech Artificial Intelligence and Data Science",
    institution: "Kumaraguru College of Technology",
    location: "India",
    start: "2021",
    end: "2025",
    grade: "86.6%",
  },
];

export const projects: Project[] = [
  {
    title: "Open-Set Kitchen Hazard Detection",
    subtitle: "VLM-grounded LLM agent with Unity AR · MSc Dissertation",
    description:
      "An end-to-end kitchen safety system that detects and explains visible hazards from camera frames and warns the cook in real time through an Android AR interface.",
    points: [
      "Combines YOLO11s, Google Gemini, FastAPI, and Unity AR to classify present vs. possible risks, with validated exact, approximate, or warning-only localisation.",
      "Tracks cooking sessions with periodic frame analysis, lightweight textual context, deduplicated session summaries, and local session storage.",
    ],
    stack: ["YOLO11", "Google Gemini", "FastAPI", "Unity AR", "Android", "Python"],
    featured: true,
  },
  {
    title: "Digital Twin for 3D Printer Monitoring",
    subtitle: "Real-time anomaly detection",
    description:
      "A digital twin that ingests live sensor streams from a 3D printer, simulates its state, and flags faults before they ruin a print.",
    points: [
      "Real-time data pipeline visualising operational parameters on a unified dashboard.",
      "End-to-end anomaly detection: sensor ingestion, fault classification, and automated alerting.",
      "Remote parameter control and real-time state synchronisation across distributed components.",
    ],
    stack: ["Digital Twin", "Python", "Anomaly Detection", "Sensor Data", "Dashboards"],
    featured: true,
  },
  {
    title: "AI Keyword Generator for SEO",
    subtitle: "GenAI keyword research app",
    description:
      "A GenAI-powered app that generates, classifies, clusters, and prioritises SEO keywords from a topic, with explainable insights and content recommendations.",
    points: [
      "LLM-based search-intent classification combined with TF-IDF and KMeans clustering.",
      "Interactive Streamlit dashboard with filtering, visualisations, and CSV/Markdown export.",
      "Automated Pytest/AppTest coverage using mocked Gemini responses.",
    ],
    stack: ["Python", "Streamlit", "Google Gemini", "Pandas", "Pydantic", "Scikit-learn"],
    featured: true,
  },
  {
    title: "Gesture-Controlled 6-DoF Robotic Arm",
    subtitle: "Inverse kinematics + deep learning",
    description:
      "A robotic arm that mirrors hand gestures in real time, running the full perception-to-actuation pipeline on embedded hardware.",
    points: [
      "Real-time gesture recognition with MediaPipe and custom inverse kinematics algorithms.",
      "ML inference integrated with physical actuator control for low-latency deployment on constrained hardware.",
    ],
    stack: ["MediaPipe", "Inverse Kinematics", "Python", "Embedded Systems", "Robotics"],
  },
  {
    title: "Production Parameter Prediction",
    subtitle: "ML for manufacturing",
    description:
      "A machine learning model that predicts optimal manufacturing parameters for production lines.",
    points: [
      "Feature engineering, cross-validation, and hyperparameter tuning for production-quality accuracy.",
      "Analysed training dynamics and model behaviour across dataset conditions.",
    ],
    stack: ["Python", "Scikit-learn", "Predictive Analytics"],
  },
];

export const publications: Publication[] = [
  {
    title: "Digital Twin based Real-Time Anomaly Detection for FDM Additive Manufacturing",
    venue: "Springer Journal (Scopus) · Accepted",
    date: "Accepted",
  },
  {
    title: "AI Powered Monitoring and Risk Prediction for Maternal Health to Ensure Fetal Well-Being",
    venue: "IEEE Xplore (Scopus)",
    date: "Jun 2025",
    url: "https://ieeexplore.ieee.org/document/11012457",
  },
  {
    title: "Sustainable Urban Street Lighting through Predictive Maintenance using IoT and AI",
    venue: "IEEE Xplore (Scopus)",
    date: "Jun 2025",
    url: "https://ieeexplore.ieee.org/abstract/document/10895512",
  },
  {
    title: "Implementing Catboost Algorithm for Allergen Cross Contamination Detection in Food Industry",
    venue: "IEEE Xplore (Scopus)",
    date: "Feb 2024",
    url: "https://ieeexplore.ieee.org/document/10433987",
  },
  {
    title: "A Novel Adaptive Framework for Immersive Learning Using VR in Education",
    venue: "Wiley Scrivener Publishing",
    date: "Feb 2024",
    url: "https://onlinelibrary.wiley.com/doi/10.1002/9781394200498.ch1",
  },
  {
    title: "Integration of UAV Systems with ML Algorithms for Wildlife Monitoring and Conservation",
    venue: "IGI Global",
    date: "Jan 2024",
    url: "https://www.igi-global.com/chapter/integration-of-unmanned-aerial-vehicle-systems-with-machine-learning-algorithms-for-wildlife-monitoring-and-conservation/337253",
  },
  {
    title: "Collaboration of Mixed Reality for Interactive Visualisation of Ocean Mapping",
    venue: "IEEE Xplore (Scopus)",
    date: "Aug 2023",
    url: "https://ieeexplore.ieee.org/abstract/document/10199242",
  },
  {
    title: "Industry 5.0: Enhancing Human-Robot Collaboration through Collaborative Robots — A Review",
    venue: "IEEE Xplore (Scopus)",
    date: "Aug 2023",
    url: "https://ieeexplore.ieee.org/abstract/document/10201120",
  },
];

export const volunteering: Volunteering[] = [
  {
    role: "Student Enterprise Ambassador",
    organisation: "University of Birmingham",
    description:
      "Supporting entrepreneurship and innovation initiatives and building community across the student research and engineering ecosystem.",
  },
];
