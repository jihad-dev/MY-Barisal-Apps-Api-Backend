# 🏙️ MY Barisal — Emergency & Community Services Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

**MY Barisal** is a full-stack digital emergency directory and community service platform tailored for Barisal, Bangladesh. The application provides instant access to vital emergency services—including verified blood donors, ambulance services, doctors, and fire stations—along with a secure Role-Based Access Control (RBAC) administrative dashboard.

## 🚀 Live Demo & Documentation
* **API Documentation (Swagger UI):** [View Live Swagger Docs](https://my-barisal-apps-api-backend.vercel.app/docs)
* **Production API Base URL:** `https://my-barisal-apps-api-backend.vercel.app/api/v1`


## 🛠️ Tech Stack & Architecture

* **Runtime:** Node.js
* **Framework:** Express.js with TypeScript
* **Database:** MongoDB & Mongoose (ODM)
* **Validation:** Zod (Runtime type-checking & schema validation)
* **Authentication & Security:** JWT (JSON Web Tokens), bcrypt, Role-Based Authorization (`admin`, `superAdmin`)
* **API Documentation:** Swagger UI (`swagger-jsdoc`, `swagger-ui-express`)
* **Deployment:** Vercel (Serverless Architecture)

## 📂 Project Structure (Modular Architecture)

The backend follows a clean, modular MVC-style architecture ensuring high maintainability and scalability
