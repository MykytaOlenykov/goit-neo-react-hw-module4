import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { isAxiosError } from "axios";

import { api } from "../../services/api";

import SearchBar from "../SearchBar";
import ImageGallery from "../ImageGallery";
import ImageModal from "../ImageModal";
import Loader from "../Loader";
import LoadMoreBtn from "../LoadMoreBtn";
import ErrorMessage from "../ErrorMessage";

import css from "./App.module.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollValue, setScrollValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cureentImage, setCureentImage] = useState(null);

  const galleryRef = useRef(null);

  const showLoadMoreBtn = !!images.length && !loading && !errorMessage;

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    setScrollValue(gallery?.scrollHeight ?? 0);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: scrollValue, behavior: "smooth" });
  }, [scrollValue, images]);

  useEffect(() => {
    if (!searchQuery) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const data = await searchPhotos({
          page,
          query: searchQuery,
          signal: controller.signal,
        });
        setImages((prev) =>
          prev.concat(normalizePhotosResponseData(data.results))
        );
      } catch (error) {
        if (isAxiosError(error) && error.code !== "ERR_CANCELED") {
          if (error.response.status === 403) {
            setErrorMessage(
              page > 1
                ? `The number of images for request "${searchQuery}" has reached the limit.`
                : "The number of available requests has been exhausted. Please try again later."
            );
          } else {
            setErrorMessage("Something went wrong. Try again.");
          }
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [page, searchQuery]);

  const handleSearchPhotos = async (newSearchQuery) => {
    if (searchQuery !== newSearchQuery) {
      setImages([]);
      setPage(1);
      setSearchQuery(newSearchQuery);
      setErrorMessage(null);
    }
  };

  const nextPage = () => setPage((prev) => prev + 1);

  const handleCloseModal = () => setCureentImage(null);

  const handleOpenModal = (image) => setCureentImage(image);

  return (
    <>
      <SearchBar onSubmit={handleSearchPhotos} />

      <ImageGallery
        ref={galleryRef}
        images={images}
        onOpenModal={handleOpenModal}
      />

      <div className={css["action-bar"]}>
        {loading && <Loader />}
        {showLoadMoreBtn && <LoadMoreBtn onClick={nextPage} />}
        {errorMessage && <ErrorMessage helperText={errorMessage} />}
      </div>

      <ImageModal
        isOpen={!!cureentImage}
        imgAlt={cureentImage?.imgAlt}
        imgUrl={cureentImage?.imgRegularUrl}
        onClose={handleCloseModal}
      />

      <Toaster position="top-right" />
    </>
  );
}

async function searchPhotos({ page, query, signal }) {
  const { data } = await api.get("/search/photos", {
    params: { per_page: "12", page, query },
    signal,
  });
  return data;
}

function normalizePhotosResponseData(photosResData) {
  if (!photosResData) return [];
  return photosResData.map((photo) => ({
    id: photo.id,
    smallUrl: photo.urls?.small,
    regularUrl: photo.urls?.regular,
    alt: photo.alt_description ?? "",
  }));
}
