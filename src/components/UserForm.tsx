import { useState, ChangeEvent, FormEvent } from "react";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: string;
  company: string;
}

function UserForm() {
  const [newUser, setNewUser] = useState<NewUser>(Object);
  const [formData, setFormData] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    address: "",
    company: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setNewUser(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
        <p
          className="text-center pb-2 text-3xl  font-bold text-green-500 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
          bg-[length:100%_6px] bg-no-repeat bg-bottom"
        >
          Add a user
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
          <label className="font-bold text-lg text-white ">First Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="first name"
            className="border rounded-lg py-3 px-3 mt-4  bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <label className="font-bold text-lg text-white">Last Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="last name"
            className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <label className="font-bold text-lg text-white ">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="email"
            className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <label className="font-bold text-lg text-white ">Avatar</label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={formData.image}
            placeholder="avatar link"
            className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <label className="font-bold text-lg text-white ">Address</label>
          <input
            type="address"
            name="address"
            onChange={handleChange}
            value={formData.address}
            placeholder="address"
            className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <label className="font-bold text-lg text-white ">Company Name</label>
          <input
            type="company"
            name="company"
            onChange={handleChange}
            value={formData.company}
            placeholder="company name"
            className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white"
          />
          <button
            type="submit"
            className="border hover:bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
          >
            Add User
          </button>
        </form>
      </div>

      {newUser && (
        <div className="ml-8 relative isolate aspect-video bg-zinc-300 py-6 px-6 rounded-xl ring-1 ring-white/5 backdrop-blur-3xl w-80 my-4 shadow-lg">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div
            className=" text-white bg-indigo-400 flex items-center  absolute rounded-full py-4 px-4
               shadow-xl left-32 -top-6"
          >
            {/* Avatar  */}
            <img src={newUser.image} width={40} height={40} />
          </div>
          <div className="mt-8 text-xl font-semibold my-2 text-center font-mono">
            {newUser.firstName} {newUser.lastName}
            <div className="mt-2 space-x-2 text-slate-700 text-sm  font-thin">
              <div>Email: {newUser.email}</div>
              <div>Address : {newUser.address}</div>
              <div> Company Name : {newUser.company}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserForm;
