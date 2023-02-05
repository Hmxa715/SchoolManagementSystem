import express from "express";
import {
  getUsers,
  getUserById,
  Register,
  updateUser,
  deleteUser,
  Login,
  Logout,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  addTenant,
  deleteTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
} from "../controllers/tenant.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.post("/register", Register);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/addTenant", addTenant);
router.get("/getAllTenants", getAllTenants);
router.get("/getTenantById/:id", getTenantById);
router.patch("/updateTenant/:id", updateTenant);
router.delete("/deleteTenant/:id", deleteTenant);
export default router;
