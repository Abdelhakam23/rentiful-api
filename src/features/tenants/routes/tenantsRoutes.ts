import express from "express";
import { createTenant, getTenant } from "../controllers/tenantsControllers.js";


const router = express.Router();

router.get('/:id',getTenant);
router.post('/',createTenant);




export default router;