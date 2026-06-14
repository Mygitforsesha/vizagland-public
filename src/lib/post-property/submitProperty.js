import axios from "axios";
import { MULTIPART_FIELDS } from "./media/constants";

const PROPERTIES_API_URL =
  "https://trapezoid-reprimand-registry.ngrok-free.dev/api/properties";

function showSubmissionToast(message, type = "danger") {
  const existing = document.getElementById("submit-property-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "submit-property-toast";
  toast.className = `fixed top-6 left-1/2 -translate-x-1/2 z-[99999] min-w-[400px] max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl border-l-4 backdrop-blur-md bg-white/95 px-6 py-4 flex items-center gap-3 text-base font-semibold text-gray-900 animate-slide-down ${
    type === "success" ? "border-green-600" : "border-red-600"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/**
 * Submits a property listing payload to the backend.
 */
export async function submitProperty(payload) {
  console.log("Post Property Payload:", payload);

  const {
    propertyImages = [],
    propertyDocuments = [],
    ...jsonPayload
  } = payload;

  const formData = new FormData();
  formData.append(MULTIPART_FIELDS.data, JSON.stringify(jsonPayload));

  propertyImages.forEach((image) => {
    if (image.file instanceof File) {
      formData.append("property_images[]", image.file);
    }
  });

  propertyDocuments.forEach((document) => {
    if (document.file instanceof File) {
      formData.append("property_documents[]", document.file);
    }
  });

  try {
    const response = await axios.post(PROPERTIES_API_URL, formData, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        showSubmissionToast(
          data?.message || "Validation error. Please check your inputs.",
        );
      } else if (status === 401) {
        showSubmissionToast("Unauthorized. Please log in and try again.");
      } else if (status === 500) {
        showSubmissionToast("Server error. Please try again later.");
      } else {
        showSubmissionToast(
          data?.message || "Something went wrong. Please try again.",
        );
      }
    } else {
      showSubmissionToast(
        "Unable to connect. Please check your network and try again.",
      );
    }

    throw error;
  }
}
