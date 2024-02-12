import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="bg-slate-950 pb-10">
      <p
        className="py-10 text-center pb-2 text-3xl  font-bold text-green-500 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
          bg-[length:15%_6px] bg-no-repeat bg-bottom"
      >
        User List
      </p>
      <UserList />
      <p
        className="mt-16 text-center pb-2 text-3xl  font-bold text-green-500 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
          bg-[length:40%_6px] bg-no-repeat bg-bottom"
      >
        Add user to see the updated user card
      </p>
      <UserForm />
    </div>
  );
}

export default App;
