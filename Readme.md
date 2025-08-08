<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />


# is-it 🎯


## Basic Details
### Team Name: delulu


### Team Members
- Team Lead: Mahadevan Reji - College of Engineering Chengannur
- Member 2: Neil Oommen Renni - College of Engineering Chengannur

### Project Description
is-it is a revolutionary mobile app that leverages the power of Artificial Intelligence to answer life's most pressing, albeit useless, questions. Point your camera at an object, select a question, and our advanced ML model will give you the definitive "YES!" or "NOPE!" you've been searching for.

### The Problem (that doesn't exist)
Have you ever stared deep into your lunch, pondering the existential question, "Is this truly Biryani?". Have you ever wondered if that comfy-looking thing is, in fact, "sittable?". The uncertainty is maddening! Society has long been plagued by the inability to definitively categorize the mundane objects around us.

### The Solution (that nobody asked for)
We built "is-it," a mobile application that eradicates these useless dilemmas. Using a sophisticated TensorFlow.js model integrated into a React Native app, we provide instant, confident answers. The app allows you to use your camera or gallery to select an image, choose from a list of profound questions, and receive an AI-generated verdict, restoring peace and certainty to your life.

## Technical Details
### Technologies/Components Used
For Software:
- Languages used: TypeScript
- Frameworks used: React Native, Expo
- Libraries used:
  - @tensorflow/tfjs, @tensorflow/tfjs-react-native for on-device machine learning
  - expo-camera for live camera feed and controls
  - expo-image-picker to select images from the gallery
  - react-native-reanimated for smooth animations
  - expo-gl for WebGL backend for TensorFlow.js
- Tools used: Expo CLI, EAS Build

For Hardware:
- Not Applicable (This is a software-only project)

### Implementation
For Software:
# Installation
```bash
# Clone the repository
git clone https://github.com/your-username/is-it.git
cd is-it

# Install dependencies
npm install
```

# Run
```bash
# Start the development server
npx expo start
```

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1](Add screenshot 1 here with proper name)
*The main app interface, showing the live camera view with controls for flash, camera toggle, and gallery access. The selected question is displayed at the top.*

![Screenshot2](Add screenshot 2 here with proper name)
*The question selection sheet, where the user can choose from a list of predefined, useless questions to ask the AI.*

![Screenshot3](Add screenshot 3 here with proper name)
*The results modal, displaying a confident "YES!" or "NOPE!" after the image analysis is complete, along with a cheeky confidence score.*

# Diagrams
![Workflow](Add your workflow/architecture diagram here)
*The user flow starts with the camera view. The user can take a picture or pick one from the gallery. This leads to a preview where they can confirm the analysis. The app then processes the image, runs it through the TensorFlow model, and displays the final "Yes/No" result in a modal, after which the user can try again.*

For Hardware:
- Not Applicable

### Project Demo
# Video
[Add your demo video link here]
*The video demonstrates the full user journey: launching the app, selecting a question, taking a picture of an object, running the analysis, and viewing the final result. It also shows the gallery access and camera switching features.*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- Mahadevan Reji: Led the integration of the TensorFlow.js model, developed the core prediction and image processing logic (src/brain/), and managed the application's state using React Context (src/context/AppContext.tsx)
- Neil Oommen Renni: Designed and implemented the user interface and component architecture, including the camera view, modals, and control elements (src/components/), and handled the overall UX and styling (src/components/styles.ts)

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)