import About from '../About';
import Portfolio from '../Portfolio';
import './Home.scss';

export default function Home() {
  return (
    <>
      <About />
      <Portfolio limited={true} />
    </>
  );
}
