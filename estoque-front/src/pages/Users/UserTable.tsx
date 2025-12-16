type User = {
  id: string;
  name: string;
  email: string;
  type: "ADMIN" | "GERENTE" | "FUNCIONARIO";
};

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Nome</th>
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-left">Tipo</th>
          <th className="border px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.type}</td>
            <td className="border px-4 py-2 text-center flex justify-center gap-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
