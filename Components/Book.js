// MultiStepForm.js
import React, { createContext, useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';

// Tạo một Context để lưu trữ dữ liệu và hàm cập nhật dữ liệu
const AppContext = createContext();

// Component cha để cung cấp dữ liệu thông qua Context
const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <AppContext.Provider value={{ data, updateData }}>
      {children}
    </AppContext.Provider>
  );
};

// Bước 1 của multi-step form
const Step1 = () => {
  const { data, updateData } = useContext(AppContext);

  return (
    <View>
      <TextInput
        placeholder="Nhập tên của bạn"
        value={data.name}
        onChangeText={(text) => updateData({ ...data, name: text })}
      />
      <Button title="Tiếp theo" onPress={() => console.log('Tiếp theo')} />
    </View>
  );
};

// Bước 2 của multi-step form
const Step2 = () => {
  const { data, updateData } = useContext(AppContext);

  return (
    <View>
      <TextInput
        placeholder="Nhập địa chỉ của bạn"
        value={data.address}
        onChangeText={(text) => updateData({ ...data, address: text })}
      />
      <Button title="Quay lại" onPress={() => console.log('Quay lại')} />
      <Button title="Tiếp theo" onPress={() => console.log('Tiếp theo')} />
    </View>
  );
};

// Bước 3 của multi-step form
const Step3 = () => {
  const { data, updateData } = useContext(AppContext);

  return (
    <View>
      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        value={data.phoneNumber}
        onChangeText={(text) => updateData({ ...data, phoneNumber: text })}
      />
      <Button title="Quay lại" onPress={() => console.log('Quay lại')} />
      <Button title="Hoàn thành" onPress={() => console.log('Hoàn thành')} />
    </View>
  );
};

// Trang multi-step form
const MultiStepForm = () => {
  return (
    <AppProvider>
      <View>
        <Step1 />
        {/* <Step2 /> Uncomment this to render the next step */}
        {/* <Step3 /> Uncomment this to render the next step */}
      </View>
    </AppProvider>
  );
};

export default MultiStepForm;
