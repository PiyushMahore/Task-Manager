import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const varifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new apiError(404, "Unauthorise request")
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN);

        if (!decodedToken) {
            throw new apiError(500, "Failed To Decode Token");
        }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new apiError(404, "Invalid Token")
        }

        req.user = user
        next()
    } catch (error) {
        throw new apiError(500, "Somthing went wrong while verifying user", error)
    }
});

export { varifyJwt }