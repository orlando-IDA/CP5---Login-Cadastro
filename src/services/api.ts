export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function getUsuarioByCreds(nomeUsuario: string, email: string) {
  const url = new URL(`${API_URL}/usuarios`);
  url.searchParams.set('nomeUsuario', nomeUsuario);
  url.searchParams.set('email', email);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Falha ao consultar usuários');
  const data = await res.json();
  return data as Array<{ id: number; nome: string; nomeUsuario: string; email: string }>;
}
