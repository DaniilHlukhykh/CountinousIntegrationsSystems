import { useEffect, useState } from "react";
import type { Newspost } from "./Newspost.ts";
import { Link } from "react-router-dom";

function NewspostList() {
  const [newsposts, setNewsposts] = useState<Newspost[]>([]);

  useEffect(() => {
    async function loadNewsposts() {
      const response = await fetch("/api/newsposts");
      const loadedNewsposts: Newspost[] = await response.json();
      setNewsposts(loadedNewsposts);
    }
    loadNewsposts();
  }, []);

  return (
    <div>
      <Link to="/newsposts/new">Add News</Link>
      {newsposts.map((newspost) => (
        <div key={newspost.id}>
          <h2>
            <Link to={`/newsposts/${newspost.id}`}>{newspost.title}</Link>
          </h2>
          <p className="newspost-text">{newspost.text}</p>
          <p>
            Author:{" "}
            {newspost.author === null ? "Unknown" : newspost.author.email}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NewspostList;
