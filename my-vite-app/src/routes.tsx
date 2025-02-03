import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Favorites from "../pages/Favorites.tsx";
import {CatRepositoryAPI} from "../infrastructure/CatRepositoryAPI.ts";
import Breeds from "../pages/Breeds.tsx";

const repository = new CatRepositoryAPI()

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage repository={repository}/>}>
          <Route path="cat/:catId" element={<HomePage repository={repository} />}/>
        </Route>

        <Route path="/breeds" element={<Breeds repository={repository}/>}>
          <Route path=":breedId" element={<Breeds repository={repository}/>}/>
        </Route>

        <Route path="/favorites" element={<Favorites repository={repository}/>}/>

        {/*<Route path="*" element={<Navigate to="/cats"/>}/>*/}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;