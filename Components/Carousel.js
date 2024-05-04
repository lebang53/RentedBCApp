import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, View } from "react-native";

const Carousel = ({ carouselData }) => {
    const flatListRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselData.length - 1){
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                })
            } else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                })
            };
        }, 3000);
        
        return () => clearInterval(interval);
    });

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    });

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.ceil(scrollPosition / screenWidth);
        setActiveIndex(index);
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <Image source={item.image} style={{ height: 400, width: screenWidth }} />
            </View>
        );
    };
    const renderDotIndicator = () => {
        return carouselData.map((dot, index) => {
            if(activeIndex === index) {
                return (
                    <View 
                    style={{
                        backgroundColor: "#019012",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
                    </View>
                );
            } else {
                return (
                    <View 
                    key={index}
                    style={{
                        backgroundColor: "#CCCCCC",
                        height: 10,
                        width:10,
                        borderRadius: 5,
                        marginHorizontal: 6,
                    }}>
    
                    </View>
                );
            }

        });
    };

    return (
        <>
            <FlatList 
                ref={flatListRef}
                data={carouselData} 
                getItemLayout={getItemLayout}
                renderItem={renderItem} 
                keyExtractor={(item) => item.id}
                horizontal={true} 
                pagingEnabled={true} 
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
            />
            <View
                    style={{
                        flexDirection: "row", 
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                        {renderDotIndicator()}
            </View>
        </>
        
    );
}

export default Carousel;
