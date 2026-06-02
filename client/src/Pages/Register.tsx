import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Your adventurer name must be at least 2 characters."),
  email: z.string().email("Please enter a valid basecamp email address."),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters long."),
});

// Extract TypeScript type from Zod validation rules
type RegisterFormData = z.infer<typeof registerSchema>;

// Form errors to allow string keys with string values
interface FormErrors {
  [key: string]: string | null;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name])
      setFormErrors({ ...formErrors, [e.target.name]: null });
    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        // Cast path array to string to map it safely
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });
      setFormErrors(formattedErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("havenToken", data.token);
        setStatusMessage("Account created successfully! Welcome to basecamp.");
        setIsSuccess(true);
        setFormData({ name: "", email: "", password: "" });
        setFormErrors({});
      } else {
        setStatusMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setStatusMessage("Failed to connect to the server.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-[20px]">
      <div className="w-full max-w-[400px] text-center bg-[#183855] p-[40px] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <h2 className="text-brandOrange text-[1.5rem] m-0 mb-[10px] font-bold">
          Join Haven Falls
        </h2>
        <p className="text-white text-[1rem] m-0 mb-[25px]">
          Register your details to secure your basecamp access.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Adventurer Name"
              value={formData.name}
              onChange={handleChange}
              className="p-[12px] border border-transparent rounded-[4px] text-[1rem] text-[#333] outline-none focus:ring-2 focus:ring-brandOrange"
            />
            {formErrors.name && (
              <span className="text-brandOrange text-[0.8rem] font-bold text-left mt-[4px]">
                {formErrors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="p-[12px] border border-transparent rounded-[4px] text-[1rem] text-[#333] outline-none focus:ring-2 focus:ring-brandOrange"
            />
            {formErrors.email && (
              <span className="text-brandOrange text-[0.8rem] font-bold text-left mt-[4px]">
                {formErrors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="p-[12px] border border-transparent rounded-[4px] text-[1rem] text-[#333] outline-none focus:ring-2 focus:ring-brandOrange"
            />
            {formErrors.password && (
              <span className="text-brandOrange text-[0.8rem] font-bold text-left mt-[4px]">
                {formErrors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-brandOrange text-white py-[16px] px-[20px] text-[1.1rem] font-bold border-none rounded-[6px] cursor-pointer mt-[10px] hover:opacity-90 transition-opacity"
          >
            Forge Key
          </button>
        </form>

        {statusMessage && (
          <div
            className={`mt-[20px] p-[12px] rounded-[4px] text-[0.95rem] font-bold ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {statusMessage}
          </div>
        )}

        <p className="mt-[25px] text-[0.9rem] text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brandOrange font-bold hover:underline"
          >
            Return to Basecamp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
