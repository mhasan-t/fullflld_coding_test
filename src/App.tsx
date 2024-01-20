import React, { Children, FC, useEffect, useState } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";
import styled from "@emotion/styled";
import { useDebounce } from "./hooks/useDebounce";

const SearchBar = styled.input`
	border: 1px solid black;
	width: 100%;
	height: 40px;
	padding: 5px;
	overflow: auto;
	border: 1px solid #d3d3d3;
`;

function App() {
	const { dictionary, setDictionary, searchDictionary } = useDictionary();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQ = useDebounce(searchQuery); // debounce the search query to unnecessary reduce api calls

	useEffect(() => {
		searchDictionary(searchQuery);
	}, [debouncedSearchQ]);

	return (
		<div className="app">
			<div className="header">
				<div>Render Virtualized</div>
			</div>
			<div className="searchContainer">
				<SearchBar
					name="search"
					onChange={(e) => {
						setSearchQuery(e.target.value);
					}}
				></SearchBar>
			</div>
			<div className="content">
				<List items={dictionary} />
			</div>
		</div>
	);
}

export default App;
