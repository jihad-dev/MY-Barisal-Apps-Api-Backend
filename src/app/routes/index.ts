
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HospitalRoutes } from "../modules/Hospitals/hospital.route";
import { AmbulanceRoutes } from "../modules/Ambulance/ambulance.route";
import { NewsRoutes } from "../modules/News/news.routes";
import { EsebaRoutes } from "../modules/E-seba/e-sheba.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/hospitals",
        route: HospitalRoutes,
    },
    {
        path: '/ambulances',
        route: AmbulanceRoutes
    },
    {
        path: '/news',
        route: NewsRoutes
    },
    {
        path: '/e-seba',
        route: EsebaRoutes
    },

];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
