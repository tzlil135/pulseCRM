import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Providers from "./wrappers/providers/Providers";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Providers>
          <Layout />
        </Providers>
      </BrowserRouter>
    </>
  );
}
export default App;
