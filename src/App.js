import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';
import { Form } from './components/Form/Form';
import { SpeedDialButton } from './components/SpeedDialButton/SpeedDialButton';
// import { useTelegram } from './hooks/useTelegram';


function App() {

  // const { tg } = useTelegram()

  useEffect(() => {
    const tg = window.Telegram.WebApp
    tg.ready()
  }, [])

  return (
    <div className="App">
      <Header>Заголовок</Header>
      <Routes>
        <Route index element={<ProductList />}></Route>
        <Route path={'form'} element={<Form />}></Route>
      </Routes>
      <SpeedDialButton />
    </div>
  );
}

export default App;
