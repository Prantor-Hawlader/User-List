import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="bg-slate-950 pb-10">
      <p
        className="py-10 text-center pb-2 text-3xl  font-bold text-green-500 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
          bg-[length:20%_6px] bg-no-repeat bg-bottom"
      >
        User List
      </p>
      <UserList />
      <UserForm />
    </div>
  );
}

export default App;
