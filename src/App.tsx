import './App.css';
import Layout from "./components/Layout";
import {useEffect} from "react";
import {fetchCurrencies} from "./api/CBRApi";
import {useAppDispatch, useAppSelector} from "./hooks/redux";


function App() {
    const dispatch = useAppDispatch()
    const currencies = useAppSelector(state => state.currencies)

    useEffect(() => {
        dispatch(fetchCurrencies())
    }, [dispatch])

    return (
        <>
            {Object.keys(currencies).length > 0 &&
                <Layout />
            }
        </>
    );
}

export default App;
