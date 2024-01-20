import { useEffect, useState } from "react";

export type Dictionary = string[];

const fetchDictionary = async (): Promise<Dictionary> => {
	const data = await fetch(
		"https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
	);
	const text = await data.text();
	return text.split("\r\n");
};

export const useDictionary = () => {
	const [dictionary, setDictionary] = useState<Dictionary>([]);
	useEffect(() => {
		fetchDictionary().then(setDictionary);
	}, []);

	const searchDictionary = (query) => {
		// I refetch the data because I need to search through the entire dictionary
		// Ofc I could always keep a copy of the entire dictionary and search through that but that would hurt performance
		fetchDictionary().then((data) => {
			setDictionary(data.filter((items) => items.includes(query)));
		});
	};

	return { dictionary, setDictionary, searchDictionary };
};
