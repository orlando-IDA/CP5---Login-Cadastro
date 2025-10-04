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
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome de usuário</label>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...register('nomeUsuario', { required: 'Informe o nome de usuário' })}
            placeholder="seu_usuario"
          />
          {errors.nomeUsuario && <p className="text-red-600 text-xs mt-1">{errors.nomeUsuario.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
          Manter-me conectado
        </label>

        {erroLogin && <p className="text-red-700 text-sm">{erroLogin}</p>}

        <button
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-sm mt-4">
        Não tem conta? <Link to="/cadastro" className="underline">Cadastre-se</Link>
      </p>
    </div>
  );
}
