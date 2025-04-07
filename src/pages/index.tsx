// src/pages/index.tsx
import { GetServerSideProps } from 'next';

export default function Home() {
  return null; // Não renderiza nada
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/analyze',
      permanent: true, // Use true se o redirecionamento for permanente (301), false para temporário (302)
    },
  };
};