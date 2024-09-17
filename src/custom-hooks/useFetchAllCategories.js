import { useCallback, useEffect, useState } from "react";
import useHttp from "./useHttp";
import { toast } from "react-toastify";

export default function useFetchAllCategories() {
  const [categories, setCategories] = useState([]);
  const [unSortedCategoriesArr, setUnSortedCategoriesArr] = useState([]);
  const { sendRequest } = useHttp();

  const getAllTopics = useCallback(() => {
    const method = "get";
    const url = "/topics/findAllTopic";
    const resolved = (response) => {
      let topics = response.data.body.topicName;
      let allCategories = [];

      setUnSortedCategoriesArr(
        topics.sort((a, b) => a.name.localeCompare(b.name))
      );

      // categories the data according to the character it's starting with
      for (let i = 0; i < 26; i++) {
        let char = String.fromCharCode(97 + i);
        let objArr = topics.filter((category) =>
          category.name.toLowerCase().startsWith(char)
        );
        let categories = objArr.map((category) => category.name.toLowerCase());
        if (categories.length) {
          allCategories.push({ title: char, categories });
        }
      }

      setCategories(allCategories);
    };
    const rejected = (error) => {
      toast.error(error.response.data.message || "Faild to load categories");
    };

    sendRequest(method, url, null, resolved, rejected);
  }, []);

  useEffect(() => {
    getAllTopics();
  }, []);

  return { categories, unSortedCategoriesArr };
}
