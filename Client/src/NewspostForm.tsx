import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Newspost } from "./Newspost.ts";

function NewspostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit() {
    const method = id === undefined ? "POST" : "PUT";
    const url = id === undefined ? "/api/newsposts" : `/api/newsposts/${id}`;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, text }),
    });
    navigate("/");
  }

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    async function loadNewspost() {
      const response = await fetch(`/api/newsposts/${id}`);
      const loadedNewspost: Newspost = await response.json();
      setTitle(loadedNewspost.title);
      setText(loadedNewspost.text);
    }
    loadNewspost();
  }, [id]);

  return (
    <div>
      <h1>{id === undefined ? "Create news" : "Edit news"}</h1>
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default NewspostForm;
