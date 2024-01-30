import express  from "express";
import {
    Contacts, addContact,newContactPage,contactDetail, editContactPage, editContact, deleteContact,logout
}  from "../controller/contactControl.js";
import cookieParser from "cookie-parser";
// import jwt from "../middleware/jwt.js";

const router = express.Router();
router.use(cookieParser());

router.route("/logout").get(logout)
router.route("/").get(Contacts); 
router.route("/addContact").get(newContactPage).post(addContact);
router.route("/:id").get(contactDetail);
router.route("/editContact/:id").get(editContactPage).post(editContact);
router.route("/deleteContact/:id").get(deleteContact);


export default router;