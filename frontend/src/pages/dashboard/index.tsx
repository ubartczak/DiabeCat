export default function Dashboard() {
	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-blue-600 text-white py-4">
				<div className="container mx-auto px-4">
					<h1 className="text-2xl font-bold">Panel użytkownika</h1>
				</div>
			</header>
			<main className="container mx-auto px-4 py-8">
				<h2 className="text-xl font-semibold mb-4">
					Witaj w aplikacji!
				</h2>
				<p>Tu znajdziesz swoje dane i wyniki badań.</p>
			</main>
		</div>
	)
}
