import Terminal from '../components/Terminal';
import CrtWrapper from '../components/CrtWrapper';


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-8">
      <CrtWrapper>
        <Terminal />
      </CrtWrapper>
    </main>
  );
}
