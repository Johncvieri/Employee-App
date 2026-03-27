
export const Button = ({ children, ...props }: any) => {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {children}
    </button>
  );
};

export const Badge = ({ gender }: any) => {
  return (
    <span className="px-2 py-1 bg-gray-200 rounded text-sm">
      {gender === 1 ? 'Male' : 'Female'}
    </span>
  );
};

export const TableHead = ({ labels }: any) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {labels.map((l: string) => (
          <th key={l} className="p-2 border">{l}</th>
        ))}
      </tr>
    </thead>
  );
};