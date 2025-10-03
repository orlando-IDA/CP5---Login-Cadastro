export default function LoginPage() {
  return (
    <div>
      <h2>Entrar</h2>
      <form>
        <div>
          <label htmlFor="nomeUsuario">Nome de Usuário</label>
          <input id="nomeUsuario" type="text" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}