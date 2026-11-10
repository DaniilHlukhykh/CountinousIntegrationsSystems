import { Routes, Route } from "react-router-dom";
import NewspostList from "./NewspostList.tsx";
import NewspostView from "./NewspostView.tsx";
import NewspostForm from "./NewspostForm.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewspostList />} />
      <Route path="/newsposts/:id" element={<NewspostView />} />
      <Route path="/newsposts/new" element={<NewspostForm />} />
      <Route path="/newsposts/:id/edit" element={<NewspostForm />} />
    </Routes>
  );
}

export default App;
