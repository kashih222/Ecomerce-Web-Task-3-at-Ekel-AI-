import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CONTACT_MESSAGE } from "../../../GraphqlOprations/mutation";

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [sendMessage, { loading }] = useMutation(SEND_CONTACT_MESSAGE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await sendMessage({
        variables: {
          contactInput: {
            fullName: formData.fullName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        },
      });

      setSuccess("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center mt-60">
      <div className="container min-h-screen w-full px-4">

        {/* FORM */}
        <div className="py-20">
          <form
            className="w-full max-w-xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-xl text-black space-y-6"
            onSubmit={handleSubmit}
          >
            {success && <p className="text-green-600 font-semibold">{success}</p>}
            {error && <p className="text-red-600 font-semibold">{error}</p>}

            <div>
              <label className="font-semibold text-lg">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="font-semibold text-lg">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="font-semibold text-lg">Subject</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="font-semibold text-lg">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full mt-2 p-3 rounded-lg border resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
