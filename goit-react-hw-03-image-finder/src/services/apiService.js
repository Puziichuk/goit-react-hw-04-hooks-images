import axios from "axios";

const apiService = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=21551993-ac0c953930521d8ec489a1c57&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

export default apiService;
