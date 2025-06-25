import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContaminantList from "./pages/contaminants/ContaminantList";
import ContaminantForm from "./pages/contaminants/ContaminantForm";
import ContaminantEdit from "./pages/contaminants/ContaminantEdit";
import SoilTypeList from "./pages/soilTypes/SoilTypeList";
import SoilTypeForm from "./pages/soilTypes/SoilTypeForm";
import SoilTypeEdit from "./pages/soilTypes/SoilTypeEdit";
import PathwayList from "./pages/pathways/PathwayList";
import PathwayForm from "./pages/pathways/PathwayForm";
import PathwayEdit from "./pages/pathways/PathwayEdit";
import GuidelineValueList from "./pages/guidelineValues/GuidelineValueList";
import GuidelineValueForm from "./pages/guidelineValues/GuidelineValueForm";
import GuidelineValueEdit from "./pages/guidelineValues/GuidelineValueEdit";
import MeasurementList from "./pages/measurements/MeasurementList";
import MeasurementForm from "./pages/measurements/MeasurementForm";
import MeasurementEdit from "./pages/measurements/MeasurementEdit";
import "./App.css";

function App() {
  const Router = createBrowserRouter([
    { path: "/", element: <h1>Home</h1> },
    { path: "/contaminants", element: <ContaminantList /> },
    { path: "/contaminants/new", element: <ContaminantForm /> },
    { path: "/contaminants/edit/:id", element: <ContaminantEdit /> },
    { path: "/soil-types", element: <SoilTypeList /> },
    { path: "/soil-types/new", element: <SoilTypeForm /> },
    { path: "/soil-types/edit/:id", element: <SoilTypeEdit /> },
    { path: "/pathways", element: <PathwayList /> },
    { path: "/pathways/new", element: <PathwayForm /> },
    { path: "/pathways/edit/:id", element: <PathwayEdit /> },
    { path: "/guideline-values", element: <GuidelineValueList /> },
    { path: "/guideline-values/new", element: <GuidelineValueForm /> },
    { path: "/guideline-values/edit/:id", element: <GuidelineValueEdit /> },
    { path: "/measurements", element: <MeasurementList /> },
    { path: "/measurements/new", element: <MeasurementForm /> },
    { path: "/measurements/edit/:id", element: <MeasurementEdit /> },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
