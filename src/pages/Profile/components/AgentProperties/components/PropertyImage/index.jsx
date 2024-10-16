import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PropertyImage() {
  const [imageUrl, setImageUrl] = useState(""); // Input field for the image URL
  const [images, setImages] = useState([]); // State to hold the list of property images
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading
  let { id } = useParams();
  let token = localStorage.getItem("Token");

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please enter a valid image URL.");
      return;
    }

    try {
      setLoading(true);

      // Correct Axios POST request structure
      const response = await axios.post(
        `http://127.0.0.1:8000/api/properties/${id}/images`,
        {
          image_url: imageUrl, // Sending the image URL as part of the data
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Include token in headers
            Accept: "application/json",
          },
        }
      );

      // Check for the success status in Axios
      if (response.status !== 200) {
        throw new Error("Failed to upload image.");
      }

      alert("Image uploaded successfully!");
      setImageUrl(""); // Clear input field after submission
      fetchImages(); // Refresh the list of images after the upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all property images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/properties/${id}/images`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Include token in headers
            Accept: "application/json",
          },
        }
      );

      //   if (!response.ok) {
      //     throw new Error("Failed to fetch images.");
      //   }
      console.log("imageRespon", response);
      const data = response.data.data;
      console.log("images", data);
      setImages(data); // Assuming the API response has 'images' array
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images.");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an image
  const handleDelete = async (imageId) => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/images/${imageId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Include token in headers
            Accept: "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete image.");
      }

      alert("Image deleted successfully!");
      fetchImages(); // Refresh the list of images after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Error deleting image.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="container  text-center border py-5 offwhite">
      <h2>Property Images</h2>

      {/* Form to submit image URL */}
      <form onSubmit={handleSubmit} className="mb-5 mt-3">
        <label className="h2 mb-2 mx-auto text-center">
          Add New Image URL
          <input
            type="url"
            value={imageUrl}
            className="form-control me-2 mt-2"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-outline-primary ms-2"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

      {/* Image preview section */}
      <div>
        <h3>Uploaded Images:</h3>
        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
            {images.length === 0 ? (
              <p>No images uploaded yet.</p>
            ) : (
              images.map((image) => (
                <div key={image.id} className="w-25">
                  <img
                    src={image.image_url}
                    alt={`Property ${id}`}
                    className="w-100"
                  />
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="btn btn-outline-danger w-100"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
