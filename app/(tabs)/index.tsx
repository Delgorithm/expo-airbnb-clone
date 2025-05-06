import { useCallback, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  LegendList,
  LegendListRef,
  LegendListRenderItemProps,
} from "@legendapp/list";
import listings from "@/assets/data/listings.json";
import LegendListCard from "@/components/card";
import InputSearch from "@/components/input-search";
import { Link, router } from "expo-router";

const PAGE_SIZE = 10;

export default function Page() {
  const listRef = useRef<LegendListRef>(null);
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState(listings.slice(0, PAGE_SIZE));

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
      <Pressable
        onPress={() => {
          console.log("Tapped on card: ", item.id);
          router.push({
            pathname: "/details/[id]",
            params: { id: item.id.toString() },
          });
        }}
      >
        <LegendListCard
          title={item.title}
          city={item.city}
          country={item.country}
          price={item.price}
          rating={item.rating}
          image={item.image}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 48,
      }}
    >
      <InputSearch />
      <LegendList
        data={visibleData}
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
