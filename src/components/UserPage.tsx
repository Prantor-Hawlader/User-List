import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  address: { address: string; city: string };
  company: { name: string };
}
const UserPage = () => {
  const params = useParams();
  const id = params.userId;
  console.log(params);
  const [user, setUser] = useState<User>(Object);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data: User = await res.json();

        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className=" w-96 px-6 py-6   bg-gray-800 rounded-lg xl:px-10">
        <div className="space-y-4 xl:space-y-6">
          <img
            className="mx-auto rounded-full h-36 w-36"
            src={user.image}
            alt="author avatar"
          />
          <div className="space-y-2">
            <div className="flex items-center flex-col space-y-3 text-lg font-medium leading-6">
              <h1 className="text-white text-center text-3xl">
                {user.firstName} {user.lastName}
              </h1>

              <div className="flex-col">
                <p className="mt-1 text-indigo-300 ">Email : {user.email}</p>

                {user.address && (
                  <p className="mt-1 text-indigo-300 ">
                    Address : {user.address.address}
                  </p>
                )}
                {user.address && (
                  <p className="mt-1 text-indigo-300 ">
                    City : {user.address.city}
                  </p>
                )}
                {user.company && (
                  <p className="mt-1 text-indigo-300 ">
                    Company : {user.company.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
