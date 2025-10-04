import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

export default function AppLayout() {
  const { usuario, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <nav className="flex gap-4 text-sm">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/cadastro" className="hover:underline">Cadastro</Link>
          </nav>

          <div className="text-right">
            {usuario ? (
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <div className="font-semibold">{usuario.nome}</div>
                  <div className="text-slate-600">{usuario.email}</div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs rounded-md border px-2 py-1 hover:bg-slate-100"
                >
                  Sair
                </button>
              </div>
            ) : (
              <span className="text-xs text-slate-500">Não autenticado</span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
