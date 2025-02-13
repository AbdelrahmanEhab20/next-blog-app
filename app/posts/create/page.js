"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const AddNewPost = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(40, "Title cannot be more than 40 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(400, "Description cannot be more than 400 characters"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.message || "An error occurred while creating the post"
          );
        }

        // Handle success
        setSubmitSuccess(true);
        resetForm(); // Reset the form after successful submission
        setSubmitError(null); // Clear any previous errors

        router.push("/posts"); // Redirect to posts page
      } catch (error) {
        setSubmitError(error.message);
        setSubmitSuccess(false); // Ensure success message is cleared on error
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Automatically clear the success message after 3 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000); // Clear the message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full p-8 bg-white shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Post</h1>
        <p className="text-gray-500">Create your dream post</p>

        {/* Display success message */}
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Post created successfully!
          </div>
        )}

        {/* Display error message */}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {submitError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          {/* Title Field */}
          <div>
            <input
              className={`w-full p-3 text-gray-700 border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
              placeholder="Enter Title"
              name="title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <textarea
              className={`w-full p-3 text-gray-700 border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
              placeholder="Enter description here..."
              name="description"
              {...formik.getFieldProps("description")}
              rows="5"
              maxLength="5000"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {formik.isSubmitting ? "Processing..." : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPost;
