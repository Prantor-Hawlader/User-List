import { sort } from "fast-sort";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  address: { address: string };
  company: { name: string };
}

const Card = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<User[] | []>([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        const usersData: User[] = await data.users;

        setUsers(usersData);
        setFilterData(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSortOrder = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value;

    if (sortOrder === "email") {
      const sortData = sort(users).asc((user) => user.email);
      setUsers(sortData);
    }
    if (sortOrder === "name") {
      const sortData = sort(users).asc((user) => user.firstName);
      setUsers(sortData);
    }
    if (sortOrder === "company") {
      const sortData = sort(users).asc((user) => user.company.name);
      setUsers(sortData);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      const matchedUsers = users.filter((user) => {
        return `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

      setUsers(matchedUsers);
    } else {
      setUsers(filterData);
    }

    setSearchPhrase(event.target.value);
  };
  return (
    <div className="pt-10">
      <div className="flex items-center justify-center">
        <div className="flex justify-around">
          <div className="relative w-60">
            <select
              onChange={handleSortOrder}
              className="py-3 px-4 pe-16  w-full border-teal-500 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
            >
              <option value="email">Sort by Email</option>
              <option value="name" selected>
                Sort by Name
              </option>
              <option value="company">Sort by Company</option>
            </select>
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-8">
              <svg
                className="flex-shrink-0 h-4 w-4 text-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchPhrase}
          onChange={handleSearch}
          className="w-60 py-3 px-4 block  border-green-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ml-10"
        ></input>
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className="relative bg-white py-6 px-6 rounded-3xl w-72 my-4 shadow-xl"
            >
              <div className=" text-white bg-green-300 flex items-center  absolute rounded-full py-4 px-4 shadow-xl left-28 -top-6">
                {/* Avatar  */}
                <img src={user.image} width={40} height={40} />
              </div>
              <div className="mt-8">
                <p className="text-xl font-semibold my-2 text-center">
                  <Link to={`/users/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </p>
                <div className="flex space-x-2 text-gray-400 text-sm">
                  {/* icon  */}

                  <p>Email: {user.email}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  {/* icon 2 */}

                  <p>Address : {user.address.address}</p>
                </div>
                <div className="flex space-x-2 text-gray-400 text-sm my-3">
                  {/* icon 2 */}

                  <p>Company : {user.company.name}</p>
                </div>
                <div className="border-t-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
