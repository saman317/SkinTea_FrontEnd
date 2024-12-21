import React, { useState } from "react";
import * as skinteaService from "../../services/skinteaService";

const CommentForm = ({ skinteaId }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ text: "" });

    //
    const comment = await skinteaService.createComment(formData, skinteaId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your Reviews:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT REVIEW</button>
    </form>
  );
};

export default CommentForm;