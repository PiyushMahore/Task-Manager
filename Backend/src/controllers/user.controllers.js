import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

const cookieOptions = {
    httpOnly: true,
    secure: true
};

const generateAccessRefreshToken = async (_id) => {
    if (!_id) return null;

    const user = await User.findOne(_id);

    if (!user) {
        throw new apiError(404, "User Does Not Exist");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const signUp = asyncHandler(async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if ([firstName, lastName, userName, email, password].some((value) => value?.trim() === "")) {
        throw new apiError(400, "All Fields Are Required");
    }

    const isAlreadyExist = await User.findOne({ $or: [{ userName: userName }, { email: email }] });

    if (isAlreadyExist) {
        throw new apiError(400, "User Already Exist");
    }

    const user = await User.create({ userName: userName, email: email, password: password, firstName: firstName, lastName: lastName });

    if (!user) {
        throw new apiError(500, "Somthing Went Wrong While Creating User");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .cookie('accessToken', accessToken, cookieOptions)
        .json(new apiResponse(200, user, "User Created SuccessFully"));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email?.trim() === "" || password?.trim() === "") {
        throw new apiError(400, "Invalid Crediantials");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new apiError(404, "User Not Found");
    }

    const checkPassword = await user.changePassword(password);

    if (checkPassword === false) {
        throw new apiError(400, "Incorrect Password");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new apiResponse(200, user, "User Logged In Successfully"));
});

const changeUserDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, password, userName } = req.body;

    if ([firstName, lastName, userName, password].some((value) => value?.trim() === "")) {
        return res
            .status(200)
            .json(new apiResponse(200, {}, "Nothing to update"))
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new apiError(404, "User not found");
    }

    if (firstName) {
        user.firstName = firstName
    }

    if (lastName) {
        user.lastName = lastName
    }

    if (password) {
        user.password = password
    }

    if (userName) {
        const isAlreadyExist = await User.findOne({ userName: userName })
        if (isAlreadyExist) {
            throw new apiError(400, "Username Alrady Taken");
        }
        user.userName = userName
    }

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new apiResponse(200, user, "User Updated Successfully"));
});

export { signUp, login, changeUserDetails };
