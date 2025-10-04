import { useForm } from 'react-hook-form';
import { getUsuarioByCreds } from '../../services/api';
import { useAuth } from '../../context/Authcontext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

type FormLogin = { nomeUsuario: string; email: string; lembrar?: boolean };

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormLogin>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [erroLogin, setErroLogin] = useState<string | null>(null);

  const onSubmit = async (data: FormLogin) => {
    setErroLogin(null);
    try {
      const encontrados = await getUsuarioByCreds(data.nomeUsuario.trim(), data.email.trim());
      if (encontrados.length === 1) {
        login(encontrados[0], !!data.lembrar); 
        navigate('/'); 
        return;
      }
      setErroLogin('Usuário ou e-mail não conferem.');
    } catch (e) {
      setErroLogin('Erro ao autenticar. Tente novamente.');
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nome de usuário</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            {...register('nomeUsuario', { required: 'Informe o nome de usuário' })}
            placeholder="seuusuario"
          />
          {errors.nomeUsuario && <p className="text-red-600 text-xs mt-1">{errors.nomeUsuario.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">E-mail</label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2"
            {...register('email', {
              required: 'Informe o e-mail',
              pattern: { value: /\S+@\S+\.\S+/, message: 'E-mail inválido' }
            })}
            placeholder="voce@exemplo.com"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('lembrar')} />
          Manter-me conectado (salvar no navegador)
        </label>

        {erroLogin && <p className="text-red-700 text-sm">{erroLogin}</p>}

        <button
          disabled={isSubmitting}
          className="w-full rounded-md bg-slate-900 text-white py-2 hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-sm mt-4">
        Não tem conta? <Link to="/cadastro" className="underline">Cadastre-se</Link>
      </p>
    </div>
  );
}
