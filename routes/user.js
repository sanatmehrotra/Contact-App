import express from "express";
import { register, login,redirect,loginPage } from "../controller/userControl.js";
import {contactUs,Data} from "../controller/contactUsControl.js";
import cookieParser from "cookie-parser";

const route = express.Router();
route.use(cookieParser());

route.route("/").get(register).post(redirect);
route.route("/login").get(loginPage).post(login);
route.route("/contact-us").get(contactUs).post(Data);

export default route;