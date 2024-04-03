import { useMemo, useState } from "react";

import "./App.css";
import Home from "./components/Home";
import { DataContext } from "./Data/context";

const initialState = {
	follower: "",
	following: "",
};

const initialResult = {
	accounts_not_following_me: [],
	accounts_I_dont_follow_back: [],
};

function App() {
	const [list, setList] = useState(initialState);
	const [radio, setRadio] = useState(0);
	const [result, setResult] = useState(initialResult);

	const contextValue = useMemo(
		() => ({ list, setList, radio, setRadio, result, setResult }),
		[list, radio, result]
	);

	return (
		<DataContext.Provider value={contextValue}>
			<Home />
		</DataContext.Provider>
	);
}

export default App;
