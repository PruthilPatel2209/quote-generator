'use client'; // Required for client-side hooks

import { useState } from 'react';

export default function Home() {
	const [quote, setQuote] = useState('');
	const [author, setAuthor] = useState('');
	const [loading, setLoading] = useState(false);

	const getQuote = async () => {
		setLoading(true);
		try {
			const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
				headers: {
					'X-Api-Key': 'u+a9u8fhFNNUIesvGv/Kvw==58WxA00kjgcb4IeO',
				},
			});

			const data = await res.json();
			setQuote(data[0].quote); // Note: data is an array
			setAuthor(data[0].author);
		} catch (error) {
			console.error('Error fetching quote:', error);
			setQuote('Failed to load quote.');
			setAuthor('');
		}
		setLoading(false);
	};

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-center">
			<h1 className="text-3xl font-bold mb-6">📝 Random Quote Generator</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<p className="text-xl italic mb-4 max-w-xl">{quote}</p>
					<p className="text-md font-semibold mb-6">- {author}</p>
				</>
			)}
			<button
				onClick={getQuote}
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				Get New Quote
			</button>
		</main>
	);
}
