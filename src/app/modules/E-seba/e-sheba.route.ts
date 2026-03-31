import express from "express";
import { EsebaValidation } from "./e-seba.validation";
import validateRequest from "../../middlewares/validateRequest";
import { EsebaController } from "./e-seba-controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
    "/create-e-seba",
    validateRequest(EsebaValidation.createEsebaZodSchema),
    auth(['admin', 'superAdmin']),
    EsebaController.createEseba
);

router.get("/", EsebaController.getAllEseba);
router.get("/:id", EsebaController.getSingleEseba);
router.delete("/:id", EsebaController.deleteEseba);

export const EsebaRoutes = router;