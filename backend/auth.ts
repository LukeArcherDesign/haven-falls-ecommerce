import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User"; // We will need to convert this model to TS next

const router = express.Router();

/* ---------------------------- REGISTER ROUTE ---------------------------- */
// 2. Explicitly type req as Request, and res as Response
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An adventurer with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      // 3. Type Assertion: Forcing TS to accept this will be a string
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server encountered a storm. Try again." });
  }
});

/* ---------------------------- LOGIN ROUTE ---------------------------- */
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Adventurer not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Server encountered a storm during login." });
  }
});

/* ---------------------------- SYNC CAMPFIRE ROUTE ---------------------------- */
router.post(
  "/campfire/sync",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Access denied. No valid wristband." });
      }

      const token = authHeader.split(" ")[1];

      // Explicitly typing the decoded payload so TS knows it has an 'id'
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "Adventurer not found." });
      }

      user.campfire = req.body.campfireList;
      await user.save();

      res
        .status(200)
        .json({ message: "Campfire securely saved to the vault." });
    } catch (error) {
      console.error("Campfire sync error:", error);
      res
        .status(401)
        .json({ message: "Server storm: Invalid or expired wristband." });
    }
  },
);

/* ---------------------------- RETRIEVE CAMPFIRE ROUTE ---------------------------- */
router.get(
  "/campfire/sync",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Access denied. No valid wristband." });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "Adventurer not found." });
      }

      res.status(200).json({ campfireList: user.campfire });
    } catch (error) {
      console.error("Campfire retrieval error:", error);
      res
        .status(401)
        .json({ message: "Server storm: Invalid or expired wristband." });
    }
  },
);

/* ---------------------------- UPDATE USERNAME ROUTE ---------------------------- */
router.put(
  "/profile/name",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Access denied. No valid wristband." });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const { newName } = req.body;

      if (!newName || newName.trim() === "") {
        return res.status(400).json({ message: "Username cannot be empty." });
      }

      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { name: newName },
        { new: true },
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Adventurer not found." });
      }

      res.status(200).json({
        message: "Username successfully updated.",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res
        .status(500)
        .json({ message: "Server encountered a storm during update." });
    }
  },
);

/* ---------------------------- RETRIEVE PROFILE ROUTE ---------------------------- */
router.get("/profile", async (req: Request, res: Response): Promise<any> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid wristband." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "Adventurer not found." });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile retrieval error:", error);
    res
      .status(401)
      .json({ message: "Server storm: Invalid or expired wristband." });
  }
});

export default router;
