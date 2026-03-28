export const TableHead = ({ labels }: { labels: string[] }) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {labels.map((l) => (
          <th key={l} className="p-2 border text-left">
            {l}
          </th>
        ))}
      </tr>
    </thead>
  );
};