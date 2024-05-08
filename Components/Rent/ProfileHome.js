import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { UserContext } from '../../context/userContext';
import { useRoute } from '@react-navigation/native';

const ProfileHome = ({setIsCheckoutSuccess}) => {
  const route = useRoute();
  const posts = route.params?.posts;
  const [isModalVisible, setModalVisible] = useState(false);
  const { userInfo, isAuthenticated } = useContext(UserContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const checkout = () => {
    setIsCheckoutSuccess(true);
    setModalVisible(!isModalVisible);
  }
  return (
    <View style={styles.screen}>
      <View style={styles.session1}>
        {/* User's profile section */}
        <Image
          source={{ uri: 'https://masterpiecer-images.s3.yandex.net/e119b10b603111ee9fec3a7ca4cc1bdc:upscaled' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Tên Người Dùng</Text>
        <Text style={styles.username}>{userInfo?.user.last_name}</Text>
        {/* Additional user info can be added here */}
      </View>
      <View style={styles.session2}>
        {/* House info section */}
        <Text style={styles.infoTitle}>Thông Tin Nhà: {posts.content}</Text>
        {/* House details */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Địa chỉ:</Text>
          <TextInput
            style={styles.houseInfo}
            value={posts.house.address}
            editable={false}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Chủ hộ:</Text>
          <TextInput
            style={styles.houseInfo}
            value={posts.house.owner.last_name}
            editable={false}
          />
        </View>
        {/* Additional house info can be added here */}
        <TouchableOpacity onPress={toggleModal} style={styles.button}>
          <Text style={styles.buttonText}>Thanh Toán</Text>
        </TouchableOpacity>
        {/* Payment modal */}
        <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Số tiền cần thanh toán: $100</Text>
            <Text style={styles.modalText2}>Số tiền cần còn trong tài khoản 100$</Text>
          </View>
          <TouchableOpacity onPress={checkout} style={styles.bottomButton}>
            <Text style={styles.buttonText}>Tiến Hành Thanh Toán</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  session1: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  session2: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  houseInfo: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: '80%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    width: '15%', // Adjust label width as needed
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    height: windowHeight * 0.25,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalText2: {
    fontSize: 12,
    marginBottom: 20,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: '10%',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 20,
  },
});

export default ProfileHome;
