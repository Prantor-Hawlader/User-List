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
    <div className="pt-10 flex items-center justify-center  pb-10 bg-slate-950 h-screen">
      <div className=" w-2/4 px-6 py-6 border border-indigo-600    bg-gray-800 rounded-lg xl:px-10">
        <div className="space-y-4 xl:space-y-6">
          <img
            className="mx-auto rounded-full h-36 w-36"
            src={user.image}
            alt="author avatar"
          />
          <div className="space-y-2">
            <div className="flex items-center flex-col space-y-3 text-lg font-medium leading-6">
              <div className="flex-col">
                {user.address && (
                  <div className="mt-2 text-green-400  font-mono">
                    <h1 className="text-indigo-600 text-center text-3xl mb-4">
                      {user.firstName} {user.lastName}
                    </h1>
                    <div className="font-light">
                      <div>Email : {user.email}</div>
                      <div>Address : {user.address.address}</div>
                      <div>City : {user.address.city}</div>
                      <div>Company Name : {user.company.name}</div>
                    </div>
                  </div>
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
