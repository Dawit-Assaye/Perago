import { MantineProvider } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./App.css";
import "./index.css";

function App() {
    const form = useForm({
      initialValues: {
        name: "",
        email: "",
      },
    });
  return (
    <MantineProvider>
      <div>
        Hello World! hey hey
      </div>
    </MantineProvider>
  );
}

export default App;
