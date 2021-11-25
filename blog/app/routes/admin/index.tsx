import { Link } from "remix";

const AdminIndex = () => {
  return (
    <p>
      <Link to="new">Create a New Post</Link>
    </p>
  );
};

export default AdminIndex;
