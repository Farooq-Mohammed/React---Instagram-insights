import { useContext } from "react";
import { IoMdSwap, IoMdSend } from "react-icons/io";
import { DataContext } from "../Data/context";
import Navbar from "./Navbar";

const TextContainer = () => {
	const { list, setList } = useContext(DataContext);

	const handleTextAreaChange = (e) => {
		setList({ ...list, [e.target.name]: e.target.value });
	};

	return (
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
	);
};

const ButtonGroup = () => {
	const { list, setList, setResult } = useContext(DataContext);

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

		setResult((prev) => ({
			...prev,
			accounts_not_following_me,
			accounts_I_dont_follow_back,
		}));
	};

	const toggleList = () => {
		setList({ ...list, follower: list.following, following: list.follower });
	};

	return (
		<div className="btn-group">
			<button className="btn btn-submit" onClick={handleSubmit}>
				<IoMdSend /> <span>Submit</span>
			</button>
			<button className="btn" onClick={toggleList}>
				<IoMdSwap /> <span>Toggle list</span>
			</button>
		</div>
	);
};

const TabSection = () => {
	const { setRadio } = useContext(DataContext);
	return (
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
	);
};

const TabPanel = (arr) => (
	<div className="table tab_panel">
		{arr.map((account) => (
			<a
				key={account + "__$"}
				target="_blank"
				href={`https://www.instagram.com/${account}`}
				title={account}
				className="ellipsis"
			>
				{account}
			</a>
		))}
	</div>
);

const ResultSection = () => {
	const { radio, result } = useContext(DataContext);

	return (
		<div className="result">
			{radio === 0
				? TabPanel(result.accounts_not_following_me)
				: TabPanel(result.accounts_I_dont_follow_back)}
		</div>
	);
};

const Home = () => {
	const { result } = useContext(DataContext);

	const isValid = (result) =>
		result.accounts_I_dont_follow_back.length !== 0 ||
		result.accounts_not_following_me.length !== 0;

	return (
		<>
			<Navbar />
			<div className="main">
				{/* Navbar still in progress */}
				<TextContainer />
				<ButtonGroup />
				{isValid(result) && (
					<>
						<TabSection />
						<ResultSection />
					</>
				)}
			</div>
		</>
	);
};

export default Home;
