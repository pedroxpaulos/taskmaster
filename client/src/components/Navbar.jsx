import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const links = [
		{ id: 1, link: 'tasks' },
		{ id: 2, link: 'daily view' },
		{ id: 3, link: 'calendar view' },
	];
	return (
		<div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed">
			<div>
				<h1 className="text-5xl ml-2 font-extralight">Taskmaster</h1>
			</div>
			<ul className="hidden md:flex">
				{links.map(({ id, link }) => (
					<li
						key={id}
						className="px-4 cursor-pointer capitalize font-extralight"
					>
						{link}
					</li>
				))}
			</ul>
			<div
				onClick={() => setNav(!nav)}
				className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
			>
				{nav ? <FaTimes size={30} /> : <FaBars size={30} />}
			</div>
			{nav && (
				<ul className="flex flex-col justify-center items-center absolute top-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-300">
					{links.map(({ id, link }) => (
						<li
							key={id}
							className="px4 cursor-pointer capitalize py-6 text-4xl font-extralight"
						>
							{link}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Navbar;
