export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Entrar
      </h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="nomeUsuario">Nome de Usuário</label>
          <input id="nomeUsuario" type="text" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" />
        </div>
        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}