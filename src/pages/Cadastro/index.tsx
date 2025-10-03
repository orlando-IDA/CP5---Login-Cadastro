import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const cadastroSchema = z.object({
  nome: z.string().min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  nomeUsuario: z.string().min(5, { message: "O nome de usuário precisa ter no mínimo 5 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
});

type CadastroInput = z.infer<typeof cadastroSchema>;

const API_URL = import.meta.env.VITE_API_URL;

export default function Cadastro() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<CadastroInput>({
    resolver: zodResolver(cadastroSchema),
  });
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const responseUsername = await fetch(${API_URL}/usuarios?nomeUsuario=${data.nomeUsuario});
      const usernameData = await responseUsername.json();

      if (usernameData.length > 0) {
        alert("Nome de usuário já existe. Por favor, escolha outro.");
        return;
      }

      const responseEmail = await fetch(${API_URL}/usuarios?email=${data.email});
      const emailData = await responseEmail.json();

      if (emailData.length > 0) {
        alert("E-mail já cadastrado. Por favor, utilize outro.");
        return;
      }

    } catch (error) {
      console.error("Erro ao verificar duplicidade:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Criar Conta
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            id="nome"
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...register("nome")}
          />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
        </div>
        <div>
          <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">
            Nome de Usuário
          </label>
          <input
            id="nomeUsuario"
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          {...register("nomeUsuario")}
          />
            {errors.nomeUsuario && <p className="text-red-500 text-sm">{errors.nomeUsuario.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          {...register("email")}
          />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}