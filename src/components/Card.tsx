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

interface Props {
  user: User;
}
const Card = ({ user }: Props) => {
  return (
    <div className="relative isolate aspect-video bg-zinc-300 py-6 px-6 rounded-xl ring-1 ring-white/5 backdrop-blur-3xl w-80 my-4 shadow-lg">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <div
        className=" text-white bg-indigo-400 flex items-center  absolute rounded-full py-4 px-4
               shadow-xl left-32 -top-6"
      >
        {/* Avatar  */}
        <img src={user.image} width={40} height={40} />
      </div>
      <div className="mt-8 text-xl font-semibold my-2 text-center font-mono">
        <Link to={`/users/${user.id}`}>
          {user.firstName} {user.lastName}
        </Link>

        <div className="mt-2 space-x-2 text-slate-700 text-sm  font-thin">
          <div>Email: {user.email}</div>
          <div>Address : {user.address.address}</div>
          <div> Company Name : {user.company.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
