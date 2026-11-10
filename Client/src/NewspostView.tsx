import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Newspost } from "./Newspost.ts";

function NewspostView() {
  const { id } = useParams();
  const [newspost, setNewspost] = useState<Newspost | undefined>(undefined);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function loadNewspost() {
      const response = await fetch(`/api/newsposts/${id}`);
      if (!response.ok) {
        setIsNotFound(true);
        return;
      }
      const loadedNewspost: Newspost = await response.json();
      setNewspost(loadedNewspost);
    }
    loadNewspost();
  }, [id]);

  if (isNotFound) {
    return (
      <div>
        <p>Newspost not found</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  if (newspost === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newspost.title}</h1>
      <p>{newspost.text}</p>
      <p>
        Author: {newspost.author === null ? "Unknown" : newspost.author.email}
      </p>
      <Link to={`/newsposts/${newspost.id}/edit`}>Edit</Link>
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default NewspostView;
