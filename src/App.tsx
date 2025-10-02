import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <Outlet />
    </main>
  )
}

export default App;