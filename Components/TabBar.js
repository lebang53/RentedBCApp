import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../context/userContext';

const TabBar = ({ tabs, icons = [ "home","search","heart","user"], onChange, navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { isAuthenticated} = useContext(UserContext);

  const handleTabPress = (index) => {
    if (onChange) {
      onChange(index);
    }
    if (!isAuthenticated() && [2,3].some(item => item == index)) {
        // Nếu chưa xác thực, hiển thị thông báo và không chuyển hướng
        alert("Chưa đăng nhập, hãy đăng nhập để sử dụng chức năng");
        return;
    }
    setSelectedTab(index);
    switch (index) {
        case 0:
            navigation.navigate("Home");
            break;
        case 1:
            navigation.navigate("SearchDetails");
            break;
        case 2:
            navigation.navigate("Storage");
            break;
        case 3:
            navigation.navigate("Management");
            break;
        default:
            break;
    }
  };

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tabItem, index === selectedTab && styles.selectedTab]}
          onPress={() => handleTabPress(index)}
        >
          <Icon name={icons[index]} size={20} color={selectedTab === tab ? "#ffffff" : "#333333"} />
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 85,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  selectedTab: {
    backgroundColor: '#2ECC71',
  },
  tabText: {
    color: '#333',
  },
  selectedTabText: {
    color: '#fff',
  },
});

export default TabBar;
