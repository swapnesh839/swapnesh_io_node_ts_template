import bcrypt from "bcryptjs";
export const signUpController = async (req, res, next) => {
  try {
    const { name, phone, email, password, userType } = req.body;
    const existingUser = await UserModel.findOne({ email, userType }).lean();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      userType,
    });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return res.created(userWithoutPassword, "User Created Successfully");
  } catch (error) {
    next(error);
  }
};
export const signInController = async (req, res, next) => {
  try {
    const { email, password, userType } = req.body;
    const user = await UserModel.findOne({ email, userType }).lean();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = authService.generateToken(user._id.toString());
    return res.success(
      {
        token,
        user: userWithoutPassword,
      },
      "User Logged In Successfully",
    );
  } catch (error) {
    next(error);
  }
};
