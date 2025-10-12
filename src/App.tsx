import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { useRef } from "react";
import { FormSubmitContext } from "./contexts/FormSubmitContext";
import { ContactsGlobalFilterProvider } from "./contexts/ContactsGlobalFilter";

const App = () => {

  const submitFormRef = useRef<(() => void) | null>(null);

  const setSubmitFormFn = (fn: () => void) => {
    submitFormRef.current = fn;
  };

  const submitForm = () => {
    if (submitFormRef.current) {
      console.log("Calling submitFormRef.current");
      submitFormRef.current();
    } else {
      console.log("submitFormRef.current is null or undefined");
    }
  };

  return (
    <>
      <FormSubmitContext.Provider value={{ submitForm, setSubmitFormFn }}>
        <BrowserRouter>
          <ContactsGlobalFilterProvider>
            <Layout />
          </ContactsGlobalFilterProvider>
        </BrowserRouter>
      </FormSubmitContext.Provider>
    </>
  );
}
export default App;
