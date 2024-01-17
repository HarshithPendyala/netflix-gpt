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

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const showGptSearch = useSelector((store) => store.gptSearch.showGptSearch);
	const user = useSelector((store) => store.user);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
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
			<div className="absolute w-full pl-16 pt-4 bg-gradient-to-b from-black z-10 flex flex-wrap justify-between bg-transparent">
				<img className="w-40" src={NetflixLogo} alt="logo" />
				{user && (
					<div className="flex flex-wrap h-12 justify-between">
						{showGptSearch && (
							<select
								className="p-2 my-1 bg-gray-600 text-gray-300"
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
							className="text-white font-semibold bg-purple-700 px-4 rounded-lg mx-2"
							onClick={handleGptSearch}
						>
							GPT Search
						</button>
						<img
							className="p-0.5 w-12 rounded-sm"
							src={UserLogo}
							alt="user-img"
						/>
						<button
							className="px-4 ml-1 mr-2 font-bold text-red-500 border border-red-500 rounded-md shadow-sm hover:bg-red-500 hover:text-white"
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
