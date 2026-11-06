import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
       info: {
            title: 'MY Barisal API Documentation',
            version: '1.0.0',
            description: `Backend API documentation for MY Barisal Directory & Admin Panel, built with Node.js, Express, and MongoDB.

> ⚠️ ALERT : All admin routes are enabled for the Recruiter to test!`,
        },
        tags: [
            {
                name: 'Blood Donors (Core Feature)',
                description: 'Blood donor registration, listing, and management endpoints',
            },
            {
                name: 'Ambulance Services (Sub-feature)',
                description: 'Emergency ambulance listing and management endpoints',
            },
            {
                name: 'Doctor Services (Sub-feature)',
                description: 'Emergency doctor listing and management endpoints',
            },
            {
                name: 'Fire Services (Sub-feature)',
                description: 'Emergency fire service station listing and management endpoints',
            },
        ],
        servers: [
            {
                url: 'https://my-barisal-apps-api-backend.vercel.app',
                description: 'Production Server',
            },
            {
                url: 'http://localhost:5000',
                description: 'Local Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter admin JWT token for protected routes',
                },
            },
        },
    },
    apis: [
        './src/app/modules/**/*.ts',
        './src/app/modules/**/*.js',
        './dist/app/modules/**/*.js',
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    // Vercel-এর জন্য CDN ভিত্তিক স্ট্যাটিক ফাইল অপশন কনফিগারেশন
    const swaggerOptions = {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "MY Barisal API Docs",
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        // এটিকে অ্যারে [] থেকে পরিবর্তন করে সিঙ্গেল স্ট্রিং করা হয়েছে
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    };

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
    console.log('📄 Swagger Docs available at /docs');
};