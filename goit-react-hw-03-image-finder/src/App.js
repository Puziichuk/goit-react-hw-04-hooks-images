import {  useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import apiService from "./services/apiService";
import Container from "./components/Container/Container";
import Searchbar from "./components/Searchbar/Searchbar";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorView from "./components/ErrorView/ErrorView";

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        const request = await apiService(query, page);
        if (request.length === 0) {
          return setError(`No results were found for ${query}!`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Something went wrong. Try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const searchImages = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

   const onOpenModal = e => {
     setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };



  const toggleModal = () => {
     setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 1000);
  };

  
    return (
      <Container>
        <Searchbar onHandleSubmit={searchImages}/>

        {images.length > 0 && !error && (
          <ImageGallery images={images} onOpenModal={onOpenModal} />
        )}
        {error && <ErrorView texterror={error} />}

        {isLoading && <Loader />}

        {!isLoading && images.length >= 12 && !error && (
          <Button onLoadMore={onLoadMore} />
        )}

        {showModal && (
          <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL}/>
        )}
        <ToastContainer autoClose={5000} />
      </Container >
        
    )
        }


export default App;
