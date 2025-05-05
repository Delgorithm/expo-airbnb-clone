import { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  LegendList,
  LegendListRef,
  LegendListRenderItemProps,
} from "@legendapp/list";
import listings from "@/assets/data/listings.json";
import LegendListCard from "@/components/card";

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
      <LegendListCard
        title={item.title}
        city={item.city}
        country={item.country}
        price={item.price}
        rating={item.rating}
        image={item.image}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 48,
      }}
    >
      <LegendList
        data={listings}
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
