import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { UserContext } from '../../context/userContext';

const ProfileHome = () => {
  const route = useRoute();
  const posts = route.params?.posts;
  const [isModalVisible, setModalVisible] = useState(false);
  const { userInfo, isAuthenticated } = useContext(UserContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.session1}>
        {/* Thành phần session 1 */}
        <Image
          source={{ uri: 'https://masterpiecer-images.s3.yandex.net/e119b10b603111ee9fec3a7ca4cc1bdc:upscaled' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Tên Người Dùng</Text>
        <Text style={styles.username}>{userInfo?.user.last_name}</Text>
        {/* Các thông tin khác của người dùng có thể được thêm ở đây */}
      </View>
      <View style={styles.session2}>
        {/* Thành phần session 2 */}
        <Text style={styles.infoTitle}>Thông Tin Nhà: {posts.content}</Text>
        {/* Thêm các thông tin nhà ở đây */}
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
        {/* Thêm các thông tin khác về nhà ở đây nếu cần */}
        <TouchableOpacity onPress={toggleModal} style={styles.button}>
          <Text style={styles.buttonText}>Thanh Toán</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} style={styles.modal} onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <FontAwesome name={'close'} style={styles.closeButtonText} /> 
            </TouchableOpacity>
            <Text style={styles.modalText}>Số tiền cần thanh toán: $100</Text>
           
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.bottomButton}>
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
    width: '15%', // Độ rộng của nhãn có thể điều chỉnh tùy theo nhu cầu
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
    height: windowHeight * 0.5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 20,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
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
