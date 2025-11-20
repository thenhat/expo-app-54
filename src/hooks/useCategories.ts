import { apiConfig } from "@/constants/apiConfig";
import sendApiRequest from "@/utils/api";
import { useEffect, useState } from "react";

interface UseCategoriesReturn {
  categories: any;
}

export const useCategories = (all: string): UseCategoriesReturn => {
  const [categories, setCategories] = useState<any>(null);

  const getCategories = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.getCategories,
      });

      if (res?.data) {
        const listCate = res?.data;
        const listCateFormat = listCate.map((el: any) => {
          return {
            label: el.name,
            value: `${el.name}`,
            subcategory: el?.placeCategoryDetailResBodies
          };
        });

        if (all) {
          setCategories([{ label: all, value: undefined, subcategory: [] }, ...listCateFormat]);
        } else {
          setCategories(listCateFormat);
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories };
};
