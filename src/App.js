import InputField from './components/InputField';
import SearchButton from './components/SearchButton';
import SearchResults from './components/SearchResults';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <br></br>
      <InputField />
      <SearchButton />
      <br></br>
      <br></br>
      <SearchResults />
    </div>
  );
}
