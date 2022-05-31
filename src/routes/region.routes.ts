import express from "express";
import { requiresUser, validateRequest } from "../middleware";
const router = express.Router();
import {
  createRegionHandler,
  updateRegionHandler,
  getRegionHandler,
  getRegionsHandler,
  deleteRegionHandler,
} from "../controllers/region.controller";

import {
  createRegionSchema,
  updateRegionSchema,
  deleteRegionSchema,
  getRegionSchema,
} from "../schema/region.schema";

// create a region
router.post(
  "/",
  [requiresUser, validateRequest(createRegionSchema)],
  createRegionHandler
);

// get all region (, requiresUser)
router.get("/", requiresUser, getRegionsHandler);

// get a region
router.get(
  "/:regionId",
  [requiresUser, validateRequest(getRegionSchema)],
  getRegionHandler
);

// update a region
router.put(
  "/:regionId",
  [requiresUser, validateRequest(updateRegionSchema)],
  updateRegionHandler
);

// delete a region
router.delete(
  "/:regionId",
  [requiresUser, validateRequest(deleteRegionSchema)],
  deleteRegionHandler
);

export default router;
