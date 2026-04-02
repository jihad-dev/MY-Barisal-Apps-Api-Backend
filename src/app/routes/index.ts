
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { HospitalRoutes } from "../modules/Hospitals/hospital.route";
import { AmbulanceRoutes } from "../modules/Ambulance/ambulance.route";
import { NewsRoutes } from "../modules/News/news.routes";
import { EsebaRoutes } from "../modules/E-seba/e-sheba.route";
import { ImamMuazzinRoutes } from "../modules/imam-muazzin/imam-muazzin.route";
import { DonorRoutes } from "../modules/Donar/donor.route";
import { FireServiceRoutes } from "../modules/FireService/fire-service.route";
import { BankRoutes } from "../modules/Bank/bank.route";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";
import { PoliceRoutes } from "../modules/police/police.route";

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
    {
        path: '/imam-muazzin',
        route: ImamMuazzinRoutes
    },
    {
        path: '/donars',
        route: DonorRoutes
    },
    {
        path: '/fire-service',
        route: FireServiceRoutes
    },
    {
        path: '/bank',
        route: BankRoutes
    },
    {
        path: '/doctors',
        route: DoctorRoutes
    },
    {
        path: '/police',
        route: PoliceRoutes
    },

];

moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
