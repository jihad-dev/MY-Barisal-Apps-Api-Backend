import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MY Barisal API Documentation',
            version: '1.0.0',
            description: 'Backend API documentation for MY Barisal Directory & Admin Panel, built with Node.js, Express, and MongoDB.',
        },
        servers: [
            {
                url: 'https://my-barisal-apps-api-backend.vercel.app', // আপনার লাইভ ব্যাকএন্ড ইউআরএল এখানে দিন (যেমন: Render বা Vercel লিংক)
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
    // আপনার রাউট ফাইলগুলোর পাথ যেখানে JSDoc কমেন্টস থাকবে
    apis: [
        './src/app/modules/Donar/donor.route.ts',
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('📄 Swagger Docs available at /docs');
};