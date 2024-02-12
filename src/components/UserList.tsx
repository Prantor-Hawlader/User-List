import { sort } from "fast-sort";
import { ChangeEvent, useEffect, useState } from "react";
import Card from "./Card";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  address: { address: string };
  company: { name: string };
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [remainingData, setRemainingData] = useState<User[]>([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        const usersData: User[] = await data.users;

        setUsers(usersData);
        setRemainingData(usersData);
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
      setUsers(remainingData);
    }

    setSearchPhrase(event.target.value);
  };
  return (
    <div className="pt-10">
      <div className="flex items-center justify-center mx-36">
        <div className="flex justify-around">
          <div className="relative w-60 mr-6">
            <select
              onChange={handleSortOrder}
              className="py-3 px-4 pe-16   w-full border rounded-lg  bg-black border-indigo-600 placeholder-white-500 text-white"
            >
              <option value="" disabled selected hidden>
                Sort by
              </option>
              <option value="email">Sort by Email</option>
              <option value="name">Sort by Name</option>
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
          className="w-60 border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"
        />
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {users?.map((user) => (
            <Card user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
