# 🚀 MockMate

**MockMate** is a full-stack AI-powered mock interview platform that helps users practice personalized, voice-based interviews with instant feedback. It simulates real job interview scenarios using AI voice interaction, and provides actionable insights to help users improve their responses.

## 🌐 [**Live Demo**](https://mock-mate-one-theta.vercel.app/)

---

## ✨ Features

- 🔐 **Authentication** – Secure sign-up and sign-in using Firebase Authentication.
- 🧠 **AI-Powered Interviewer** – Google Gemini generates dynamic, contextual interview questions.
- 🗣️ **Voice Assistant** – Uses 11labs to simulate realistic voice interactions.
- 📋 **Instant Feedback** – AI evaluates your responses and gives instant suggestions.
- 📄 **Interview Generation** – Custom interview setup based on role/field.
- 📊 **Dashboard** – Track and manage interview history and feedback.
- 💾 **PostgreSQL Database** – Stores user data, interviews, and feedback.
- 🖥️ **Modern UI** – Clean, responsive design built with Next.js and Tailwind CSS.
- 📱 **Mobile Friendly** – Fully responsive across devices.
- ⚙️ **Modular Architecture** – Built for scalability and reusability.

---

## 🛠️ Tech Stack

| Category      | Technologies Used                           |
|---------------|----------------------------------------------|
| Frontend      | Next.js, TypeScript, Tailwind CSS            |
| Backend       | Firebase Auth, Google Gemini, 11labs API     |
| Database      | PostgreSQL (via Prisma or other ORM)         |
| Hosting       | Vercel                                       |
| Voice & AI    | 11labs, Google Gemini                        |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yashsrivastavaaa/MockMate.git
cd MockMate
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Create .env.local in the root directory
```bash
touch .env.local
```

### 4. Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

``` # 🔐 Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com

# 🔐 Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DB_URL=https://your-project-id.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# 🧠 Google Gemini
NEXT_PUBLIC_GOOGLE_GENERATION_API_KEY=your-google-api-key
NEXT_PUBLIC_GEMINI_API=GEMINI_API

# 🗣️ AI Agent
NEXT_PUBLIC_AI_AGENT_ID=11LABS_API

# 🎙️ 11labs Voice API
NEXT_PUBLIC_11LABS_API_KEY=your-11labs-api-key

# 🔗 Custom DB API
NEXT_PUBLIC_DB_API=API_KEY_OF_NEON_DB
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

--- 

## 🔮 Future Improvements
📅 Interview scheduling with calendar integration

📈 Performance analytics dashboard

📤 Export feedback to PDF

🧠 Resume/job-based AI customization
