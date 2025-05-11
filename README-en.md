# 🔗 LinkShortener App

![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel\&style=flat)
![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase\&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react\&logoColor=000)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A modern link shortener web application with analytics dashboard — built for users and recruiters to demonstrate technical skills in a real-world project.

> ⚡ Powered by React, TypeScript, Chakra UI, Zustand, Zod, and Firebase.

---

## 🧭 Table of Contents

* [Features](#features)
* [Screenshots](#screenshots)
* [Tech Stack](#tech-stack)
* [Live Demo](#live-demo)
* [Installation](#installation)
* [Project Structure](#project-structure)
* [Future Improvements](#future-improvements)
* [License](#license)
* [Contact](#contact)

---

## ✨ Features

* User registration and login using Firebase Auth
* Analytics dashboard:

  * Total links created
  * Total clicks
  * Most clicked link
* Form to create short links with custom aliases
* List of all created links:

  * Original URL
  * Alias
  * Generated short URL
  * Creation date
  * Click count
  * Copy to clipboard
  * Delete option
* Settings page to update password

---

## 🖼️ Screenshots

> Replace these with your actual app screenshots.

* ![Login](./screenshots/login.webp)
* ![Register](./screenshots/register.webp)
* ![Dashboard](./screenshots/dashboard.webp)
* ![Settings](./screenshots/settings.webp)

---

## 🛠️ Tech Stack

* **Vite** – Fast bundler
* **React + TypeScript** – Core framework with strong typing
* **React Router** – Navigation between pages
* **React Hook Form** – Lightweight form management
* **Zod** – Schema validation
* **Zustand** – Simple and efficient global state management
* **Firebase** – Auth and storage backend
* **Chakra UI** – Accessible and customizable component library

---

## 🌐 Live Demo

Try the deployed app 👉 [Live Demo](https://c-url.netlify.app/)

---

## 🚀 Installation

```bash
git clone https://github.com/Marco90v/shortUrl.git
cd shortUrl
pnpm install
pnpm run dev
```

> Make sure to configure your `.env` file with Firebase credentials.

---

## 🗂️ Project Structure (simplified)

```
src/
├── components/
├── pages/
├── services/
├── schema/
|-- store
├── utils/
|-- type.d.ts
|-- .evn
├── App.tsx
└── main.tsx
```

---

## 🧩 Future Improvements

* [ ] Pagination in links list
* [ ] Dark mode

---

## 📝 License

This project is licensed under the MIT License.

---

## 📬 Contact

* GitHub: [@Marco90v](https://github.com/Marco90v)
* LinkedIn: [https://www.linkedin.com/in/marco90v/](https://www.linkedin.com/in/marco90v/)
* Portfolio: [https://marcovelasquezfigarella.netlify.app/en/](https://marcovelasquezfigarella.netlify.app/en/)

---

Thanks for checking out this project! 🚀
