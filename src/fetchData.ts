interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Pet {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: string;
}

export const fetchPets = async () => {
  try {
    const response = await fetch(
      "https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available"
    );

    if (!response.ok) {
      throw new Error("Сетевая ошибка: " + response.statusText);
    }

    const data: Pet[] = await response.json();
    console.log("Полученные данные:", data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};
