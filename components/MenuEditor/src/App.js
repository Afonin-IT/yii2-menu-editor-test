import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from "react-bootstrap";
import MainLayout from "./layouts/MainLayout";
import Editor from "./components/Editor";
import EditModal from "./components/EditModal";

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <div className="App">
        <MainLayout>
          <h1>Menu Editor</h1>
          <Editor />
          <EditModal />
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}

export default App;
