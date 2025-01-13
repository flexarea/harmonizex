/* eslint-disable no-console */
import React, { useState } from "react";
import { TextField, Button, Checkbox, Typography } from "@mui/material";
import { useRouter } from "next/router";

// eslint-disable-next-line react/prop-types
function UserForm({ userId }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    preferences: {
      prefer_men: false,
      prefer_women: false,
      prefer_enby: false,
      song_1: null,
      song_2: null,
      song_3: null,
      song_4: null,
      song_5: null,
    },
  });

  const router = useRouter();
  // Function to handle changes in the form inputs (text fields and checkboxes)
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev, // Spread the previous form data
        preferences: { ...prev.preferences, [name]: checked }, // Update the specific preference (checkbox state)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    }
  };
  // Function to set the gender value based on the user's selection
  const setGender = (selectedGender) => {
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const response = await fetch(`/api/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // Redirect to /swipe if the form submission is successful
      router.push("/swipeboard");
    } else {
      // eslint-disable-next-line no-alert
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" gutterBottom>
        Gender
      </Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <Button
          variant={formData.gender === "male" ? "contained" : "outlined"}
          onClick={() => setGender("male")}
        >
          Male
        </Button>
        <Button
          variant={formData.gender === "female" ? "contained" : "outlined"}
          onClick={() => setGender("female")}
        >
          Female
        </Button>
        <Button
          variant={formData.gender === "nonbinary" ? "contained" : "outlined"}
          onClick={() => setGender("nonbinary")}
        >
          Non-binary
        </Button>
      </div>
      <Typography variant="h6" gutterBottom>
        Preferences
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "15px",
        }}
      >
        <label>
          <Checkbox
            name="prefer_men"
            checked={formData.preferences.prefer_men}
            onChange={handleChange}
          />
          Men
        </label>
        <label>
          <Checkbox
            name="prefer_women"
            checked={formData.preferences.prefer_women}
            onChange={handleChange}
          />
          Women
        </label>
        <label>
          <Checkbox
            name="prefer_enby"
            checked={formData.preferences.prefer_enby}
            onChange={handleChange}
          />
          Non-binary
        </label>
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
}

export default UserForm;
