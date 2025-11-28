"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("⚠️ Please fill all fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/constactUs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("⚠️ Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("❌ Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="grow flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-3xl border p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900">
            Contact Us
          </h1>

          <p className="mb-8 text-gray-700 text-center">
            For inquiries related to submissions, editorial policies, or general questions,
            please contact us using the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold text-gray-900">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-900">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                rows="5"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-[#0091ff] hover:bg-blue-700 cursor-pointer"
                } text-white font-semibold px-8 py-2.5 rounded-lg transition`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
