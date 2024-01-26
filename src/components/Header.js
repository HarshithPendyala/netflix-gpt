import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { NetflixLogo, UserLogo } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSearchSlice";
import { languageOptions } from "../utils/languageConstants";
import { setSelectedLang } from "../utils/configSlice";
import { addResults } from "../utils/gptSearchSlice";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	const user = useSelector((store) => store.user);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(addResults({ gptMovies: null, tmdbMovies: null }));
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleGptSearch = () => {
		// toggle GPTSearch component using gptSlice
		dispatch(toggleGptSearch());
	};

	const handleLanguageOptions = (e) => {
		dispatch(setSelectedLang(e.target.value));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName } = user;
				dispatch(addUser({ email: email, uid: uid, displayName: displayName }));
				navigate("/browse");
			} else {
				// User is signed out
				// ...
				dispatch(removeUser());
				navigate("/");
			}
		});

		//insubscribe onAuthStateChanged when Header component unmounts
		return () => unsubscribe();
	}, []);

	return (
		<>
			<div className="absolute w-full md:px-10 md:pt-4 pb-4 bg-gradient-to-b lg:from-black z-10 flex flex-col md:flex-row  md:justify-between">
				<img className="w-40 mx-auto md:mx-0" src={NetflixLogo} alt="logo" />
				{user && (
					<div className="flex flex-wrap h-12 mx-auto md:mx-0 md:justify-between">
						{showGptSearch && (
							<select
								className="p-2 my-1 mx-2 bg-gray-600 text-gray-300 rounded-md"
								onChange={(event) => handleLanguageOptions(event)}
							>
								{languageOptions.map((lang) => (
									<option key={lang.value} value={lang.value}>
										{lang.name}
									</option>
								))}
							</select>
						)}
						<button
							className="text-white font-semibold bg-purple-700 text-sm lg:text-base px-2 lg:px-6 rounded-md mx-2"
							onClick={handleGptSearch}
						>
							{showGptSearch ? "Homepage" : "GPT Search"}
						</button>
						<img
							className="p-0.5 w-12 rounded-sm hidden"
							src={UserLogo}
							alt="user-img"
						/>
						<button
							className="text-sm lg:text-base px-4 lg:px-6 ml-1 font-bold text-red-500 border border-red-500 rounded-md shadow-sm hover:bg-red-500 hover:text-white"
							onClick={handleSignOut}
						>
							Sign-Out
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
