import { useQuery } from '@tanstack/react-query';
import { getByCode } from '../services/diagnosis';

const DiagnosisCodeQuery = ({ code }: { code: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['diagnosis', code],
    queryFn: () => getByCode(code)
  });

  if (isLoading) return <li>{code} loading...</li>;

  return (
    <li>
      {code} {data?.name}
    </li>
  );
};

export default DiagnosisCodeQuery;
