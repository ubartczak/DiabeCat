// Plik do obsługi operacji związanych z wynikami

// Typ danych dla wyniku
export interface Result {
	id: number
	name: string
	value: number
}

// Adres API dla wyników
const API_URL = "/api/results" // Zmień na odpowiednią ścieżkę do swojego API

// Funkcja dodająca wynik
export const addResult = async (result: Result): Promise<Result> => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(result),
		})

		if (!response.ok) {
			throw new Error("Nie udało się dodać wyniku")
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Błąd podczas dodawania wyniku:", error)
		throw error
	}
}

// Funkcja edytująca wynik
export const editResult = async (
	resultId: number,
	updatedResult: Result,
): Promise<Result> => {
	try {
		const response = await fetch(`${API_URL}/${resultId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedResult),
		})

		if (!response.ok) {
			throw new Error("Nie udało się edytować wyniku")
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Błąd podczas edytowania wyniku:", error)
		throw error
	}
}

// Funkcja usuwająca wynik
export const deleteResult = async (resultId: number): Promise<void> => {
	try {
		const response = await fetch(`${API_URL}/${resultId}`, {
			method: "DELETE",
		})

		if (!response.ok) {
			throw new Error("Nie udało się usunąć wyniku")
		}
	} catch (error) {
		console.error("Błąd podczas usuwania wyniku:", error)
		throw error
	}
}

// Funkcja pobierająca wszystkie wyniki
export const getAllResults = async (): Promise<Result[]> => {
	try {
		const response = await fetch(API_URL)
		if (!response.ok) {
			throw new Error("Nie udało się pobrać wyników")
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Błąd podczas pobierania wyników:", error)
		throw error
	}
}
