import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileHome from './ProfileHome';
import Checkout from './Checkout';

const Rent = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [activeIndicators, setActiveIndicators] = useState([]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <ProfileHome />;
      case 2:
        return <Screen2 />;
      case 3:
        return <Screen3 />;
      default:
        return <Screen1 />;
    }
  };

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
    setActiveIndicators([...activeIndicators, currentScreen + 1]);
  };

  const handleBack = () => {
    setCurrentScreen(currentScreen - 1);
    setActiveIndicators(activeIndicators.slice(0, -1));
  };
  const isLineActive = (index) => {
    return activeIndicators.includes(index);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topIndicators}>
        {[1, 2, 3].map((index) => (
          <React.Fragment key={index}>
            {index > 1 && (
              <View style={[styles.indicatorLine, isLineActive(index) ? styles.activeIndicatorLine : null]} />
            )}
            <View
              key={index}
              style={[
                styles.topIndicator,
                currentScreen === index ? styles.activeTopIndicator : null,
              ]}
            />
          </React.Fragment>
        ))}
      </View>
      <View style={styles.screenContainer}>{renderScreen()}</View>
      <View style={styles.navigation}>
          <TouchableOpacity onPress={handleBack} disabled={!(currentScreen > 1)}>
            <Icon name="chevron-left" size={30} color={currentScreen > 1 ? 'black' : 'gray'}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={!(currentScreen < 3)}>
            <Icon name="chevron-right" size={30} color={currentScreen < 3 ? 'black' : 'gray'} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Screen1 = () => (
  <View style={styles.screen}>
    <Text>Thông tin nhà Và Profile</Text>
    {/* Thêm các thành phần của màn hình 1 ở đây */}
  </View>
);


const Screen2 = () => (
  <View style={styles.screen}>
    <Text>Tiến hành thanh toán</Text>
    {/* Thêm các thành phần của màn hình 3 ở đây */}
  </View>
);

const Screen3 = () => (
  <View style={styles.screen}>
    <Text>Lời cảm ơn và cam kết</Text>
    {/* Thêm các thành phần của màn hình 4 ở đây */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  indicators: {
    flexDirection: 'row',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: 'blue',
  },
  topIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  topIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5
  },
  activeTopIndicator: {
    backgroundColor: 'blue',
  },
  indicatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
  },
  activeIndicatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'blue',
  },
});

export default Rent;
