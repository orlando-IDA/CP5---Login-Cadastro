import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="bg-gray-100 text-white min-h-screen flex flex-col justify-center items-center">
      <Outlet />
    </main>
  )
}

export default App;