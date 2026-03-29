
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HospitalRoutes } from "../modules/Hospitals/hospital.route";
import { AmbulanceRoutes } from "../modules/Ambulance/ambulance.route";

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
    { path: '/ambulances', 
        route: AmbulanceRoutes },

];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
