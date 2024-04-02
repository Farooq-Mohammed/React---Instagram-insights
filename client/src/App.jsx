import "./App.css";

import { useState } from "react";

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

	const handleTextAreaChange = (e) => {
		setList({ ...list, [e.target.name]: e.target.value });
	};

	const createSet = (string) =>
		new Set(
			string
				.trim()
				.split("\n")
				.filter((str) => isNaN(new Date(str)))
		);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { following, follower } = list;

		if (following.trim() === "" || follower.trim() === "") {
			alert("Cannot check for empty values");
			return;
		}
		const following_list_ar = createSet(following);
		const follower_list_ar = createSet(follower);

		let accounts_not_following_me = [];
		let accounts_I_dont_follow_back = [];

		following_list_ar.forEach((account) => {
			if (!follower_list_ar.has(account)) {
				accounts_not_following_me.push(account);
			}
		});

		follower_list_ar.forEach((account) => {
			if (!following_list_ar.has(account)) {
				accounts_I_dont_follow_back.push(account);
			}
		});

		setResult({
			...result,
			accounts_not_following_me,
			accounts_I_dont_follow_back,
		});
	};

	const toggleList = () => {
		setList({ ...list, follower: list.following, following: list.follower });
	};

	return (
		<div className="main">
			{/* Navbar still in progress */}
			<div className="textarea-container">
				<div className="form-container">
					<label htmlFor="following">Following list: </label>
					<textarea
						rows={15}
						name="following"
						id="following"
						value={list.following}
						onChange={handleTextAreaChange}
					></textarea>
				</div>
				<div className="form-container">
					<label htmlFor="follower">Follower list: </label>
					<textarea
						rows={15}
						name="follower"
						id="follower"
						value={list.follower}
						onChange={handleTextAreaChange}
					></textarea>
				</div>
			</div>
			<div className="btn-group">
				<button className="btn btn-submit" onClick={handleSubmit}>
					Submit
				</button>
				<button className="btn" onClick={toggleList}>
					Toggle list
				</button>
			</div>
			{(result.accounts_I_dont_follow_back.length !== 0 ||
				result.accounts_not_following_me.length !== 0) && (
				<>
					<div className="tab-section">
						<div className="tab">
							<input
								type="radio"
								name="tab"
								id="people-not-following-me"
								value="0"
								onChange={() => setRadio(0)}
								defaultChecked
							/>
							<label htmlFor="people-not-following-me">
								<span>People not following me</span>
							</label>
						</div>
						<div className="tab">
							<input
								type="radio"
								name="tab"
								id="you-not-following"
								value="1"
								onChange={() => setRadio(1)}
							/>
							<label htmlFor="you-not-following">
								<span>People I don&apos;t follow back</span>
							</label>
						</div>
					</div>
					<div className="result">
						{radio === 0 ? (
							<div className="table tab_panel">
								{result.accounts_not_following_me.map((account) => (
									<a
										key={account + "__$"}
										target="_blank"
										href={`https://www.instagram.com/${account}`}
										title={account}
									>
										{account}
									</a>
								))}
							</div>
						) : (
							<div className="table tab_panel">
								{result.accounts_I_dont_follow_back.map((account) => (
									<a
										key={account + "_$"}
										target="_blank"
										href={`https://www.instagram.com/${account}`}
										title={account}
									>
										{account}
									</a>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
