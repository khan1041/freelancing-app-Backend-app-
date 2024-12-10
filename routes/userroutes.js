import express from "express";
import { getBook,singeledata } from "../controler/Book.js";
import {

  register,login,logout,getMyProfile,getAdmins
} from "../controler/usercontroler.js";
import { contectform } from "../controler/meassage.js";
import { isAuthenticated } from "../midelware/isAdmin.js";
const router = express.Router();

router.post("/register",register);
router.get("/book",getBook)
router.get("/singale/:id",singeledata)
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
router.post("/msg",contectform)
export default router;