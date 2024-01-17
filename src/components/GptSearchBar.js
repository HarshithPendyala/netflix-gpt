import React from "react";
import { lang } from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
	const langValue = useSelector((store) => store.config.lang);
	return (
		<div className="pt-[10%] flex justify-center">
			<form className=" grid grid-cols-12 w-1/2">
				<input
					className="p-2 m-2 rounded-lg col-span-9"
					type="text"
					placeholder={lang[langValue].placeholder}
				/>
				<button className="p-2 m-2 rounded-lg bg-purple-600 text-white col-span-3">
					{lang[langValue].button}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
