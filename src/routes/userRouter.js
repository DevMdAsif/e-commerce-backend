import express from "express";
import { uploadUserImage } from "../middlewares/uploadfile.js";
import {
    activateAccount,
    deleteUser,
    getUser,
    getUsers,
    handleBanUserById,
    handleUnbanUserById,
    processRegister,
    updatePassword,
    updateUserById,
} from "../controllers/userController.js";
import runValidataon from "../validators/index.js";
import { isAdmin, isLoggedIn, isLoggedOut } from "../middlewares/Auth.js";
import { validateUserRegistration } from "../validators/auth.js";
const userRouter = express.Router();

// user routes : /api/users

userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.post(
    "/process-register",
    uploadUserImage.single("image"),
    isLoggedOut,
    validateUserRegistration,
    runValidataon,
    processRegister
);
userRouter.post("/activate", isLoggedIn, activateAccount);
userRouter.put(
    "/:id",
    uploadUserImage.single("image"),
    isLoggedIn,
    updateUserById
);
userRouter.put("/ban-user/:id", isLoggedIn, isAdmin, handleBanUserById);
userRouter.put("/unben-user/:id", isLoggedIn, isAdmin, handleUnbanUserById);
userRouter.put("/update-password/:id", isLoggedIn, updatePassword);

export default userRouter;
