import { useParams } from "react-router-dom";

export default function ProfileView() {
  const { username } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="text-muted-foreground mt-2">
        Viewing profile of:
      </p>

      <div className="mt-4 p-4 bg-card rounded-lg border">
        <p className="text-lg font-semibold">{username}</p>
      </div>
    </div>
  );
}