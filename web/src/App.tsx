import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Providers from "./wrappers/providers/Providers";
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Providers>
          <Layout />
        </Providers>
      </BrowserRouter>
    </>
  );
}
export default App;
