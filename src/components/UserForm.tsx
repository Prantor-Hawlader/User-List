import { useState, ChangeEvent, FormEvent } from "react";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address: string;
  company: string;
  // Add other user data properties here
}

function UserForm() {
  const [newUser, setNewUser] = useState<NewUser>(Object);
  const [formData, setFormData] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    address: "",
    company: "",
    // Add other user data properties here
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
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
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
            type="avatar"
            name="avatar"
            onChange={handleChange}
            value={formData.avatar}
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
            className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
