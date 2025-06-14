import { useCallback, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import {
  LegendList,
  LegendListRef,
  LegendListRenderItemProps,
} from "@legendapp/list";
import listings from "@/assets/data/listings.json";
import LegendListCard from "@/components/card";
import InputSearch from "@/components/input-search";
import { Link } from "expo-router";
import CategoryList from "@/components/category-list";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 10;

export default function Page() {
  const listRef = useRef<LegendListRef>(null);
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState(listings.slice(0, PAGE_SIZE));
  const [searchItem, setSearchItem] = useState("");
  const debouncedSearch = useDebounce(searchItem, 200);
  const filteredData = debouncedSearch
    ? listings.filter((item) =>
        [item.title, item.city, item.country]
          .join(" ")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      )
    : listings;
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const nextItems = listings.slice(start, end);

    if (nextItems.length > 0) {
      setVisibleData((prev) => [...prev, ...nextItems]);
      setPage(nextPage);
    }
  }, [page]);

  const renderItem = ({
    item,
  }: LegendListRenderItemProps<(typeof listings)[0]>) => {
    return (
      <Link
        href={{
          pathname: "/(modals)/details/[id]",
          params: { id: item.id.toString() },
        }}
        asChild
        push
      >
        <Pressable>
          <LegendListCard
            title={item.title}
            city={item.city}
            country={item.country}
            price={item.price}
            rating={item.rating}
            image={item.image}
          />
        </Pressable>
      </Link>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 48,
        backgroundColor: "white",
      }}
    >
      <InputSearch onChange={setSearchItem} />
      <CategoryList />
      <LegendList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        recycleItems={true}
        maintainVisibleContentPosition
        ref={listRef}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
