import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const validateField = (name, value) => {
    try {
      formSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
      return false;
    }
  };

  const validateForm = () => {
    try {
      formSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "message") {
      setCharCount(value.length);
    }

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await fetch("https://getform.io/f/8b086558-47d4-49d0-852d-ec8c22da40f7", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      toast.success("Message sent successfully! I'll get back to you soon.");
      resetForm();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setCharCount(0);
    setErrors({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 bg-[#011825]">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#F0EFEB]">
            Get in Touch
          </h2>
          <p className="text-[#F0EFEB]/70 mt-2">
            Have a question or want to work together? Send me a message!
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#0D3056]/90 border border-[#1689C8]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#F0EFEB]">
              Contact Form
            </h3>
            <p className="text-[#F0EFEB]/70 text-sm">
              Fill out the form below and I'll respond as soon as possible.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#F0EFEB]"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full bg-[#011825] border ${
                  errors.name ? "border-red-400" : "border-[#1689C8]/50"
                } rounded-md p-3 text-[#F0EFEB] focus:outline-none focus:ring-1 focus:ring-[#1689C8] transition-all duration-300`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-400">
                  {errors.name}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#F0EFEB]"
              >
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={`w-full bg-[#011825] border ${
                  errors.email ? "border-red-400" : "border-[#1689C8]/50"
                } rounded-md p-3 text-[#F0EFEB] focus:outline-none focus:ring-1 focus:ring-[#1689C8] transition-all duration-300`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[#F0EFEB]"
              >
                Subject <span className="text-red-400">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`w-full bg-[#011825] border ${
                  errors.subject ? "border-red-400" : "border-[#1689C8]/50"
                } rounded-md p-3 text-[#F0EFEB] focus:outline-none focus:ring-1 focus:ring-[#1689C8] transition-all duration-300`}
                aria-invalid={!!errors.subject}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && (
                <p id="subject-error" className="text-sm text-red-400">
                  {errors.subject}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#F0EFEB]"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-xs ${
                    charCount < 10 ? "text-red-400" : "text-[#F0EFEB]/70"
                  }`}
                >
                  {charCount}/500 characters
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or inquiry..."
                className={`w-full bg-[#011825] border ${
                  errors.message ? "border-red-400" : "border-[#1689C8]/50"
                } rounded-md p-3 text-[#F0EFEB] min-h-[150px] resize-y focus:outline-none focus:ring-1 focus:ring-[#1689C8] transition-all duration-300`}
                maxLength={500}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-400">
                  {errors.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between pt-2"
            >
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-5 py-2.5 bg-transparent border border-[#1689C8]/50 rounded-md text-[#F0EFEB] hover:bg-[#0D3056] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-[#1689C8] hover:bg-[#1689C8]/80 rounded-md text-[#F0EFEB] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#F0EFEB]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
