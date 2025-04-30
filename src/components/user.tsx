import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        const user = data.map((user: { name: string }) => user.name);

        // Only update state if component is still mounted
        if (isMounted) {
          setUser(user);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2>User</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {user.map((user: string, index: number) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      )}
      <button disabled>Click Here</button>
    </div>
  );
};
export default User;
